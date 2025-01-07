import Fastify from "fastify"

import { IHttpServerConstructor, IServiceInstance, ServiceNames } from "@/common/services"

export const startHttpServer = ({
    port: PORT = 3000,
    host: HOST = "0.0.0.0",
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
        .listen({ port: PORT, host: HOST }, function (err, address) {
            if (err) {
                server.log.error(err)
                process.exit(1)
            }

            console.log(`Server is now listening on ${address}`)
        })

    return { close: server.close, name: ServiceNames.HTTP }
}
