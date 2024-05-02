from datetime import datetime, timedelta
from fastapi import APIRouter
from server.src.database.models import Schedule, Change, Teacher, Discipline, ScheduleList, Flow, FlowGroup, Direction, Group
from server.src.database import queries
from typing import Optional, List, Final
from server.src.database import schemas, session_factory
from sqlalchemy.orm import aliased, selectinload, load_only
from sqlalchemy import sql, func, and_, select


schedule_router = APIRouter(
    prefix="/schedule",
    tags=["schedule"]
)
model = Schedule
schema = schemas.Schedule


DATE_FORMAT: Final = '%Y-%m-%d'


def get_cur_str_date():
    today = datetime.today()
    return (today - timedelta(days=today.weekday())).date().strftime(DATE_FORMAT)


@schedule_router.get('/get')
async def get(id: Optional[int] = None, group_id: Optional[int] = None, teacher_id: Optional[int] = None,
              start_of_week: Optional[str] = get_cur_str_date()):
    # Определение начала и конца текущей недели
    start_of_week = datetime.strptime(start_of_week, DATE_FORMAT)
    end_of_week = (start_of_week + timedelta(days=6))

    query = select(Schedule).options(
        selectinload(Schedule.flow).selectinload(Flow.flow_groups).selectinload(FlowGroup.group).selectinload(Group.direction),
        selectinload(Schedule.teacher),
        selectinload(Schedule.change).selectinload(Change.changed_teacher),
        selectinload(Schedule.schedule_list),
        selectinload(Schedule.discipline)
    )

    async with (session_factory() as session):

        if group_id is not None:
            query = query.where(and_(FlowGroup.group_id == group_id, Schedule.date.between(start_of_week, end_of_week)))
        elif teacher_id is not None:
            query = query.where(and_(Schedule.teacher_id == teacher_id, Schedule.date.between(start_of_week, end_of_week)))
        elif id is not None:
            query = query.where(and_(Schedule.id == id, Schedule.date.between(start_of_week, end_of_week)))

        query = query.order_by(Schedule.date, Schedule.time_start)
        result = await session.execute(query)
    return result.scalars().all()


@schedule_router.get('/delete')
async def delete(id: int):
    return await queries.db_delete_by_id(model, id)


@schedule_router.post('/new')
async def add(data: schema):
    await queries.db_insert(model, **data.dict())


@schedule_router.post('/edit')
async def edit(data: schema):
    await queries.db_update(model, **data.dict())
