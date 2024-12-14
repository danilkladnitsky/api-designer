import { ILLMAgentAdapter } from "../llm.adapter"

export const createLocalLLMAgent = async (): Promise<ILLMAgentAdapter> => {
    return {
        name: "local llm agent",
        close: async () => {},
        setApiKey: () => {},
        executePrompt: async (input: unknown) => {
            return {
                content: JSON.stringify({
                    role: "assistant",
                    content: "Hello World",
                    input
                })
            }
        }
    }
}
