import { Play } from "@gravity-ui/icons"
import { Box, Button, Modal as GravityModal, Icon, Tabs } from "@gravity-ui/uikit"
import { useEffect } from "react"
import { Task } from "shared/task"

import { useAppContext } from "@/app/App.context"
import { Modal } from "@/ui/components/Modal/Modal"
import { CodeEditor } from "@/widgets/CodeEditor/CodeEditor"
import { CodeGraph } from "@/widgets/CodeGraph/CodeGraph"
import { TaskDescription } from "@/widgets/TaskDescription/TaskDescription"

import { EditorTitle } from "./EditorTitle"
import styles from "./TaskPage.module.scss"

interface Props {
    task: Task
}
export const TaskPage = ({ task }: Props) => {
    const { isChecking, taskFiles, codeView, currentFile, taskConfig, solutionStatus, isGenerating, setTaskConfig, setCurrentFile, updateFileCode, checkSolution, clearSolutionStatus } = useAppContext()

    const handleFileSelect = (fileName: string) => {
        const task = taskFiles.find(file => file.fileName === fileName)

        if (task) {
            setCurrentFile(task)
        }
    }

    const CodeEditorActions = () => (
        <Box className={styles.action}>
            <Button loading={isChecking} size="xl" onClick={checkSolution}>
                Проверить
                <Icon size={18} data={Play} />
            </Button>
        </Box>
    )

    useEffect(() => {
        setTaskConfig(task.config)
    }, [task])

    return (
        <Box className={styles.page}>
            <GravityModal onClose={clearSolutionStatus} open={!!solutionStatus}>
                <Modal canMinify={false} title="Результат проверки">
                    {solutionStatus?.message}
                </Modal>
            </GravityModal>
            <Box className={styles.codeEditorWidgetWrapper}>
                <Modal loading={!task} canMinify={false} className={styles.taskDescriptionWidget} title={task?.name}>
                    <TaskDescription task={task} />
                </Modal>
                <Box className={styles.column}>
                    <Modal canMinify={false} loading={!task} className={styles.codeEditorWidget} title={<EditorTitle />}>
                        {
                            codeView === "code"
                                ? (
                                        <>
                                            <Tabs
                                                allowNotSelected
                                                className={styles.tabs}
                                                onSelectTab={handleFileSelect}
                                                size="m"
                                                activeTab={currentFile?.fileName}
                                                items={taskFiles.map(file => ({ id: file.fileName, title: file.fileName }))}
                                            />
                                            {taskFiles.map(file => (
                                                <CodeEditor footer={CodeEditorActions} language={file.language} key={file.fileName} className={file.fileName === currentFile?.fileName ? styles.activeCodeFile : styles.codeFile} currentCode={file.content} file={file} onFileCodeChange={updateFileCode} />
                                            ))}
                                        </>
                                    )
                                : <CodeGraph isLoading={isGenerating} taskConfig={taskConfig} />
                        }
                    </Modal>

                </Box>
            </Box>

        </Box>
    )
}
