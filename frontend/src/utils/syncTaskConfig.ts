import { TaskConfig, TaskContainer, TaskEndpoint, TaskRouter, TaskService } from "shared/task"
import { WsEvents } from "shared/ws"

type GeneratedEndpoint = Omit<TaskEndpoint, "id">
type GeneratedContainer = Omit<TaskContainer, "id">

export const syncTaskConfig = (type: WsEvents, taskConfig: TaskConfig, data: GeneratedEndpoint[] | GeneratedContainer) => {
    const service = taskConfig.services[0]

    if (type === "generate-endpoints") {
        const endpoints = data as GeneratedEndpoint[]

        const updatedService: TaskService = {
            ...service,
            endpoints: endpoints.map(endpoint => ({
                ...endpoint,
                id: Math.random().toString(36).substring(2, 9)
            }))
        }

        return {
            ...taskConfig,
            services: [updatedService]
        }
    }
    else if (type === "generate-docker") {
        const container = data as GeneratedContainer

        const newContainer: TaskContainer = {
            ...taskConfig.container,
            id: Math.random().toString(36).substring(2, 9),
            name: container.name,
            ports: container.ports,
            type: container.type
        }

        const router: TaskRouter = {
            id: Math.random().toString(36).substring(2, 9),
            name: container.name,
            type: "docker"
        }

        return {
            ...taskConfig,
            container: newContainer,
            router
        }
    }

    return taskConfig
}
