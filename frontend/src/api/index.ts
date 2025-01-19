import { Task, TaskFile } from "shared/task"

import { sendRequest } from "./utils"

export const updateCodeGraph = async (payload: TaskFile) => {
    return await sendRequest("/code/graph", "POST", {
        code: payload.content,
        extension: payload.extension,
        filename: payload.fileName
    })
}

export const getTaskById = async (id: string) => {
    const result = await sendRequest<Task>(`/tasks/${id}`, "GET")

    return result
}

export const getTasks = async () => {
    const result = await sendRequest<Task[]>(`/tasks`, "GET")

    return result
}
