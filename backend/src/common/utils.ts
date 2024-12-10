import { IHttpHandler } from "./services"

export const createHttpHandler = (handlerFn: IHttpHandler["handlerFn"]) => {
    const handlerObject: IHttpHandler = {
        handlerFn,
        path: "",
        method: "get"
    }

    const createScope = () => {
        const setPath = (path: string) => {
            handlerObject.path = path
            return createScope()
        }

        const setMethod = (method: "get" | "post") => {
            handlerObject.method = method
            return createScope()
        }

        const build = () => {
            return handlerObject
        }

        return { setPath, setMethod, build }
    }

    return createScope()
}
