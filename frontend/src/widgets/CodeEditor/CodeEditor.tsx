import { Box, Button } from "@gravity-ui/uikit"
import { Editor } from "@monaco-editor/react"

import { LoadingScreen } from "@/ui/components/LoadingScreen/LoadingScreen"
import { cn } from "@/utils/cn"

import styles from "./CodeEditor.module.scss"



interface Props {
    className?: string
    currentCode?: string
    onChange?: (value: string) => void
}

export const CodeEditor = ({ className, currentCode, onChange }: Props) => {
    const handleOnChange = (value?: string) => {
        onChange?.(value || "")
    }

    return (
        <Box className={cn(styles.editor, className)}>
            <Box className={styles.editorWrapper}>
                <Editor
                    loading={<LoadingScreen />}
                    defaultValue={currentCode}
                    className={styles.editorFrame}
                    height="100%"

                    options={{
                        scrollbar: {
                            useShadows: false
                        },
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        } }}
                    language="python"
                    defaultLanguage="python"
                    theme="vs-dark"
                    onChange={handleOnChange}
                />
            </Box>
            <Box className={styles.panel}>
                <Button size="xl">Протестировать</Button>
                <Button view="action" size="xl">Отправить</Button>
            </Box>
        </Box>
    )
}
