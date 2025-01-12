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
    endpoints: TaskEndpoint[]
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