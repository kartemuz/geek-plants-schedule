from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List
from server.src.database import schemas
from openpyxl import Workbook
from fastapi.responses import FileResponse


directions_router = APIRouter(
    prefix="/directions",
    tags=["directions"]
)
model = models.Direction
schema = schemas.Direction


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


@directions_router.get('/export')
async def export_():
    path = 'server/static/export.xlsx'
    data: List[model] = await queries.db_select_by_id(model)
    wb = Workbook()
    ws = wb.active
    ws.append(['Название', 'Тип', 'Практика'])
    for i in data:
        i.type: models.dir_type
        ws.append([i.name, i.type.value, i.practice])
    wb.save(path)
    wb.close()
    return FileResponse(path=path, filename='directions_export.xlsx', media_type='multipart/form-data')
