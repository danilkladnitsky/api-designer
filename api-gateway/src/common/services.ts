import { APIMethod } from "shared"

import { IRedisAdapter } from "@/adapters/redis/redis.adapter"

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
    redis: IRedisAdapter
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

// WS
export const WS_EVENTS = {
    UPDATE_BUILD_CODE_GRAPH: "update-build-code-graph"
} as const

export type WsEvents = (typeof WS_EVENTS)[keyof typeof WS_EVENTS]

export interface IWsPayload<TBody = unknown> {
    event: WsEvents
    payload: TBody
}
