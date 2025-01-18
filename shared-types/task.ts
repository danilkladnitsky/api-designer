import { ID } from "."

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
    container: TaskContainer | null
    router: TaskRouter | null
    clients: TaskClient[]
    services: TaskService[]
}

export type TaskFile = {
    fileName: string
    extension: string
    content: string
    language: string
}

export interface Task { 
    id: ID
    name: string
    description: string
    config: TaskConfig
    files: TaskFile[]
}

export interface TaskSolution {
    id: ID
    taskId: ID
    answer: TaskConfig
}

export interface TaskUserSolution {
    taskId: ID
    userSolution: TaskConfig
}