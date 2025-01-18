import { createContext, ReactNode, useContext, useState } from "react"
import { Code, ID } from "shared/index"
import { Task, TaskFile } from "shared/task"

import { getTaskById } from "@/api"

interface IAppContext {
    userCode: Record<ID, {
        code: Code
        language: string
    }>
    task: Task | null
    taskFiles: TaskFile[]
    currentFile: TaskFile | null
    setCurrentFile: (file: TaskFile) => void
    setUserCode: (fileName: string, code: Code) => void
    loadTaskById?: (id: ID) => void
}

const DEFAULT_CODE = `from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
`

const AppContext = createContext({} as IAppContext)

export const useAppContext = (): IAppContext => useContext(AppContext)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [task, setTask] = useState<Task | null>(null)
    const [taskFiles, setTaskFiles] = useState<TaskFile[]>([])
    const [currentFile, setCurrentFile] = useState<TaskFile | null>(null)
    const [userCode, setUserCode] = useState<IAppContext["userCode"] | null>(null)

    const handleUserCodeChange = (fileName: string, code: Code) => {
        setUserCode((prev) => {
            return {
                ...prev,
                [fileName]: {
                    code,
                    language: prev[fileName].language
                }
            }
        })
    }

    const loadTaskById = async (id: ID) => {
        const task = await getTaskById(id)

        if (!task) {
            return
        }

        setTask(task)
        setTaskFiles(task.files)

        const normalizedFiles = taskFiles.reduce((acc, file) => {
            return {
                ...acc,
                [file.fileName]: {
                    code: file.content,
                    language: file.language
                }
            }
        }, {})

        setCurrentFile(task.files[0])

        setUserCode(normalizedFiles)
    }

    return (
        <AppContext.Provider value={{ setUserCode: handleUserCodeChange, loadTaskById, setCurrentFile, userCode, task, taskFiles, currentFile }}>
            {children}
        </AppContext.Provider>
    )
}
