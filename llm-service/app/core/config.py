from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="./.env",
        env_ignore_empty=True,
        extra="ignore",
    )
    PROJECT_NAME: str = "LLM Service"
    API_V1_STR: str = "/api/v1"
    all_cors_origins: list[str] = []
    LLM_API_KEY: str
    LLM_BASE_URL: str = ""


settings = Settings()
