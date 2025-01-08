import { IHttpHandler, IRedisHandler } from "./services"

export interface IControllerConstructor {
    httpHandlers: IHttpHandler[]
    redisHandlers?: IRedisHandler[]
}

export type ControllerResponse<TData> = {
    data: TData
    ok: true
} | {
    message: string
    error?: string
    ok: false
}
