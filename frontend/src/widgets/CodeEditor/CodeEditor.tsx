import { Box, Button } from "@gravity-ui/uikit"
import { Editor } from "@monaco-editor/react"

import { LoadingScreen } from "@/ui/components/LoadingScreen/LoadingScreen"
import { cn } from "@/utils/cn"

import styles from "./CodeEditor.module.scss"

interface Props {
    className?: string
}

const DEFAULT_CODE = `
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
`

export const CodeEditor = ({ className }: Props) => {
    return (
        <Box className={cn(styles.editor, className)}>
            <Box className={styles.editorWrapper}>
                <Editor
                    loading={<LoadingScreen />}
                    defaultValue={DEFAULT_CODE}
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
                />
            </Box>
            <Box className={styles.panel}>
                <Button size="xl">Протестировать</Button>
                <Button view="action" size="xl">Отправить</Button>
            </Box>
        </Box>
    )
}
