import { Code } from "."

export type BuildGraphCodeDto = {
    filename: string
    extension: string
    code: Code
}

export type WsGraphPayload = {
    event: string
    data: any
}