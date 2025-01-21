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
{
    name: "backend",
    type: "docker",
    ports: [8001]
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
    name: "service",
    type: "docker",
    ports: []
}
`

const DOCKER_QUESTION_4 = `
services:
  backend_service:
    ports:
`

const DOCKER_ANSWER_4 = `
{
    name: "backend_service",
    type: "docker",
    ports: []
}
`

const FEW_SHOT_QUESTION_1 = `
@app.get("/")
async def homepage():
    return JSONResponse({'hello': 'world'})
`

const FEW_SHOT_ANSWER_1 = `
[{
    "url": "/",
    "method": "GET"
}]
`

const FEW_SHOT_QUESTION_2 = `
@app.post("/items/{item_id}")
async def create_item(item: Item, item_id: int):
    return JSONResponse({"item": item.dict(), "item_id": item_id})
`

const FEW_SHOT_ANSWER_2 = `
[{
    "url": "/items/{item_id}",
    "method": "POST"
}]
`

export const PROMPTS = {
    GENERATE_SERVICE_ENDPOINTS_GRAPH: (payload: BuildGraphCodeDto): string => {
        const fewShots: LLMInput[] = [
            {
                content: `Ты парсер кода из Python в JSON. Найди все вызовы API и сконвертируй их в формат:
                [{
                    url: string,
                    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
                }]

                Верни только JSON
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
        const question = {
            content: `
                Выведи все API - функции в виде массива в формате
                [{
                    urt: string,
                    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
                }]
                    Верни только JSON-массив

                Ответь сразу и без комментариев.
                ${payload.code}`
        }

        return [...fewShots, question].reduce((acc, cur) => {
            return `${acc}\n${cur.content}`
        }, "")
    },
    GENERATE_DOCKER_GRAPH: (payload: BuildGraphCodeDto): string => {
        const fewShots: LLMInput[] = [
            {
                content: `Ты парсер кода из YAML в JSON. Преобразуй его в формат:
                {
                    name: string,
                    type: "docker",
                    ports: number[]
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
        const question = {
            content: `Ответь сразу и без комментариев.
                ${payload.code}`
        }

        return [...fewShots, question].reduce((acc, cur) => {
            return `${acc}\n${cur.content}`
        }, "")
    }
}
