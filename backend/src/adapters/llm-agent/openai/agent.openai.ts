import OpenAI from "openai"
import { LLMInput, LLMOutput } from "shared"

import { ILLMAgentAdapter } from "../llm.adapter"

export const createOpenAILLMAgent = async (): Promise<ILLMAgentAdapter> => {
    let client: OpenAI | null = null

    return {
        name: "openai llm agent",
        close: async () => {},
        setApiKey: (apiKey: string) => {
            client = new OpenAI({
                apiKey
            })
        },
        executePrompt: async (input: LLMInput): Promise<LLMOutput> => {
            if (!client) {
                throw new Error("OpenAI client not initialized")
            }

            const chatCompletion = await client.chat.completions.create({
                messages: [{ role: input.role, content: input.content }],
                model: "gpt-3.5-turbo"
            })

            return {
                content: chatCompletion.choices[0].message.content || "no data"
            }
        }
    }
}
