import { LLMInput } from "shared"

import { Code } from "@/domain/code"

const FEW_SHOT_QUESTION_1 = `
@app.get("/")
async def homepage():
    return JSONResponse({'hello': 'world'})
`

const FEW_SHOT_ANSWER_1 = `
{
    "endpoint": "/",
    "method": "GET"
}
`

const FEW_SHOT_QUESTION_2 = `
@app.post("/items/{item_id}")
async def create_item(item: Item, item_id: int):
    return JSONResponse({"item": item.dict(), "item_id": item_id})
`

const FEW_SHOT_ANSWER_2 = `
{
    "endpoint": "/items/{item_id}",
    "method": "POST"
}
`

export const PROMPTS = {
    BUILD_CODE_GRAPH: (code: Code): string => {
        const fewShots: LLMInput[] = [
            {
                content: `Ты парсер кода из Python в JSON. Найди все вызовы API и сконвертируй их в формат:
                {
                    endpoint: string,
                    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
                }

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
                {
                    endpoint: string,
                    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
                }
                    Верни только JSON

                Ответь сразу и без комментариев.
                ${code.content}`
        }

        return [...fewShots, question].reduce((acc, cur) => {
            return `${acc}\n${cur.content}`
        }, "")
    }
}
