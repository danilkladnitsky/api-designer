import { APIMethod } from "shared"

import { IHttpHandler } from "./services"

export const createHttpHandler = (handlerFn: IHttpHandler["handlerFn"]) => {
    const handlerObject: IHttpHandler = {
        handlerFn,
        path: "",
        method: "GET"
    }

    const createScope = () => {
        const setPath = (path: string) => {
            handlerObject.path = path
            return createScope()
        }

        const setMethod = (method: APIMethod) => {
            handlerObject.method = method.toLocaleLowerCase() as APIMethod
            return createScope()
        }

        const build = () => {
            return handlerObject
        }

        return { setPath, setMethod, build }
    }

    return createScope()
}
