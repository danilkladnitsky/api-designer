import { CodeAPIGraph } from "shared"

import { ILLMAgentAdapter } from "@/adapters/llm-agent/llm.adapter"

import { BuildGraphCodeDto } from "./llm-module.dto"
import { PROMPTS } from "./llm-module.prompts"

export interface ILLMModule {
    buildCodeGraph: (code: BuildGraphCodeDto) => Promise<CodeAPIGraph[]>
}

export interface ILLMModuleConstructor {
    llmAgents: ILLMAgentAdapter[]
}

export const createLLModule = ({ llmAgents }: ILLMModuleConstructor): ILLMModule => {
    return {
        buildCodeGraph: async ({ code, llm }: BuildGraphCodeDto) => {
            try {
                const agent = llm ? llmAgents.find(a => a.name === llm) : llmAgents[0]
                if (!agent) {
                    throw new Error("No LLM agent found")
                }

                const response = await agent
                    .executePrompt(PROMPTS.BUILD_CODE_GRAPH(code))

                try {
                    const normalizedResponse = response.replace(/`/g, "").replace("json", "")

                    console.log(normalizedResponse)
                    return JSON.parse(normalizedResponse) as CodeAPIGraph[]
                }
                catch (error) {
                    console.log(error)
                    return []
                }
            }
            catch (error) {
                console.error(error)
                throw new Error((error as Error).message)
            }
        }
    }
}
