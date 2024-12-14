import { LLMInput, LLMOutput } from "shared"

import { IServiceInstance } from "@/common/services"

export interface ILLMAgentAdapter extends IServiceInstance {
    setApiKey: (apiKey: string) => void
    executePrompt: (input: LLMInput) => Promise<LLMOutput>
}
