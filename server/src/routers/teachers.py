from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List
from server.src.database import schemas
from openpyxl import Workbook
from fastapi.responses import FileResponse


teachers_router = APIRouter(
    prefix="/teachers",
    tags=["teachers"]
)
model = models.Teacher
schema = schemas.Teacher


@teachers_router.get('/get')
async def get(id: Optional[int] = None) -> schema | List[schema]:
    return await queries.db_select_by_id(model, id)


@teachers_router.get('/delete')
async def delete(id: int):
    return await queries.db_delete_by_id(model, id)


@teachers_router.post('/new')
async def add(data: schema):
    await queries.db_insert(model, **data.dict())


@teachers_router.post('/edit')
async def edit(data: schema):
    await queries.db_update(model, **data.dict())


@teachers_router.get('/export')
async def export_():
    path = 'server/static/export.xlsx'
    data: List[model] = await queries.db_select_by_id(model)
    wb = Workbook()
    ws = wb.active
    ws.append(['Имя', 'Фамилия', 'Отчество', 'Позиция', 'Профиль'])
    for i in data:
        ws.append([i.firstname, i.surname, i.lastname, i.position, i.teaching_profile])
    wb.save(path)
    wb.close()
    return FileResponse(path=path, filename='teachers_export.xlsx', media_type='multipart/form-data')
