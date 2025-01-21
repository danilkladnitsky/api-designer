import { BuildGraphCodeDto, GenerateEducationLinksResponse, GenerateEndpointsResponse } from "shared/dtos"
import { LLMOutput } from "shared/index"

import { ILLMAgentAdapter } from "@/adapters/llm-agent/llm.adapter"

import { PROMPTS } from "./llm-module.prompts"

export interface ILLMModule {
    buildCodeGraph: (code: BuildGraphCodeDto) => Promise<LLMOutput<GenerateEndpointsResponse>>
    suggestEducationLinks: (topics: string[]) => Promise<LLMOutput<GenerateEducationLinksResponse>>
}

export interface ILLMModuleConstructor {
    llmAgent: ILLMAgentAdapter

}

export const createLLModule = ({ llmAgent }: ILLMModuleConstructor): ILLMModule => {
    return {
        suggestEducationLinks: async (topics: string[]) => {
            const { content } = await llmAgent.executePrompt<GenerateEducationLinksResponse>(PROMPTS.SUGGEST_EDUCATION_LINKS(topics))

            return {
                type: "education-links",
                content
            }
        },
        buildCodeGraph: async (payload: BuildGraphCodeDto) => {
            if (payload.extension === "py") {
                const { content } = await llmAgent.executePrompt<GenerateEndpointsResponse>(PROMPTS.GENERATE_SERVICE_ENDPOINTS_GRAPH(payload))

                return {
                    type: "endpoints",
                    content
                }
            }
            else {
                const { content } = await llmAgent.executePrompt<GenerateEndpointsResponse>(PROMPTS.GENERATE_DOCKER_GRAPH(payload))

                return {
                    type: "container",
                    content
                }
            }
        }

    }
}
