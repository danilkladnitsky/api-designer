import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { Code, ID } from "shared/index"
import { Task, TaskConfig, TaskFile } from "shared/task"
import { WsEvents } from "shared/ws"

import { checkTaskSolution, getTaskById, getTasks, updateCodeGraph } from "@/api"
import { SAMPLE_TASK_CONFIG } from "@/const/tasks"
import { ITaskSolutionStatus } from "@/types/task"
import { debounce } from "@/ui/hooks/debounce"
import { syncTaskConfig } from "@/utils/syncTaskConfig"
import { useSocket } from "@/ws/useSocket"

interface IAppContext {
    task: Task | null
    taskList: Task[]
    taskFiles: TaskFile[]
    currentFile: TaskFile | null
    taskConfig: TaskConfig
    solutionStatus: ITaskSolutionStatus | null
    setTask: (task: Task | null) => void
    setTaskConfig: (task: TaskConfig) => void
    getTaskList: () => void
    setCurrentFile: (file: TaskFile) => void
    updateFileCode: (fileName: string, code: Code) => void
    loadTaskById: (id: ID) => void
    generateCodeGraph: (file: TaskFile) => void
    checkSolution: () => void
    setSolutionStatus: (status: ITaskSolutionStatus | null) => void
    clearSolutionStatus: () => void
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

    const onCodeGraphGenerate = (type: WsEvents, data: any) => {
        const syncedTaskConfig = syncTaskConfig(type, taskConfig, data)

        console.log(syncedTaskConfig)

        setTaskConfig(syncedTaskConfig)
    }

    useSocket({ onCodeGraphGenerate })

    const debouncedGraphUpdate = useMemo(() => debounce(updateCodeGraph, 2500), [])

    const updateFileCode = (fileName: string, code: Code) => {
        const changedFile = taskFiles.find(file => file.fileName === fileName)

        if (changedFile) {
            setTaskFiles(taskFiles.map(file => file.fileName === fileName ? { ...file, content: code } : file))
            debouncedGraphUpdate(changedFile)
        }
    }

    const loadTaskById = async (id: ID) => {
        const task = await getTaskById(id)

        if (!task) {
            return
        }

        setTask(task)
        setTaskFiles(task.files)
        setCurrentFile(task.files[0])
    }

    const getTaskList = async () => {
        const taskList = await getTasks()

        if (taskList) {
            setTaskList(taskList)
        }
    }

    const generateCodeGraph = async (file: TaskFile) => {
        updateCodeGraph(file)
    }

    const checkSolution = async () => {
        if (!task || !taskConfig) {
            return
        }

        const response = await checkTaskSolution({ taskId: task.id, userSolutionConfig: taskConfig })

        if (!response) {
            return
        }

        setSolutionStatus({
            completed: response.completed,
            message: response.message
        })
    }

    return (
        <AppContext.Provider value={{ updateFileCode, setTask, clearSolutionStatus: () => setSolutionStatus(null), checkSolution, loadTaskById, setCurrentFile, getTaskList, generateCodeGraph, setSolutionStatus, solutionStatus, task, taskFiles, currentFile, taskList, taskConfig, setTaskConfig }}>
            {children}
        </AppContext.Provider>
    )
}
