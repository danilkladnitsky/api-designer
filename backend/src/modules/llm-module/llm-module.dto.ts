import { Code } from "@/domain/code"

export type SelectedLLM = string

export type BuildGraphCodeDto = {
    code: Code
    llm?: SelectedLLM
}
