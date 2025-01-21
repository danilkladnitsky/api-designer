import OpenAI from "openai"
import { LLMInput } from "shared/index"

import { ILLMAgentAdapter } from "../llm.adapter"

export const createOpenAILLMAgent = async (): Promise<ILLMAgentAdapter> => {
    let client: OpenAI | null = null

    return {
        name: "openai llm agent",
        close: async () => {},
        setApiKey: (apiKey: string) => {
            client = new OpenAI({
                apiKey,
                baseURL: "https://gptunnel.ru/v1/"
            })
        },
        executePrompt: async (input: LLMInput[]) => {
            if (!client) {
                throw new Error("OpenAI client not initialized")
            }

            const chatCompletion = await client.chat.completions.create({
                messages: input,
                model: "gpt-4o-mini",
                response_format: {
                    type: "json_object" }
            })

            const parseResponse = () => {
                const chatResponse = chatCompletion.choices[0].message.content
                try {
                    return JSON.parse(chatResponse || "")
                }
                catch (error) {
                    return { content: "" }
                }
            }

            return {
                content: parseResponse()
            }
        }
    }
}
