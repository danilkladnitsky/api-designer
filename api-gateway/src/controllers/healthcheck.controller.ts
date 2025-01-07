import { createHttpHandler } from "@/common/utils"
import { ICodeModule } from "@/modules/code-module/code-module"
import { ILLMModule } from "@/modules/llm-module/llm-module"

export interface ICodeController {
    codeModule: ICodeModule
    llmModule: ILLMModule
}

export const createHealthcheckkController = () => {
    const ping = async () => {
        return "pong"
    }

    const httpHandlers = [
        createHttpHandler(ping).setPath("/ping").setMethod("GET").build()
    ]

    return { httpHandlers }
}
