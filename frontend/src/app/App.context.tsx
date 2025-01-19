import { createContext, ReactNode, useContext, useState } from "react"
import { Code, ID } from "shared/index"
import { Task, TaskFile } from "shared/task"

import { getTaskById, getTasks, updateCodeGraph } from "@/api"

interface IAppContext {
    task: Task | null
    taskList: Task[]
    taskFiles: TaskFile[]
    currentFile: TaskFile | null
    getTaskList: () => void
    setCurrentFile: (file: TaskFile) => void
    updateFileCode: (fileName: string, code: Code) => void
    loadTaskById: (id: ID) => void
    generateCodeGraph: () => void
}

const AppContext = createContext({} as IAppContext)

export const useAppContext = (): IAppContext => useContext(AppContext)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [task, setTask] = useState<Task | null>(null)
    const [taskList, setTaskList] = useState<Task[]>([])
    const [taskFiles, setTaskFiles] = useState<TaskFile[]>([])
    const [currentFile, setCurrentFile] = useState<TaskFile | null>(null)

    const updateFileCode = (fileName: string, code: Code) => {
        setTaskFiles(taskFiles.map(file => file.fileName === fileName ? { ...file, content: code } : file))
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

    const generateCodeGraph = async () => {
        const pythonFile = taskFiles.find(file => file.extension === "py")

        if (!pythonFile) {
            return
        }

        updateCodeGraph(pythonFile)
    }

    return (
        <AppContext.Provider value={{ updateFileCode, loadTaskById, setCurrentFile, getTaskList, generateCodeGraph, task, taskFiles, currentFile, taskList }}>
            {children}
        </AppContext.Provider>
    )
}
