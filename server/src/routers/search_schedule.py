from fastapi import APIRouter
from server.src.database import models
from server.src.database import session_factory
from sqlalchemy import select, cast, String, func
from sqlalchemy.orm import aliased


search_schedule_router = APIRouter(
    prefix="/searchSchedule",
    tags=["searchSchedule"]
)


@search_schedule_router.get('/group')
async def search_group(name: int):
    async with session_factory() as session:
        gr = aliased(models.Group)
        drc = aliased(models.Direction)
        query = select(gr.id, drc.name, gr.direction_id, drc.type).join(
            drc, gr.direction_id == drc.id,
            ).filter(cast(gr.id, String).like(f'%{name}%'))

        result = await session.execute(query)
        return result.mappings().all()


@search_schedule_router.get('/teacher')
async def search_teacher(lastname: str):
    async with session_factory() as session:
        query = select(models.Teacher).filter(models.Teacher.lastname.like(f'%{lastname}%'))
        result = await session.execute(query)
        return result.scalars().all()
