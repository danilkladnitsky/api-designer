from app.controllers.rest.routes import llm, utils
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(utils.router)
api_router.include_router(llm.router)
