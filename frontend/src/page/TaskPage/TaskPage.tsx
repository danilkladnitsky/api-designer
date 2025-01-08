import { Box, Tabs } from "@gravity-ui/uikit"
import { useState } from "react"

import { updateCodeGraph } from "@/api"
import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
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

export const TaskPage = () => {
    const [userCode, setUserCode] = useState(DEFAULT_CODE)

    const onUserCodeType = (updatedCode: string) => {
        setUserCode(updatedCode)
        updateCodeGraph(updatedCode)
    }
    return (
        <Box className={styles.page}>
            <TaskDescription className={styles.taskDescriptionWidget} />
            <Box className={styles.codeEditorWidget}>
                <Tabs size="l" items={TABS} className={styles.tabs} />
                <CodeEditor currentCode={userCode} onChange={onUserCodeType} />
            </Box>
        </Box>
    )
}
