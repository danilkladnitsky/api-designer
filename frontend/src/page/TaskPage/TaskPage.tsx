import { Box } from "@gravity-ui/uikit"
import { useState } from "react"

import { updateCodeGraph } from "@/api"
import { SAMPLE_TASK_CONFIG } from "@/const/tasks"
import { throttle } from "@/ui/hooks/throttle"
import { convertTaskConfigToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"
import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
import { CodeGraph } from "@/widgets/CodeGraph/CodeGraph"
import { TaskCommandPanel } from "@/widgets/TaskCommandPanel/TaskCommandPanel"
import { TaskDescription } from "@/widgets/TaskDescription/TaskDescription"

import styles from "./TaskPage.module.scss"

const TABS = [{
    id: "1",
    title: "Код"
},
{
    id: "2",
    title: "Архитектура"
}]

const DEFAULT_CODE = `
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
`

const [throttledCodeGraph] = throttle(updateCodeGraph, 2000)

export const TaskPage = () => {
    const [nodes, edges] = convertTaskConfigToCodeGraph(SAMPLE_TASK_CONFIG)
    const [userCode, setUserCode] = useState(DEFAULT_CODE)

    const onUserCodeType = (updatedCode: string) => {
        setUserCode(updatedCode)
        throttledCodeGraph(updatedCode)
    }
    return (
        <Box className={styles.page}>
            <CodeGraph edges={edges} nodes={nodes} />
            <TaskDescription className={styles.taskDescriptionWidget} />
            <Box className={styles.codeEditorWidget}>
                <CodeEditor currentCode={userCode} onChange={onUserCodeType} />
            </Box>
            <Box className={styles.commandPanel}>
                <TaskCommandPanel />
            </Box>
        </Box>
    )
}
