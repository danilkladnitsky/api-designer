import { createContext, ReactNode, useContext, useState } from "react"
import { Code } from "shared/index"

interface ICodeEditorContext {
    code: Code
    setCode: (code: Code) => void
}

export interface ICodeEditorContextProviderProps {
    fileName: string
    currentCode?: Code
    onFileCodeChange?: (file: string, code: Code) => void
}

const CodeEditorContext = createContext({} as ICodeEditorContext)

export const useCodeEditorContext = (): ICodeEditorContext => useContext(CodeEditorContext)

export const CodeEditorContextProvider = ({ currentCode = "", fileName, onFileCodeChange, children }: ICodeEditorContextProviderProps & { children: ReactNode }) => {
    const [code, setCode] = useState<Code>(currentCode)

    const onCodeChange = (v: string = "") => {
        setCode(v)

        onFileCodeChange?.(fileName, v)
    }

    return (
        <CodeEditorContext.Provider value={{ code, setCode: onCodeChange }}>
            {children}
        </CodeEditorContext.Provider>
    )
}
