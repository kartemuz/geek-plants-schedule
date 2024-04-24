from fastapi import APIRouter
from server.src.database import models
from server.src.database import session_factory
from sqlalchemy import select, cast, String


search_schedule_router = APIRouter(
    prefix="/searchSchedule",
    tags=["searchSchedule"]
)


@search_schedule_router.get('/group')
async def search_group(name: int):
    async with session_factory() as session:
        query = select(models.Group).filter(cast(models.Group.id, String).like(f'%{name}%'))
        result = await session.execute(query)
        return result.scalars().all()


@search_schedule_router.get('/teacher')
async def search_teacher(lastname: str):
    async with session_factory() as session:
        query = select(models.Teacher).filter(models.Teacher.lastname.like(f'%{lastname}%'))
        result = await session.execute(query)
        return result.scalars().all()
