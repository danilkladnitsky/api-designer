import { Box, Tabs } from "@gravity-ui/uikit"
import { Task } from "shared/task"

import { useAppContext } from "@/app/App.context"
import { EMPTY_CONFIG } from "@/const/tasks"
import { Modal } from "@/ui/components/Modal/Modal"
import { convertTaskConfigInProcessToCodeGraph } from "@/utils/convertTaskConfigToCodeGraph"
import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
import { CodeGraph } from "@/widgets/CodeGraph/CodeGraph"
import { TaskDescription } from "@/widgets/TaskDescription/TaskDescription"

import styles from "./TaskPage.module.scss"

interface Props {
    task: Task
}
export const TaskPage = ({ task }: Props) => {
    const { taskFiles, currentFile, setCurrentFile, updateFileCode } = useAppContext()

    const [nodes, edges] = convertTaskConfigInProcessToCodeGraph(task?.config || EMPTY_CONFIG)

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
                        {taskFiles.map(file => (
                            <CodeEditor language={file.language} key={file.fileName} className={file.fileName === currentFile?.fileName ? styles.activeCodeFile : styles.codeFile} currentCode={file.content} fileName={file.fileName} onFileCodeChange={updateFileCode} />
                        ))}
                    </Modal>

                </Box>
            </Box>

        </Box>
    )
}
