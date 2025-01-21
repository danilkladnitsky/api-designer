import { BuildGraphCodeDto } from "shared/dtos"
import { LLMInput } from "shared/index"

const DOCKER_QUESTION_1 = `
services:
  backend:
    build: ./backend
    ports:
      - 8001:8000
`

const DOCKER_ANSWER_1 = `
container: {
{
    name: "backend",
    type: "docker",
    ports: [8001]
}
}
`

const DOCKER_QUESTION_2 = `
services:
  fastapi_service:
    build: ./fastapi
    ports:
      - 3000
`

const DOCKER_ANSWER_2 = `
{
    name: "fastapi_service",
    type: "docker",
    ports: [3000]
}
`

const DOCKER_QUESTION_3 = `
services:
  service:
    build: ./fastapi
`

const DOCKER_ANSWER_3 = `
{
container: {
    name: "service",
    type: "docker",
    ports: []
}
}
`

const DOCKER_QUESTION_4 = `
services:
  backend_service:
    ports:
`

const DOCKER_ANSWER_4 = `
{
container: {
    name: "backend_service",
    type: "docker",
    ports: []
}
}
`

const FEW_SHOT_QUESTION_1 = `
@app.get("/")
async def homepage():
    return JSONResponse({'hello': 'world'})
`

const FEW_SHOT_ANSWER_1 = `
{
    endpoints: [{
    "url": "/",
    "method": "GET"
}]
}
`

const FEW_SHOT_QUESTION_2 = `
@app.post("/items/{item_id}")
async def create_item(item: Item, item_id: int):
    return JSONResponse({"item": item.dict(), "item_id": item_id})
`

const FEW_SHOT_ANSWER_2 = `
{
    endpoints: [{
    "url": "/items/{item_id}",
    "method": "POST"
}]
}
`

export const PROMPTS = {
    SUGGEST_EDUCATION_LINKS: (topics: string[]): LLMInput[] => {
        return [
            {
                role: "assistant",
                content: `Ты ассистент для подбора учебных материалов в виде ссылок на ресурсы с документацией по программированию. Пришли массив из ссылок в виде:
                {
                    links: [{
                        title: string,
                        url: string
                    }]
                }
                `
            },
            {
                content: `Темы: ${topics.join(", ")}`,
                role: "user"
            }
        ]
    },
    GENERATE_SERVICE_ENDPOINTS_GRAPH: (payload: BuildGraphCodeDto): LLMInput[] => {
        const fewShots: LLMInput[] = [
            {
                content: `Ты парсер кода из Python в JSON. Найди все вызовы API и сконвертируй их в массив:
                {
                    endpoints: [{
                    url: string,
                    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
                }]
                }
            `,
                role: "assistant"
            },
            {
                content: `Пример 1: код ${FEW_SHOT_QUESTION_1} должен вернуть [${FEW_SHOT_ANSWER_1}]`,
                role: "assistant"
            },
            {
                content: `Пример 2: код ${FEW_SHOT_QUESTION_2} должен вернуть [${FEW_SHOT_ANSWER_2}]`,
                role: "assistant"
            }
        ]
        const question: LLMInput = {
            role: "user",
            content: payload.code
        }

        return [...fewShots, question]
    },
    GENERATE_DOCKER_GRAPH: (payload: BuildGraphCodeDto): LLMInput[] => {
        const fewShots: LLMInput[] = [
            {
                content: `Ты парсер кода из YAML в JSON. Преобразуй его в формат:
                {
                    container: {
                    name: string,
                    type: "docker",
                    ports: number[]
                }
                }

                Верни только JSON
            `,
                role: "assistant"
            },
            {
                content: `Пример 1: конфигурация ${DOCKER_QUESTION_1} должен вернуть [${DOCKER_ANSWER_1}]`,
                role: "assistant"
            },
            {
                content: `Пример 2: конфигурация ${DOCKER_QUESTION_2} должен вернуть [${DOCKER_ANSWER_2}]`,
                role: "assistant"
            },
            {
                content: `Пример 3: конфигурация ${DOCKER_QUESTION_3} должен вернуть [${DOCKER_ANSWER_3}]`,
                role: "assistant"
            },
            {
                content: `Пример 4: конфигурация ${DOCKER_QUESTION_4} должен вернуть [${DOCKER_ANSWER_4}]`,
                role: "assistant"
            }
        ]
        const question: LLMInput = {
            role: "user",
            content: payload.code
        }

        return [...fewShots, question]
    }
}
