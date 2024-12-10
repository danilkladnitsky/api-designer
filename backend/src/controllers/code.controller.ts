import { IHttpHandler, IHttpPayload } from "@/common/services"

const getCode = async ({ }: IHttpPayload) => {
    return "js"
}

export const httpCodeHandlers: IHttpHandler[] = [
    {
        path: "/code",
        method: "get",
        handlerFn: getCode
    }
]
