import { CheckTaskUserSolutionResponseDto } from "shared/dtos"
import { TaskConfig, TaskConfigSolution } from "shared/task"

export const compareTaskConfigs = (answer: TaskConfigSolution, { container, router, services }: TaskConfig): CheckTaskUserSolutionResponseDto => {
    const correctContainerType = answer.container?.type
    const corectContainerPorts = answer.container?.ports || []

    if (correctContainerType !== container?.type) {
        return {
            completed: false,
            message: "Container type is incorrect"
        }
    }

    if (!corectContainerPorts.every(port => container?.ports.includes(port))) {
        return {
            completed: false,
            message: "Container ports are incorrect"
        }
    }

    const correctEndpoints = answer.services.flatMap(service => service.endpoints)
    const correctRouterType = answer.router?.type

    const userEndpoints = services.flatMap(service => service.endpoints || [])
    const userRouterType = router?.type

    if (correctRouterType !== userRouterType) {
        return {
            completed: false,
            message: "Router type is incorrect"
        }
    }

    if (!correctEndpoints.every(endpoint => userEndpoints.some(userEndpoint => userEndpoint.method === endpoint.method && userEndpoint.url === endpoint.url))) {
        return {
            completed: false,
            message: "Endpoints are incorrect"
        }
    }

    return {
        completed: true,
        message: "Task completed successfully"
    }
}
