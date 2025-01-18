import { Box, Tabs } from "@gravity-ui/uikit"
import { useEffect } from "react"
import { ID } from "shared/index"

import { useAppContext } from "@/app/App.context"
import { EMPTY_CONFIG } from "@/const/tasks"
import { Modal } from "@/ui/components/Modal/Modal"
import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"
import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
import { CodeGraph } from "@/widgets/CodeGraph/CodeGraph"
import { TaskDescription } from "@/widgets/TaskDescription/TaskDescription"

import styles from "./TaskPage.module.scss"

interface Props {
    taskId: ID
}
export const TaskPage = ({ taskId }: Props) => {
    const { userCode, task, taskFiles, currentFile, setCurrentFile, loadTaskById, setUserCode } = useAppContext()

    const [nodes, edges] = convertTaskConfigInProcessToCodeGraph(task?.config || EMPTY_CONFIG)

    useEffect(() => {
        loadTaskById(taskId)
    }, [])

    const handleFileSelect = (fileName: string) => {
        const task = taskFiles.find(file => file.fileName === fileName)

        if (task) {
            setCurrentFile(task)
        }
    }

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
                    <Modal loading={!task} className={styles.codeEditorWidget} title="Редактор">
                        <Tabs
                            allowNotSelected
                            className={styles.tabs}
                            onSelectTab={handleFileSelect}
                            size="m"
                            activeTab={currentFile?.fileName}
                            items={taskFiles.map(file => ({ id: file.fileName, title: file.fileName }))}
                        />
                        {userCode && Object.entries(userCode).map(([fileName, { code, language }]) => (
                            <CodeEditor language={language} key={fileName} className={fileName === currentFile?.fileName ? styles.activeCodeFile : styles.codeFile} currentCode={code} fileName={fileName} onFileCodeChange={setUserCode} />
                        ))}
                    </Modal>

                </Box>
            </Box>

        </Box>
    )
}
