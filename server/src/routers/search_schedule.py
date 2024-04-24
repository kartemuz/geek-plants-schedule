from fastapi import APIRouter
from server.src.database import models
from server.src.database import session_factory
from sqlalchemy import select, cast, String
from sqlalchemy.orm import aliased


search_schedule_router = APIRouter(
    prefix="/searchSchedule",
    tags=["searchSchedule"]
)


@search_schedule_router.get('/group')
async def search_group(name: int):
    async with (session_factory() as session):
        group = aliased(models.Group)
        direction = aliased(models.Direction)
        query = select(group, direction).join(
                direction, group.direction_id == direction.id,
            ).filter(cast(group.id, String).like(f'%{name}%'))

        query_result = await session.execute(query)
        result = []
        for i in query_result.fetchall():
            g = i[0]
            d = i[1]
            result.append({'id': g.id, 'direction_id': g.direction_id, 'name': d.name})
        return result


@search_schedule_router.get('/teacher')
async def search_teacher(lastname: str):
    async with session_factory() as session:
        query = select(models.Teacher).filter(models.Teacher.lastname.like(f'%{lastname}%'))
        result = await session.execute(query)
        return result.scalars().all()
