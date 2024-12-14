import { Code } from "@/domain/code"

export const PROMPTS = {
    BUILD_CODE_GRAPH: (code: Code) => {
        return `
        Build a graph of API calls for the following code: ${code.content}
        Follow this format:
        {
            endpoint: string,
            method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
        }
        Send the response in JSON format without any additional text. Only the JSON.
        `
    }
}
