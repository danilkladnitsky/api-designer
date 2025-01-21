import { LLMInput } from "shared/index"

import { IServiceInstance } from "@/common/services"

export type LLMResponse<TContent = string> = {
    content: TContent
}

export interface ILLMAgentAdapter extends IServiceInstance {
    name: string
    setApiKey: (apiKey: string) => void
    executePrompt: <TContent>(input: LLMInput[]) => Promise<LLMResponse<TContent>>
}
