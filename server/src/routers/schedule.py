import datetime

from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List
from server.src.database import schemas

schedule_router = APIRouter(
    prefix="/schedule",
    tags=["schedule"]
)
model = models.Schedule
schema = schemas.Schedule


@schedule_router.get('/get')
async def get(id: Optional[int] = None) -> schema | List[schema]:
    return await queries.db_select_by_id(model, id)


@schedule_router.get('/delete')
async def delete(id: int):
    return await queries.db_delete_by_id(model, id)


@schedule_router.post('/new')
async def add(data: schema):
    await queries.db_insert(model, **data.dict())


@schedule_router.post('/edit')
async def edit(data: schema):
    await queries.db_update(model, **data.dict())
