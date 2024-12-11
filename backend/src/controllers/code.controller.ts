import { IControllerConstructor } from "@/common/controllers"
import { IHttpPayload } from "@/common/services"
import { createHttpHandler } from "@/common/utils"
import { ICodeModule } from "@/modules/code-module/code-module"
import { LintCodeDto } from "@/modules/code-module/code-module.dto"

export interface ICodeController {
    codeModule: ICodeModule
}

export const createCodeController = ({
    codeModule
}: ICodeController): IControllerConstructor => {
    const lintCode = async ({ body: code }: IHttpPayload<LintCodeDto>) => {
        return await codeModule.lintCode(code)
    }

    const httpHandlers = [
        createHttpHandler(lintCode).setPath("/code/lint").setMethod("post").build()
    ]

    return { httpHandlers }
}
