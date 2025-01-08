import { Code } from "@/domain/code"

export type SelectedLLM = string

export type BuildGraphCodeDto = {
    code: Code
    llm?: SelectedLLM
}

export type BuildGraphCodeEvent = {
    input: string
    context: string
    model?: string
}

export type GetBuiltGraphCodeDto = {
    response: string
}
