import "dotenv/config"

export type AppConfig = {
    OPENAI_API_KEY: string
    GIGACHAT_ACCESS_TOKEN: string
}

export const getAppConfig = (): AppConfig => {
    return {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
        GIGACHAT_ACCESS_TOKEN: process.env.GIGACHAT_ACCESS_TOKEN || ""
    }
}
