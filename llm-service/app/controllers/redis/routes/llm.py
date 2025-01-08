from app.dtos.llm import LLMRequest
from app.services.llm.service import LLMService


class RedisLLMController:
    llmService = LLMService

    def process_message(self, channel: str, payload: LLMRequest):
        if channel == "code/request/generate-graph":
            return self.llmService.get_response(requestDTO=payload)
