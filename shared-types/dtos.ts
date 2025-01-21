import { Code, ID } from "."
import { TaskConfig } from "./task"

export type BuildGraphCodeDto = {
    filename: string
    extension: string
    code: Code
}

export type WsGraphPayload = {
    event: string
    data: any
}

export type CheckTaskUserSolutionDto = {
    taskId: ID
    userSolutionConfig: TaskConfig
}

export type CheckTaskUserSolutionResponseDto = {
    completed: boolean;
    message: string;
}