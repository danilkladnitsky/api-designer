import { APIMethod, ControllerResponse } from "shared/index"

import { BrokerChannels, IHttpHandler, IRedisHandler } from "./services"

export const createRedisSubscribeHandlers = ({
    handlerFn,
    channel
}: {
    handlerFn: IRedisHandler["handlerFn"]
    channel: BrokerChannels
}): IRedisHandler => {
    return {
        channel,
        handlerFn
    }
}

export const createHttpHandler = (handlerFn: IHttpHandler["handlerFn"]) => {
    const wrappedFn = async (payload: any): Promise<ControllerResponse<any>> => {
        try {
            const result = await handlerFn(payload)

            return {
                ok: true,
                data: result
            }
        }
        catch (error) {
            console.log(error)

            return {
                ok: false,
                message: (error as Error).toString()
            }
        }
    }
    const handlerObject: IHttpHandler = {
        handlerFn: wrappedFn,
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
