import { Code } from "@/domain/code"

export type LintCodeDto = Omit<Code, "createdAt">
export type CodeLintResultDto = {
    ok: boolean
    error: string
}
