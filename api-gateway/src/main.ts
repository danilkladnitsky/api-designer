import process from "process"

import { startHttpServer } from "@/app/http/server"
import { IServiceInstance } from "@/common/services"

import { createLocalDatabase } from "./adapters/database/local/database.local"
import { createRedisHosted } from "./adapters/redis/hosted/redis.hosted"
import { createWsHostedAdapter } from "./adapters/ws/hosted/ws.hosted"
import { getAppConfig } from "./app/config"
import { startRedisBroker } from "./app/redis/broker"
import { createCodeController, ICodeController } from "./controllers/code.controller"
import { createHealthcheckkController } from "./controllers/healthcheck.controller"
import {
    createTaskController,
    ITaskController
} from "./controllers/task.controller"
import { createCodeModule } from "./modules/code-module/code-module"
import { createLLModule, ILLMModuleConstructor } from "./modules/llm-module/llm-module"
import {
    createTaskModule,
    ITaskModuleConstructor
} from "./modules/task-module/task-module"

const config = getAppConfig()

const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGUSR2"]

const instantiateDatabase = async () => {
    const db = await createLocalDatabase()
    await db.connect()

    return db
}

const instantiateRedis = async () => {
    const redis = await createRedisHosted()

    await redis.connect({ host: config.REDIS_HOST, port: config.REDIS_PORT, password: config.REDIS_PASSWORD })

    return redis
}

const instantiateWs = async () => {
    const ws = await createWsHostedAdapter({ port: config.WS_PORT })

    return ws
}

const instantiateModules = async ({ database, redis }: ITaskModuleConstructor & ILLMModuleConstructor) => {
    const taskModule = createTaskModule({ database })
    const llmModule = createLLModule({ redis })
    const codeModule = createCodeModule()

    return { taskModule, codeModule, llmModule }
}

const instantiateControllers = async ({ taskModule, codeModule, llmModule, ws }: ITaskController & ICodeController) => {
    const taskController = createTaskController({ taskModule })
    const codeController = createCodeController({ codeModule, llmModule, ws })
    const healthCheckController = createHealthcheckkController()

    return {
        redisSubscribers: [...codeController.redisHandlers!],
        httpHandlers: [...taskController.httpHandlers, ...codeController.httpHandlers, ...healthCheckController.httpHandlers]
    }
}

const startApp = async () => {
    const services: IServiceInstance[] = []

    const database = await instantiateDatabase().catch((err) => {
        console.error(err)
        process.exit(1)
    })
    services.push({ name: "database", close: database.close })

    const redis = await instantiateRedis().catch((err) => {
        console.error(err)
        process.exit(1)
    })

    const ws = await instantiateWs().catch((err) => {
        console.error(err)
        process.exit(1)
    })
    services.push({ name: "websocket", close: ws.close })

    const appControllers = await instantiateModules({ database, redis })
        .then(modules => instantiateControllers({ ...modules, ws }))

    try {
        const httpServer = startHttpServer({
            port: config.PORT,
            host: config.HOST,
            handlers: appControllers.httpHandlers
        })

        const redisBroker = startRedisBroker({ redis, subscribers: appControllers.redisSubscribers })

        services.push(redisBroker)
        services.push(httpServer)
        addGracefulShutdown(services)
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

const addGracefulShutdown = (services: IServiceInstance[]) => {
    signals.forEach((signal) => {
        process.on(signal, async () => {
            try {
                const closeRequests = services.map((_, idx, serviceList) => {
                    const service = serviceList[serviceList.length - idx - 1]

                    return service
                        .close()
                        .then((msg) => {
                            console.info(`Closed service "${service.name}"`)
                            return msg
                        })
                        .catch(msg => msg)
                })

                const shutdownStatus = await Promise.allSettled(closeRequests)

                console.log(shutdownStatus)
                process.exit(0)
            }
            catch (err) {
                console.error(`Error closing application on ${signal}`, err)
                process.exit(1)
            }
        })
    })
}

startApp()
