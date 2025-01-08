import { ILLMAgentAdapter } from "@/adapters/llm-agent/llm.adapter"
import { IRedisAdapter } from "@/adapters/redis/redis.adapter"
import { BROKER_CHANNELS } from "@/common/services"

import { BuildGraphCodeDto, BuildGraphCodeEvent } from "./llm-module.dto"

export interface ILLMModule {
    buildCodeGraph: (code: BuildGraphCodeDto) => Promise<void>
}

export interface ILLMModuleConstructor {
    llmAgents: ILLMAgentAdapter[]
    redis: IRedisAdapter
}

export const createLLModule = ({ llmAgents, redis }: ILLMModuleConstructor): ILLMModule => {
    return {
        buildCodeGraph: async ({ code }: BuildGraphCodeDto) => {
            const payload: BuildGraphCodeEvent = {
                context: "find bugs",
                input: code.content
            }

            redis.publish(BROKER_CHANNELS.GENERATE_CODE_GRAPH, {
                data: payload, targetChannel: BROKER_CHANNELS.GET_GENERATED_CODE_GRAPH })
        }
    }
}
