import json

import aioredis
from app.dtos.llm import LLMRequest
from app.services.llm.service import LLMService


class RedisController:
    def __init__(self, llmService: LLMService, redis: aioredis.Redis):
        self.llmService = llmService
        self.redis = redis

    async def process_message(self, targetChannel: str, payload: LLMRequest):
        response = self.llmService.get_response(requestDTO=payload)

        res = dict()
        res["data"] = dict()
        res["data"]["response"] = response.response
        res["targetChannel"] = targetChannel

        print(res)

        await self.redis.publish(targetChannel, json.dumps(res))
