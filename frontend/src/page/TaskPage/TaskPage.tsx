import { Box, Tabs } from "@gravity-ui/uikit"
import { useEffect, useState } from "react"
import { ID } from "shared/index"

import { useAppContext } from "@/app/App.context"
import { EMPTY_CONFIG } from "@/const/tasks"
import { Modal } from "@/ui/components/Modal/Modal"
import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"
import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
import { CodeGraph } from "@/widgets/CodeGraph/CodeGraph"
import { TaskDescription } from "@/widgets/TaskDescription/TaskDescription"

import styles from "./TaskPage.module.scss"

const FILES = {
    PYTHON: "main.py",
    DOCKER: "docker-compose.yml",
    NGINX: "nginx.conf"
} as const

const TABS = [{
    id: FILES.PYTHON,
    title: FILES.PYTHON
},
{
    id: FILES.DOCKER,
    title: FILES.DOCKER
}
]

interface Props {
    taskId: ID
}
export const TaskPage = ({ taskId }: Props) => {
    const { userCode, task, loadTaskById, setUserCode } = useAppContext()

    const [currentFile, setCurrentFile] = useState<string>(FILES.PYTHON)
    const [nodes, edges] = convertTaskConfigInProcessToCodeGraph(task?.userSolution || EMPTY_CONFIG)

    useEffect(() => {
        loadTaskById(taskId)
    }, [])

    return (
        <Box className={styles.page}>
            <Box className={styles.codeEditorWidgetWrapper}>
                <Modal loading={!task} canMinify={false} className={styles.taskDescriptionWidget} title={task?.name}>
                    <TaskDescription task={task} />
                </Modal>
                <Box className={styles.column}>
                    <Modal loading={!task} className={styles.codeGraphWidget} title="Архитектура сервиса">
                        <CodeGraph edges={edges} nodes={nodes} />
                    </Modal>
                    <Modal className={styles.codeEditorWidget} title="Редактор">
                        <Tabs
                            className={styles.tabs}
                            onSelectTab={setCurrentFile}
                            size="m"
                            activeTab={currentFile}
                            items={TABS}
                        />
                        {Object.values(FILES).map(file => (
                            <CodeEditor key={file} className={file === currentFile ? styles.activeCodeFile : styles.codeFile} currentCode={userCode[file]} fileName={file} onFileCodeChange={setUserCode} />
                        ))}
                    </Modal>

                </Box>
            </Box>

        </Box>
    )
}
