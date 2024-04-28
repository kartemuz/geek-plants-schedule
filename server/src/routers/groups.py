from fastapi import APIRouter
from server.src.database import models, queries, session_factory
from typing import Optional, List
from server.src.database import schemas
from sqlalchemy import select


groups_router = APIRouter(
    prefix="/groups",
    tags=["groups"]
)
model = models.Group
schema = schemas.Group


@groups_router.get('/get')
async def get(id: Optional[int] = None, direction_id: Optional[int] = None) -> schema | List[schema]:
    if direction_id is not None:
        async with session_factory() as session:
            query = select(model).where(model.direction_id == direction_id)
            result = await session.execute(query)
            return result.scalars().all()
    else:
        return await queries.db_select_by_id(model, id)


@groups_router.get('/delete')
async def delete(id: int):
    return await queries.db_delete_by_id(model, id)


@groups_router.post('/new')
async def add(data: schema):
    await queries.db_insert(model, **data.dict())


@groups_router.post('/edit')
async def edit(data: schema):
    await queries.db_update(model, **data.dict())
