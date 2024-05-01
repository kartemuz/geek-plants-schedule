from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List
from server.src.database import schemas, session_factory
from sqlalchemy import select, update


org_router = APIRouter(
    prefix="/org",
    tags=["org"]
)
model = models.Org
schema = schemas.Org


@org_router.get('/get')
async def get() -> schema:
    query = select(model)
    async with session_factory() as session:
        result = await session.execute(query)
    return result.scalars().first()


@org_router.post('/edit')
async def edit(data: schema):
    query = update(model).where(model.id == data.id).values(data.dict())
    async with session_factory() as session:
        await session.execute(query)
        await session.commit()
