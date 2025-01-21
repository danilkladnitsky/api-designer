import { LLMInput } from "shared/index"

export const createLocalLLMAgent = async () => {
    return {
        name: "local llm agent",
        close: async () => {},
        setApiKey: () => {},
        executePrompt: async (input: LLMInput[]) => {
            return Promise.resolve({ content: "", type: "" })
        }
    }
}
