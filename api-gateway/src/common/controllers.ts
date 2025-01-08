import { IHttpHandler, IRedisHandler } from "./services"

export interface IControllerConstructor {
    httpHandlers: IHttpHandler[]
    redisHandlers?: IRedisHandler[]
}
