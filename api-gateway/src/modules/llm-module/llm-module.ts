import { IRedisAdapter } from "@/adapters/redis/redis.adapter"
import { BROKER_CHANNELS } from "@/common/services"

import { BuildGraphCodeDto, BuildGraphCodeEvent } from "./llm-module.dto"
import { PROMPTS } from "./llm-module.prompts"

export interface ILLMModule {
    buildCodeGraph: (code: BuildGraphCodeDto) => Promise<void>
}

export interface ILLMModuleConstructor {
    redis: IRedisAdapter

}

export const createLLModule = ({ redis }: ILLMModuleConstructor): ILLMModule => {
    return {
        buildCodeGraph: async ({ code }: BuildGraphCodeDto) => {
            const payload: BuildGraphCodeEvent = {
                context: PROMPTS.BUILD_CODE_GRAPH(code),
                input: code.content
            }

            redis.publish(BROKER_CHANNELS.GENERATE_CODE_GRAPH, {
                data: payload, targetChannel: BROKER_CHANNELS.GET_GENERATED_CODE_GRAPH })
        }
    }
}
