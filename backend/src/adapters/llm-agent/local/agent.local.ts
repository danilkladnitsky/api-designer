import { ILLMAgentAdapter } from "../llm.adapter"

export const createLocalLLMAgent = async (): Promise<ILLMAgentAdapter> => {
    return {
        name: "local llm agent",
        close: async () => {},
        setApiKey: (apiKey: string) => {},
        executePrompt: async (input: any) => {
            return {
                content: JSON.stringify({
                    role: "assistant",
                    content: "Hello World"
                })
            }
        }
    }
}
