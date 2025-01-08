from pydantic import BaseModel


class LLMRequest(BaseModel):
    context: str
    input: str


class LLMResponse(BaseModel):
    response: str
