import { Code, ID, LLMOutput } from "."
import { EducationLink } from "./education"
import { TaskConfig, TaskContainer, TaskEndpoint } from "./task"

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

export type GenerateEndpointsResponse = LLMOutput<{
    endpoints: Omit<TaskEndpoint, 'id'>[]
}, 'endpoints'>

export type GenerateEducationLinksResponse = LLMOutput<{
    links: EducationLink[]
}, 'education-links'>


export type GenerateContainerResponse = LLMOutput<
     {
    container: Omit<TaskContainer, 'id'>
}, 'container'>