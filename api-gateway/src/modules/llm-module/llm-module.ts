import { BuildGraphCodeDto } from "shared/dtos"

import { IRedisAdapter } from "@/adapters/redis/redis.adapter"
import { BROKER_CHANNELS } from "@/common/services"

import { BuildGraphCodeEvent } from "./llm-module.dto"
import { PROMPTS } from "./llm-module.prompts"

export interface ILLMModule {
    buildCodeGraph: (code: BuildGraphCodeDto) => Promise<void>
}

export interface ILLMModuleConstructor {
    redis: IRedisAdapter

}

export const createLLModule = ({ redis }: ILLMModuleConstructor): ILLMModule => {
    return {
        buildCodeGraph: async (payload: BuildGraphCodeDto) => {
            const prompt: BuildGraphCodeEvent = {
                context: PROMPTS.GENERATE_SERVICE_ENDPOINTS_GRAPH(payload),
                input: payload.code
            }

            redis.publish(BROKER_CHANNELS.GENERATE_CODE_GRAPH, {
                data: prompt, targetChannel: BROKER_CHANNELS.GET_GENERATED_CODE_GRAPH })
        }
    }
}
