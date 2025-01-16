import { Box } from "@gravity-ui/uikit"
import { useState } from "react"

import { updateCodeGraph } from "@/api"
import { ONLY_ENDPOINTS_CONFIG } from "@/const/tasks"
import { Modal } from "@/ui/components/Modal/Modal"
import { throttle } from "@/ui/hooks/throttle"
import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"
import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
import { CodeGraph } from "@/widgets/CodeGraph/CodeGraph"
import { TaskDescription } from "@/widgets/TaskDescription/TaskDescription"

import styles from "./TaskPage.module.scss"

const DEFAULT_CODE = `
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
`

const [throttledCodeGraph] = throttle(updateCodeGraph, 2000)

export const TaskPage = () => {
    const [userCode, setUserCode] = useState(DEFAULT_CODE)
    const [nodes, edges] = convertTaskConfigInProcessToCodeGraph(ONLY_ENDPOINTS_CONFIG)

    const onUserCodeType = (updatedCode: string) => {
        setUserCode(updatedCode)
        throttledCodeGraph(updatedCode)
    }
    return (
        <Box className={styles.page}>
            <Box className={styles.codeEditorWidgetWrapper}>
                <Modal canMinify={false} className={styles.taskDescriptionWidget} title="Задача А: Ping Pong">
                    <TaskDescription />
                </Modal>
                <Box className={styles.column}>
                    <Modal className={styles.codeGraphWidget} title="Архитектура сервиса">
                        <CodeGraph edges={edges} nodes={nodes} />
                    </Modal>
                    <Modal className={styles.codeEditorWidget} title="Редактор">
                        <CodeEditor currentCode={userCode} onChange={onUserCodeType} />
                    </Modal>

                </Box>
            </Box>

        </Box>
    )
}
