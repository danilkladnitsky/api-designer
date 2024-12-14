import { IHttpHandler } from "./services"

export interface IControllerConstructor {
    httpHandlers: IHttpHandler[]
}

export type ControllerResponse<TData> = {
    data: TData
    ok: true
} | {
    message: string
    error?: string
    ok: false
}
