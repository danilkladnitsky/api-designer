import { ID, Timestamp } from "."

export type TaskRouter = {
    id: string
    name: string
    type: 'nginx' | 'traefik' | 'docker'
}

export type TaskClient = {
    id: string
    name: string
}

export type TaskEndpoint = {
    id: string
    url: string
    method: 'GET' | 'POST'
}

export type TaskService = {
    id: string
    name: string
    type: 'fastapi' | 'flask'
    endpoints?: TaskEndpoint[]
}

export type TaskContainer = {
    id: string
    name: string
    type: 'docker'
}

export type TaskDescription = {
    content: string
}

export interface TaskConfig {
    id: string
    name: string
    description: TaskDescription
    container: TaskContainer
    router: TaskRouter
    clients: TaskClient[]
    services: TaskService[]
}

export interface TaskConfigInProcess {
    container: TaskContainer | null
    router: TaskRouter | null
    clients: TaskClient[]
    services: TaskService[]
}

export interface TaskConfigSolution extends TaskConfigInProcess {
}

export interface Task {
    id: ID
    name: string
    description: string
    userSolution: TaskConfigInProcess | null
    answer: TaskConfigSolution
    createdAt: Timestamp
    updatedAt: Timestamp
}
