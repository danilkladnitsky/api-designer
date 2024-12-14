import process from "process"

import { startHttpServer } from "@/app/http/server"
import { IServiceInstance } from "@/common/services"

import { createLocalDatabase } from "./adapters/database/local/database.local"
import { createLocalLLMAgent } from "./adapters/llm-agent/local/agent.local"
import { createOpenAILLMAgent } from "./adapters/llm-agent/openai/agent.openai"
import { getAppConfig } from "./app/config"
import { createCodeController, ICodeController } from "./controllers/code.controller"
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

const instantiateLLMAgents = async () => {
    const llmAgent = await createLocalLLMAgent()
    llmAgent.setApiKey("<LOCAL_API_TOKEN>")

    const openAIAgent = await createOpenAILLMAgent()
    openAIAgent.setApiKey(config.OPENAI_API_KEY)

    return { llmAgent, openAIAgent }
}

const instantiateModules = async ({ database, llmAgents }: ITaskModuleConstructor & ILLMModuleConstructor) => {
    const taskModule = createTaskModule({ database })
    const llmModule = createLLModule({ llmAgents })

    const codeModule = createCodeModule()

    return { taskModule, codeModule, llmModule }
}

const instantiateControllers = async ({ taskModule, codeModule, llmModule }: ITaskController & ICodeController) => {
    const taskController = createTaskController({ taskModule })
    const codeController = createCodeController({ codeModule, llmModule })

    return {
        httpHandlers: [...taskController.httpHandlers, ...codeController.httpHandlers]
    }
}

const startApp = async () => {
    const services: IServiceInstance[] = []

    const database = await instantiateDatabase().catch((err) => {
        console.error(err)
        process.exit(1)
    })

    const { llmAgent, openAIAgent } = await instantiateLLMAgents()

    services.push({ name: "database", close: database.close })
    services.push({ name: "llmAgent", close: llmAgent.close })

    const appControllers = await instantiateModules({ database, llmAgents: [llmAgent, openAIAgent] })
        .then(modules => instantiateControllers(modules))

    try {
        const httpServer = startHttpServer({
            port: 3000,
            handlers: appControllers.httpHandlers
        })

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
