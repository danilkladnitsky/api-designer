import { IControllerConstructor } from "@/common/controllers"
import { IHttpPayload } from "@/common/services"
import { createHttpHandler } from "@/common/utils"
import { ICodeModule } from "@/modules/code-module/code-module"
import { LintCodeDto } from "@/modules/code-module/code-module.dto"
import { ILLMModule } from "@/modules/llm-module/llm-module"
import { BuildGraphCodeDto } from "@/modules/llm-module/llm-module.dto"

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

    const buildCodeGraph = async ({ body: code }: IHttpPayload<BuildGraphCodeDto>) => {
        return await llmModule.buildCodeGraph(code)
    }

    const httpHandlers = [
        createHttpHandler(lintCode).setPath("/code/lint").setMethod("POST").build(),
        createHttpHandler(buildCodeGraph).setPath("/code/graph").setMethod("POST").build()
    ]

    return { httpHandlers }
}
