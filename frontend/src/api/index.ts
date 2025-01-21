import { BuildGraphCodeDto, CheckTaskUserSolutionDto, CheckTaskUserSolutionResponseDto, GenerateContainerResponse, GenerateEducationLinksResponse, GenerateEndpointsResponse } from "shared/dtos"
import { ID } from "shared/index"
import { Task, TaskFile } from "shared/task"

import { sendRequest } from "./utils"

export const generateContainer = async (payload: TaskFile) => {
    return await sendRequest<BuildGraphCodeDto, GenerateContainerResponse>("/code/graph", "POST", {
        code: payload.content,
        extension: payload.extension,
        filename: payload.fileName
    })
}

export const generateEndpoints = async (payload: TaskFile) => {
    return await sendRequest<BuildGraphCodeDto, GenerateEndpointsResponse>("/code/graph", "POST", {
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

export const generateLinks = async (taskId: ID): Promise<GenerateEducationLinksResponse> => {
    const result = await sendRequest<void, GenerateEducationLinksResponse>(`/tasks/links/${taskId}`, "GET")

    if (!result) {
        return {
            type: "education-links",
            content: { links: [] }
        }
    }

    return result
}
