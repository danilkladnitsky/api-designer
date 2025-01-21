import { Box } from "@gravity-ui/uikit"
import { Editor } from "@monaco-editor/react"
import { ReactNode } from "react"
import { TaskFile } from "shared/task"

import { useAppContext } from "@/app/App.context"
import { LoadingScreen } from "@/ui/components/LoadingScreen/LoadingScreen"
import { cn } from "@/utils/cn"

import { CodeEditorContextProvider, ICodeEditorContextProviderProps, useCodeEditorContext } from "./CodeEditor.context"
import styles from "./CodeEditor.module.scss"

interface CodeEditorContentProps {
    className?: string
    language?: string
    footer?: (file: TaskFile) => ReactNode
}

const CodeEditorContent = ({ className, language, footer }: CodeEditorContentProps) => {
    const { taskConfig, isGenerating } = useAppContext()
    const { code, file, setCode } = useCodeEditorContext()

    const handleCodeChange = (value?: string) => {
        if (value) {
            setCode(value)
        }
        else {
            setCode("")
        }
    }

    return (
        <Box className={cn(styles.wrapper, className)}>

            <Box className={styles.codeEditor}>
                <Editor
                    loading={<LoadingScreen />}
                    defaultValue={code}
                    className={styles.editorFrame}
                    height="100%"
                    options={{
                        scrollbar: {
                            useShadows: false
                        },
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        },
                        hideCursorInOverviewRuler: true,
                        showFoldingControls: "always"
                    }}
                    language={language}
                    defaultLanguage="python"
                    theme="vs-dark"
                    onChange={handleCodeChange}
                />
                {footer?.(file)}

            </Box>
        </Box>
    )
}

export const CodeEditor = ({ currentCode, file, onFileCodeChange, ...contentProps }: CodeEditorContentProps & ICodeEditorContextProviderProps) => {
    return (
        <CodeEditorContextProvider onFileCodeChange={onFileCodeChange} file={file} currentCode={currentCode}>
            <CodeEditorContent {...contentProps} />
        </CodeEditorContextProvider>
    )
}
