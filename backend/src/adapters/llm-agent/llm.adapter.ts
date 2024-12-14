import { LLMInput } from "shared"

import { IServiceInstance } from "@/common/services"

export interface ILLMAgentAdapter extends IServiceInstance {
    name: string
    setApiKey: (apiKey: string) => void
    executePrompt: (input: LLMInput[]) => Promise<string>
}
