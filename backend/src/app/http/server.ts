import Fastify from "fastify"

import { IHttpServerConstructor, IServiceInstance, ServiceNames } from "@/common/services"

export const startHttpServer = ({
    port: PORT = 3000,
    handlers
}: IHttpServerConstructor): IServiceInstance => {
    const server = Fastify({
        logger: true
    })

    handlers.forEach(({ path, method, handlerFn }) => {
        console.info(`Registering handler for ${method} ${path}`)
        server[method](path, handlerFn)
    })

    server
        .get("/ping", async function handler() {
            return "pong"
        })
        .listen({ port: PORT }, function (err, address) {
            if (err) {
                server.log.error(err)
                process.exit(1)
            }

            console.log(`Server is now listening on ${address}`)
        })

    return { close: server.close, name: ServiceNames.HTTP }
}
