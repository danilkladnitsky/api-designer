import asyncio
import json

import aioredis
from app.controllers.redis.routes import RedisController
from app.controllers.rest.main import api_router
from app.core.config import settings
from app.services.llm.service import llmService
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.state.redis = None


@app.on_event("startup")
async def lifespan():
    REDIS_URL = f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}"

    # TODO: add password
    app.state.redis = aioredis.from_url(REDIS_URL, db=int(settings.REDIS_DB, 0))

    asyncio.create_task(subscribe_to_channel("code/request/generate-graph"))


@app.on_event("shutdown")
async def shutdown_event():
    await app.state.redis.close()


async def subscribe_to_channel(channel: str):
    redis = app.state.redis
    pubsub = redis.pubsub()
    redisController = RedisController(redis=redis, llmService=llmService)

    await pubsub.subscribe(channel)
    print(f"Subscribed to channel: {channel}")

    async for message in pubsub.listen():
        if message["type"] == "message":
            print(f"Received message: {message['data'].decode('utf-8')}")
            message_data = json.loads(message["data"])

            await redisController.process_message(
                message_data["targetChannel"], message_data["data"]
            )


if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)
