import { Box, Tabs } from "@gravity-ui/uikit"
import { Task } from "shared/task"

import { useAppContext } from "@/app/App.context"
import { useCodeGraphNodes } from "@/hooks/useCodeGraphNodes"
import { Modal } from "@/ui/components/Modal/Modal"
import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
import { CodeGraph } from "@/widgets/CodeGraph/CodeGraph"
import { TaskDescription } from "@/widgets/TaskDescription/TaskDescription"

import styles from "./TaskPage.module.scss"

interface Props {
    task: Task
}
export const TaskPage = ({ task }: Props) => {
    const { taskFiles, currentFile, setCurrentFile, updateFileCode, generateCodeGraph } = useAppContext()

    const { nodes, edges, isLive, taskConfig } = useCodeGraphNodes(task.config)

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
                    <Modal loading={!isLive} className={styles.codeGraphWidget} title="Архитектура сервиса">
                        <CodeGraph key={taskConfig.version} edges={edges} nodes={nodes} />
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
                        {taskFiles.map(file => (
                            <CodeEditor onSubmit={generateCodeGraph} language={file.language} key={file.fileName} className={file.fileName === currentFile?.fileName ? styles.activeCodeFile : styles.codeFile} currentCode={file.content} fileName={file.fileName} onFileCodeChange={updateFileCode} />
                        ))}
                    </Modal>

                </Box>
            </Box>

        </Box>
    )
}
