import { Box, Tabs, Text } from "@gravity-ui/uikit"
import { Editor } from "@monaco-editor/react"

import { CloseButton } from "@/ui/components/CloseButton/CloseButton"
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
            <CloseButton />
            <Text variant="subheader-3">Редактор</Text>
            <Tabs
                className={styles.tabs}
                size="m"
                activeTab="1"
                items={[{
                    id: "1",
                    title: "routes.py"
                },
                {
                    id: "2",
                    title: "docker-compose.yml"
                },
                {
                    id: "3",
                    title: "nginx.conf"
                }]}
            />
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
                        },
                        hideCursorInOverviewRuler: true,
                        showFoldingControls: "always"
                    }}
                    language="python"
                    defaultLanguage="python"
                    theme="vs-dark"
                    onChange={handleOnChange}
                />
            </Box>

        </Box>
    )
}
