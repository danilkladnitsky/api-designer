import { IHttpHandler } from "./services"

export interface IControllerConstructor {
    httpHandlers: IHttpHandler[]
}
