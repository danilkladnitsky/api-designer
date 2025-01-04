import "dotenv/config"

export type AppConfig = {
    OPENAI_API_KEY: string
    GIGACHAT_ACCESS_TOKEN: string
    REDIS_HOST: string
    REDIS_PORT: number
    REDIS_PASSWORD: string
}

export const getAppConfig = (): AppConfig => {
    return {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
        GIGACHAT_ACCESS_TOKEN: process.env.GIGACHAT_ACCESS_TOKEN || "",
        REDIS_HOST: process.env.REDIS_HOST || "localhost",
        REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379"),
        REDIS_PASSWORD: process.env.REDIS_PASSWORD || ""
    }
}
