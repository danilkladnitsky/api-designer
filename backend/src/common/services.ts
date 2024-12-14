import { APIMethod } from "shared"

export const ServiceNames = {
    HTTP: "http service",
    WEBSOCKET: "websocket service"
} as const

export interface IHttpPayload<TBody = unknown> {
    body: TBody
}

export interface IHandler<TPayload = unknown> {
    path: string
    handlerFn: (payload: TPayload) => unknown
}

export interface IHttpHandler {
    path: string
    method: APIMethod
    handlerFn: (payload: any) => Promise<any>
}

export interface IHttpServerConstructor {
    port: number
    handlers: IHttpHandler[]
}

export interface IServiceInstance {
    name: string
    close(): Promise<any>
}
