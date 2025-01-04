from typing import List

from pydantic import BaseModel


class LLMRequest(BaseModel):
    prompt: List[str]
    user_input: str


class LLMResponse(BaseModel):
    response: str
