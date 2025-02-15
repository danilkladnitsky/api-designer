import { Task, TaskService, TaskSolution } from "shared/task"

const MOCK_PYTHON_SERVICE_CODE = {
    fileName: "main.py",
    extension: "py",
    content: `from fastapi import FastAPI

app = FastAPI()

@app.get("/ping")
async def hello_world():
    return "pong"


        `,
    language: "python"
}

const MOCK_DOCKER_CODE = {
    fileName: "docker-compose.yml",
    extension: "yml",
    content: `
version: '3.7'

services:
  backend_service:
    build: ./movie-service
    command: uvicorn app.main:app --reload --host 0.0.0.0 --port 3000
    ports:
      - 3000:3000
`,
    language: "yaml"
}

const FRONTEND_CLIENT = {
    id: "sample-frontend",
    name: "Web Frontend"
}

const FASTAPI_SERVICE: TaskService = {
    id: "sample-service",
    name: "FastApi service",
    type: "fastapi",
    endpoints: []
}

const HELLO_WORLD_SOLUTION: TaskSolution = {
    taskId: "1",
    id: "1-solution",
    answer: {
        container: null,
        router: null,
        services: [
            {
                endpoints: [{
                    method: "GET",
                    url: "/hello-world"
                }]
            }
        ]
    }
}

const USERS_CRUD_SOLUTION: TaskSolution = {
    taskId: "2",
    id: "2-solution",
    answer: {
        container: null,
        router: null,
        services: [
            {
                endpoints: [{
                    method: "GET",
                    url: "/users"
                }, {
                    method: "POST",
                    url: "/users"
                }, {
                    method: "GET",
                    url: "/users/{id}"
                }, {
                    method: "PUT",
                    url: "/users/{id}"
                }, {
                    method: "DELETE",
                    url: "/users/{id}"
                }]
            }
        ]
    }
}

const HELLO_WORLD_TASK: Task = {
    id: "1",
    name: "FastApi: Hello World",
    description: `Спроектируйте простой бэкенд-сервис с единственным эндпоинтом - /hello-world, который возвращает "Hello World!". Эндпоинт должен быть доступен через методу GET.
    `,
    files: [MOCK_PYTHON_SERVICE_CODE],
    config: {
        clients: [FRONTEND_CLIENT],
        services: [FASTAPI_SERVICE],
        container: null,
        router: null
    }
}

const USERS_CRUD_TASK: Task = {
    id: "2",
    name: "FastApi: CRUD",
    description: `Создайте CRUD для сущности "Пользователи". 
Ваш сервис должен позволять совершать основные операции: Создание, удаление, редактирование и получение пользователей.
`,
    config: {
        clients: [FRONTEND_CLIENT],
        services: [FASTAPI_SERVICE],
        container: null,
        router: null
    },
    files: [MOCK_PYTHON_SERVICE_CODE]
}

export const MOCK_TASKS = [
    HELLO_WORLD_TASK,
    USERS_CRUD_TASK
]

export const MOCK_SOLUTIONS = [
    HELLO_WORLD_SOLUTION,
    USERS_CRUD_SOLUTION
]
