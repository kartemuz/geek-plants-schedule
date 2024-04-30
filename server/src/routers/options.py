from fastapi import APIRouter
from server.src.database import models, schemas, queries, session_factory
from typing import Optional
from sqlalchemy import select


options_router = APIRouter(
    prefix="/options",
    tags=["options"]
)
model = models.Options


@options_router.get('/get')
async def get(id: Optional[int] = None):
    async with session_factory() as session:
        query = select(model)
        if id is not None:
           query = query.where(model.id == id)
        result = await session.execute(query)
    return result.scalars().all()
