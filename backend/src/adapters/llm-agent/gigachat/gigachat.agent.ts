import path from "path"

import { LLMInput, LLMOutput } from "shared"

import { ILLMAgentAdapter } from "../llm.adapter"

import { GigaChatResponse } from "./gigachat.agent.dto"

export const createGigachatLLMAgent = async (): Promise<ILLMAgentAdapter> => {
    let accessToken: string | null = null

    process.env.NODE_EXTRA_CA_CERTS = path.resolve(__dirname, "certs")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

    return {
        name: "gigachat llm agent",
        close: async () => {},
        setApiKey: (acessToken: string) => {
            accessToken = acessToken
        },
        executePrompt: async (input: LLMInput): Promise<LLMOutput> => {
            if (!accessToken) {
                throw new Error("Access Token not initialized")
            }

            const res = await fetch("https://gigachat.devices.sberbank.ru/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    model: "GigaChat",
                    messages: [{ role: "user", content: input.content }],
                    stream: false,
                    max_tokens: 256,
                    repetition_penalty: 1,
                    update_interval: 0
                })
            })

            const data = await res.json() as GigaChatResponse
            const answer = data.choices[0].message

            return {
                content: answer.content || "no data"
            }
        }
    }
}
