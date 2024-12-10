import { FastifyRequest } from "fastify"

export const ServiceNames = {
    HTTP: "http service",
    WEBSOCKET: "websocket service"
} as const

export interface IHttpPayload
    extends Pick<FastifyRequest, "body" | "params" | "query"> {}

export interface IHandler<TPayload = any> {
    path: string
    handlerFn: (payload: TPayload) => any
}

export interface IHttpHandler<TPayload = IHttpPayload> {
    path: string
    method: "get" | "post"
    handlerFn: (payload: TPayload) => Promise<any>
}

export interface IHttpServerConstructor {
    port: number
    handlers: IHttpHandler[]
}

export interface IServiceInstance {
    name: string
    close(): Promise<void>
}
