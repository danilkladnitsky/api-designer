from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

from app.core.config import settings
from app.dtos.llm import LLMRequest, LLMResponse


class LLMService:
    llm = ChatOpenAI
    memory = ConversationBufferMemory
    conversation = ConversationChain

    def __init__(self, api_key: str, model: str = "gpt-3.5-turbo", base_url: str = ""):
        self.llm = ChatOpenAI(
            model=model,
            openai_api_key=api_key,
            base_url=base_url,
            temperature=0.1,
            max_tokens=500,
        )

        self.memory = ConversationBufferMemory()
        self.conversation = ConversationChain(
            llm=self.llm,
            memory=self.memory,
        )

    def get_response(self, requestDTO: LLMRequest) -> LLMResponse:
        llm_response = self.conversation.run(requestDTO.prompt)
        return LLMResponse(response=llm_response)


llmService = LLMService(api_key=settings.LLM_API_KEY, base_url=settings.LLM_BASE_URL)
