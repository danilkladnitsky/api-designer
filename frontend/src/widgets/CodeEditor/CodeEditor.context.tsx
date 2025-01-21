import { createContext, ReactNode, useContext, useState } from "react"
import { Code } from "shared/index"
import { TaskFile } from "shared/task"

interface ICodeEditorContext {
    code: Code
    file: TaskFile
    setCode: (code: Code) => void

}

export interface ICodeEditorContextProviderProps {
    file: TaskFile
    currentCode?: Code
    onFileCodeChange?: (file: string, code: Code) => void
}

const CodeEditorContext = createContext({} as ICodeEditorContext)

export const useCodeEditorContext = (): ICodeEditorContext => useContext(CodeEditorContext)

export const CodeEditorContextProvider = ({ currentCode = "", file, onFileCodeChange, children }: ICodeEditorContextProviderProps & { children: ReactNode }) => {
    const [code, setCode] = useState<Code>(currentCode)

    const onCodeChange = (v: string = "") => {
        setCode(v)

        onFileCodeChange?.(file.fileName, v)
    }

    return (
        <CodeEditorContext.Provider value={{ code, file, setCode: onCodeChange }}>
            {children}
        </CodeEditorContext.Provider>
    )
}
