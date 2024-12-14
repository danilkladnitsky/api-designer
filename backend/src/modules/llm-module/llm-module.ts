import { CodeAPIGraph } from "shared"

import { ILLMAgentAdapter } from "@/adapters/llm-agent/llm.adapter"

import { BuildGraphCodeDto } from "./llm-module.dto"

export interface ILLMModule {
    buildCodeGraph: (code: BuildGraphCodeDto) => Promise<CodeAPIGraph[]>
}

export interface ILLMModuleConstructor {
    llmAgent: ILLMAgentAdapter
}

export const createLLModule = ({ llmAgent }: ILLMModuleConstructor): ILLMModule => {
    return {
        buildCodeGraph: async (code: BuildGraphCodeDto): Promise<CodeAPIGraph[]> => {
            const buildGraphPrompt = `Build a graph of API calls for the following code: ${code.content}`

            const response = await llmAgent.executePrompt({ role: "user", content: buildGraphPrompt })

            return JSON.parse(response.content) as CodeAPIGraph[]
        }
    }
}
