from fastapi import APIRouter

from app.dtos.llm import LLMRequest, LLMResponse
from app.services.llm.service import llmService

router = APIRouter(prefix="/llm", tags=["llm"])


@router.post("/generate", response_model=LLMResponse)
async def get_llm_response(requestDTO: LLMRequest) -> LLMResponse:
    result = llmService.get_response(requestDTO=requestDTO)
    return result
