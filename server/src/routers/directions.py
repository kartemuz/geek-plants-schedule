from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List
from server.src.database import schemas
from openpyxl import load_workbook


directions_router = APIRouter(
    prefix="/directions",
    tags=["directions"]
)
model = models.Direction
schema = schemas.Direction
# workbook = load_workbook('static/direction.xlsx')


@directions_router.get('/get')
async def get(id: Optional[int] = None) -> schema | List[schema]:
    return await queries.db_select_by_id(model, id)


@directions_router.get('/delete')
async def delete(id: int):
    return await queries.db_delete_by_id(model, id)


@directions_router.post('/new')
async def add(data: schema):
    await queries.db_insert(model, **data.dict())


@directions_router.post('/edit')
async def edit(data: schema):
    await queries.db_update(model, **data.dict())


# @directions_router.get('/import')
# async def import_():
#     data = await queries.db_select_by_id(model)
#     for i in data:
#         print(i.__dict__)
