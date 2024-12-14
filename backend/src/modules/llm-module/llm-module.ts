import { CodeAPIGraph } from "shared"

import { ILLMAgentAdapter } from "@/adapters/llm-agent/llm.adapter"

import { BuildGraphCodeDto } from "./llm-module.dto"

export interface ILLMModule {
    buildCodeGraph: (code: BuildGraphCodeDto) => Promise<CodeAPIGraph[]>
}

export interface ILLMModuleConstructor {
    llmAgents: ILLMAgentAdapter[]
}

export const createLLModule = ({ llmAgents }: ILLMModuleConstructor): ILLMModule => {
    return {
        buildCodeGraph: async ({ code, llm }: BuildGraphCodeDto): Promise<CodeAPIGraph[]> => {
            const agent = llm ? llmAgents.find(a => a.name === llm) : llmAgents[0]
            if (!agent) {
                throw new Error("No LLM agent found")
            }

            const buildGraphPrompt = `Build a graph of API calls for the following code: ${code.content}`

            const response = await agent.executePrompt({ role: "user", content: buildGraphPrompt })

            return JSON.parse(response.content) as CodeAPIGraph[]
        }
    }
}
