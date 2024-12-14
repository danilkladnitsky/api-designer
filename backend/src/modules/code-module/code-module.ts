import { CodeLintResultDto, LintCodeDto } from "./code-module.dto"

export interface ICodeModule {
    lintCode: (code: LintCodeDto) => Promise<CodeLintResultDto>
}

export const createCodeModule = (): ICodeModule => {
    return {
        lintCode: async (code: LintCodeDto): Promise<CodeLintResultDto> => {
            return Promise.resolve({
                ok: true, error: ""
            })
        }
    }
}