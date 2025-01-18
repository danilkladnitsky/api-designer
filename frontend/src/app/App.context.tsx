import { createContext, ReactNode, useContext, useState } from "react"
import { Code, ID } from "shared/index"
import { Task, TaskConfig } from "shared/task"

import { getTaskById } from "@/api"

interface IAppContext {
    userCode: Record<string, Code>
    task: Task | null
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
    const [task, setTask] = useState<TaskConfig | null>(null)
    const [userCode, setUserCode] = useState<IAppContext["userCode"]>({ "main.py": DEFAULT_CODE })

    const handleUserCodeChange = (fileName: string, code: Code) => {
        setUserCode(v => ({ ...v, [fileName]: code }))
    }

    const loadTaskById = async (id: ID) => {
        const taskConfig = await getTaskById(id)

        if (taskConfig) {
            setTask(taskConfig)
        }
    }

    return (
        <AppContext.Provider value={{ setUserCode: handleUserCodeChange, loadTaskById, userCode, task }}>
            {children}
        </AppContext.Provider>
    )
}
