from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List
from server.src.database import schemas


disciplines_router = APIRouter(
    prefix="/disciplines",
    tags=["disciplines"]
)
model = models.Discipline
schema = schemas.Discipline


@disciplines_router.get('/get')
async def get(id: Optional[int] = None) -> schema | List[schema]:
    return await queries.db_select_by_id(model, id)


@disciplines_router.get('/delete')
async def delete(id: int):
    return await queries.db_delete_by_id(model, id)


@disciplines_router.post('/new')
async def add(data: schema):
    await queries.db_insert(model, **data.dict())


@disciplines_router.post('/edit')
async def edit(data: schema):
    await queries.db_update(model, **data.dict())
