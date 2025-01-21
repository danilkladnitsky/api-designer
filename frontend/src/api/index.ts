import { CheckTaskUserSolutionDto, CheckTaskUserSolutionResponseDto } from "shared/dtos"
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
    const result = await sendRequest<null, Task>(`/tasks/${id}`, "GET")

    return result
}

export const getTasks = async () => {
    const result = await sendRequest<null, Task[]>(`/tasks`, "GET")

    return result
}

export const checkTaskSolution = async (payload: CheckTaskUserSolutionDto): Promise<CheckTaskUserSolutionResponseDto> => {
    const result = await sendRequest<CheckTaskUserSolutionDto, CheckTaskUserSolutionResponseDto>(`/tasks/check`, "POST", payload)

    if (!result) {
        return {
            completed: false,
            message: "Task solution not found"
        }
    }

    return result
}
