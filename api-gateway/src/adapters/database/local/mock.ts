import { Task } from "shared/task"

const HELLO_WORLD_TASK: Task = {
    id: "1",
    name: "Hello World",
    description: `Спроектируйте сервис с единственным эндпоинтом - /hello-world, который возвращает "Hello World!"

    Данный сервис должен быть размещен в Docker-контейнере, доступен по порту 3000, на который будет обращаться фронтенд.

    Отредактируйте файлы main.py и docker-compose.yml соответственно.
    `,
    files: [{
        fileName: "main.py",
        extension: "py",
        content: `from fastapi import FastAPI

app = FastAPI()

@app.get("/hello-world")
async def hello_world():
    return "Hello World!"


        `,
        language: "python"
    },
    {
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
    }],
    config: {
        clients: [{
            id: "sample-frontend",
            name: "Web Frontend"
        }],
        services: [{
            id: "sample-service",
            name: "FastApi service",
            type: "fastapi",
            endpoints: []
        }],
        container: null,
        router: null
    }
}

export const MOCK_TASKS = [
    HELLO_WORLD_TASK
]
