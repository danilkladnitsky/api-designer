import { IControllerConstructor } from "@/common/controllers"
import { BROKER_CHANNELS, IBrokerPayload, IHttpPayload } from "@/common/services"
import { createHttpHandler, createRedisSubscribeHandlers } from "@/common/utils"
import { ICodeModule } from "@/modules/code-module/code-module"
import { LintCodeDto } from "@/modules/code-module/code-module.dto"
import { ILLMModule } from "@/modules/llm-module/llm-module"
import { BuildGraphCodeDto, GetBuiltGraphCodeDto } from "@/modules/llm-module/llm-module.dto"

export interface ICodeController {
    codeModule: ICodeModule
    llmModule: ILLMModule
}

export const createCodeController = ({
    codeModule,
    llmModule
}: ICodeController): IControllerConstructor => {
    const lintCode = async ({ body: code }: IHttpPayload<LintCodeDto>) => {
        return await codeModule.lintCode(code)
    }

    const requestGenerateCodeGraph = async ({ body: code }: IHttpPayload<BuildGraphCodeDto>) => {
        return await llmModule.buildCodeGraph(code)
    }

    const getGeneratedCodeGraph = async ({ data }: IBrokerPayload<GetBuiltGraphCodeDto>) => {
        console.log(data.response)
    }

    const httpHandlers = [
        createHttpHandler(lintCode).setPath("/code/lint").setMethod("POST").build(),
        createHttpHandler(requestGenerateCodeGraph).setPath("/code/graph").setMethod("POST").build()
    ]

    const redisHandlers = [
        createRedisSubscribeHandlers({ handlerFn: getGeneratedCodeGraph, channel: BROKER_CHANNELS.GET_GENERATED_CODE_GRAPH })
    ]

    return { httpHandlers, redisHandlers }
}
