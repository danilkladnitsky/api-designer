import { Play } from "@gravity-ui/icons"
import { Box, Button, Icon } from "@gravity-ui/uikit"
import { Editor } from "@monaco-editor/react"

import { LoadingScreen } from "@/ui/components/LoadingScreen/LoadingScreen"
import { cn } from "@/utils/cn"

import { CodeEditorContextProvider, ICodeEditorContextProviderProps, useCodeEditorContext } from "./CodeEditor.context"
import styles from "./CodeEditor.module.scss"

interface CodeEditorContentProps {
    className?: string
    language?: string
    onSubmit: () => void
}

const CodeEditorContent = ({ className, language, onSubmit }: CodeEditorContentProps) => {
    const { code, setCode } = useCodeEditorContext()

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
                <Box className={styles.action}>
                    <Button size="xl" onClick={onSubmit}>
                        Проверить
                        <Icon size={18} data={Play} />
                    </Button>

                </Box>
            </Box>
        </Box>
    )
}

export const CodeEditor = ({ currentCode, fileName, onFileCodeChange, ...contentProps }: CodeEditorContentProps & ICodeEditorContextProviderProps) => {
    return (
        <CodeEditorContextProvider onFileCodeChange={onFileCodeChange} fileName={fileName} currentCode={currentCode}>
            <CodeEditorContent {...contentProps} />
        </CodeEditorContextProvider>
    )
}
