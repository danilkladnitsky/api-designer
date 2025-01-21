import { WsEvents } from "shared/ws"

import { Code } from "@/domain/code"

export type SelectedLLM = string

export type BuildGraphCodeDto = {
    code: Code
    llm?: SelectedLLM
}

export type BuildGraphCodeEvent = {
    input: string
    context: string
    event: WsEvents
    model?: string
}

export type GetBuiltGraphCodeDto = {
    payload: string
    event: string
}
