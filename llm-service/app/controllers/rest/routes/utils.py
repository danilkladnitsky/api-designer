from fastapi import APIRouter

router = APIRouter(prefix="/utils", tags=["utils"])


@router.get("/ping", response_model=bool)
async def health_check() -> bool:
    return True
