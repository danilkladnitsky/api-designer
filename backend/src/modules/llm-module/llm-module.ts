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
                    .executePrompt({ role: "user", content: PROMPTS.BUILD_CODE_GRAPH(code) })

                return response.content as unknown as CodeAPIGraph[]
            }
            catch (error) {
                console.error(error)
                throw new Error((error as Error).message)
            }
        }
    }
}
