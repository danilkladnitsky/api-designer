import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import { Code, ID } from "shared/index"
import { Task, TaskConfig, TaskFile } from "shared/task"

import { checkTaskSolution, generateContainer, generateEndpoints, getTaskById, getTasks } from "@/api"
import { SAMPLE_TASK_CONFIG } from "@/const/tasks"
import { ITaskSolutionStatus } from "@/types/task"
import { debounce } from "@/ui/hooks/debounce"

interface IAppContext {
    task: Task | null
    taskList: Task[]
    taskFiles: TaskFile[]
    currentFile: TaskFile | null
    taskConfig: TaskConfig
    solutionStatus: ITaskSolutionStatus | null
    isGenerating: boolean
    isChecking: boolean
    codeView: "code" | "diagram"
    setTask: (task: Task | null) => void
    setTaskConfig: (task: TaskConfig) => void
    getTaskList: () => void
    setCurrentFile: (file: TaskFile) => void
    updateFileCode: (fileName: string, code: Code) => void
    loadTaskById: (id: ID) => void
    checkSolution: () => void
    setSolutionStatus: (status: ITaskSolutionStatus | null) => void
    clearSolutionStatus: () => void
    setCodeView: (view: "code" | "diagram") => void
}

const AppContext = createContext({} as IAppContext)

export const useAppContext = (): IAppContext => useContext(AppContext)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [task, setTask] = useState<Task | null>(null)
    const [taskList, setTaskList] = useState<Task[]>([])
    const [taskFiles, setTaskFiles] = useState<TaskFile[]>([])
    const [currentFile, setCurrentFile] = useState<TaskFile | null>(null)
    const [solutionStatus, setSolutionStatus] = useState<ITaskSolutionStatus | null>(null)
    const [taskConfig, setTaskConfig] = useState<TaskConfig>(SAMPLE_TASK_CONFIG)
    const [isGenerating, setIsGenerating] = useState(false)
    const [codeView, setCodeView] = useState("code")
    const [isChecking, setIsChecking] = useState(false)

    const updateFileTaskConfig = async (file: TaskFile) => {
        setIsGenerating(true)

        const generate = () => {
            if (file.extension === "py") {
                return generateEndpoints(file)
            }
            else {
                return generateContainer(file)
            }
        }

        const response = await generate()

        if (!response) {
            setIsGenerating(false)
            return
        }

        const { content, type } = response

        if (type === "endpoints") {
            const { endpoints } = content
            setTaskConfig((prevConfig) => {
                const service = prevConfig.services[0]

                return {
                    ...prevConfig,
                    services: [
                        {
                            ...service,
                            endpoints: endpoints.map((e, idx) => ({ ...e, id: idx.toString() }))
                        }
                    ]
                }
            })
        }
        else if (type === "container") {
            const { container } = content

            setTaskConfig((prevConfig) => {
                if (!container) {
                    return prevConfig
                }

                return {
                    ...prevConfig,
                    container: {
                        ...container,
                        id: Math.random().toString(36).substring(2, 9)
                    }
                }
            })
        }

        setIsGenerating(false)
    }

    const debouncedGraphUpdate = useCallback(debounce(updateFileTaskConfig, 1500), [])

    const updateFileCode = (fileName: string, code: Code) => {
        const changedFile = taskFiles.find(file => file.fileName === fileName)

        if (!changedFile) {
            return
        }

        const updatedFiles = taskFiles.map(file => file.fileName === fileName ? { ...file, content: code } : file)
        const updatedFile = updatedFiles.find(file => file.fileName === fileName)

        setTaskFiles(updatedFiles)

        if (updatedFile) {
            debouncedGraphUpdate(updatedFile)
        }
    }

    const loadTaskById = async (id: ID) => {
        const task = await getTaskById(id)

        if (!task) {
            return
        }

        setTask(task)
        setTaskFiles(task.files)
        updateTaskConfig(task.files)
        setCurrentFile(task.files[0])
    }

    const getTaskList = async () => {
        const taskList = await getTasks()

        if (taskList) {
            setTaskList(taskList)
        }
    }

    const updateTaskConfig = async (taskFiles: TaskFile[]) => {
        const filesForUpdate = taskFiles.map(file => updateFileTaskConfig(file))

        await Promise.all(filesForUpdate)
    }
    const checkSolution = async () => {
        if (!task || !taskConfig) {
            return
        }

        setIsChecking(true)

        await updateTaskConfig(taskFiles)

        const response = await checkTaskSolution({ taskId: task.id, userSolutionConfig: taskConfig })

        if (!response) {
            setIsChecking(false)
            return
        }

        setSolutionStatus({
            completed: response.completed,
            message: response.message
        })

        setIsChecking(false)
    }

    return (
        <AppContext.Provider value={{ isChecking, setCodeView, updateFileCode, setTask, clearSolutionStatus: () => setSolutionStatus(null), checkSolution, loadTaskById, setCurrentFile, getTaskList, setSolutionStatus, codeView, isGenerating, solutionStatus, task, taskFiles, currentFile, taskList, taskConfig, setTaskConfig }}>
            {children}
        </AppContext.Provider>
    )
}
