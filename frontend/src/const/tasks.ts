import { TaskConfig, TaskConfigSolution } from "shared/task"

export const SAMPLE_TASK_CONFIG: TaskConfig = {

    container: null,
    router: null,
    clients: [{
        id: "sample-frontend",
        name: "Web Frontend"
    }],
    services: [{
        id: "sample-service",
        name: "Python service",
        type: "fastapi",
        endpoints: []
    }]
}

export const EMPTY_CONFIG: TaskConfigSolution = {
    clients: [],
    container: null,
    router: null,
    services: []
}
