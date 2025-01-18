import { BuildGraphCodeDto } from "shared/dtos"
import { Task } from "shared/task"

import { sendRequest } from "./utils"

export const updateCodeGraph = async (code: string) => {
    return await sendRequest<BuildGraphCodeDto>("/code/graph", "POST", { code })
}

export const getTaskById = async (id: string) => {
    const result = await sendRequest<Task>(`/tasks/${id}`, "GET")

    return result
}
