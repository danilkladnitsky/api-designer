import { TaskConfig, TaskConfigSolution } from "shared/task"

export const SAMPLE_TASK_CONFIG: TaskConfig = {
    id: "sample",
    name: "VOL. 1. Hello World",
    description: {
        content: "This is a sample task."
    },
    container: {
        id: "sample-container",
        name: "Docker",
        type: "docker"
    },
    router: {
        id: "sample-router",
        name: "Nginx",
        type: "nginx"
    },
    clients: [{
        id: "sample-frontend",
        name: "Web Frontend"
    }],
    services: [{
        id: "sample-service",
        name: "FastApi service",
        type: "fastapi",
        endpoints: [{
            id: "sample-endpoint",
            url: "/hello-world",
            method: "GET"
        }]
    }]
}

export const EMPTY_CONFIG: TaskConfigSolution = {
    clients: [],
    container: null,
    router: null,
    services: []
}
