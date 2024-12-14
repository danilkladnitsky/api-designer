import "dotenv/config"

export type AppConfig = {
    OPENAI_API_KEY: string
}

export const getAppConfig = (): AppConfig => {
    return {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || ""
    }
}
