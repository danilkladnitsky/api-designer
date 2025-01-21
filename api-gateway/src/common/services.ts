import { APIMethod } from "shared/index"
import { WsEvents } from "shared/ws"

export type BrokerChannels = (typeof BROKER_CHANNELS)[keyof typeof BROKER_CHANNELS]

export const ServiceNames = {
    HTTP: "http service",
    WEBSOCKET: "websocket service"
} as const

export interface IHttpPayload<TBody = unknown> {
    params: Record<string, string>
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

export interface IRedisHandler {
    channel: BrokerChannels
    handlerFn: (payload: any) => Promise<any>
}

export interface IHttpServerConstructor {
    port: number
    host: string
    handlers: IHttpHandler[]
}

export interface IRedisBrokerConstructor {
    subscribers: IRedisHandler[]
}

export interface IServiceInstance {
    name: string
    close(): Promise<any>
}

export interface IBrokerPayload<TBody = unknown> {
    targetChannel: BrokerChannels
    data: TBody
}

export const BROKER_CHANNELS = {
    GENERATE_CODE_GRAPH: "code/request/generate-graph",
    GET_GENERATED_CODE_GRAPH: "code/response/generate-graph"
} as const

export interface IWsPayload<TBody = unknown> {
    event: WsEvents
    payload: TBody
}
