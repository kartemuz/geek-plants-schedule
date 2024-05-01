from datetime import datetime, timedelta
from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List, Final
from server.src.database import schemas, session_factory
from sqlalchemy.orm import aliased
from sqlalchemy import sql, func, and_, select


schedule_router = APIRouter(
    prefix="/schedule",
    tags=["schedule"]
)
model = models.Schedule
schema = schemas.Schedule


DATE_FORMAT: Final = '%Y-%m-%d'


def get_cur_str_date():
    today = datetime.today()
    return (today - timedelta(days=today.weekday())).date().strftime(DATE_FORMAT)


a = timedelta(seconds=32)


@schedule_router.get('/get')
async def get(id: Optional[int] = None, group_id: Optional[int] = None, teacher_id: Optional[int] = None,
              start_of_week: Optional[str] = get_cur_str_date()):
    # Определение начала и конца текущей недели
    start_of_week = datetime.strptime(start_of_week, DATE_FORMAT)
    end_of_week = (start_of_week + timedelta(days=6))
    tch = aliased(models.Teacher)
    sch = aliased(models.Schedule)
    chn = aliased(models.Change)
    dsc = aliased(models.Discipline)
    flw = aliased(models.Flow)
    flw_gr = aliased(models.FlowGroup)
    gr = aliased(models.Group)
    drc = aliased(models.Direction)
    query = select(
        sch.id,
        sch.room,
        sch.teacher_id,
        sch.type,
        sch.discipline_id,
        sch.flow_id,
        sch.date,
        sql.label('time_start', sch.time_start),
        sql.label('time_end', sch.time_end),
        sch.change_id,

        tch.surname,
        tch.firstname,
        tch.lastname,

        func.concat(
            tch.surname, ' ',
            tch.firstname, ' ',
            tch.lastname,
        ).label('fullname'),
        tch.position,
        tch.teaching_profile,

        dsc.name.label('discipline_name'),
        dsc.lecture_hours,
        dsc.practice_hours,

        gr.id.label('group_id'),

        sql.label('change_surname', 'surname'),
        sql.label('change_firstname', 'firstname'),
        sql.label('change_lastname', 'lastname'),
        func.concat(
            tch.surname, ' ',
            tch.firstname, ' ',
            tch.lastname,
        ).label('change_fullname'),
        tch.position.label('change_position'),
        tch.teaching_profile.label('change_teaching_profile')

    ).join(
        tch, sch.teacher_id == tch.id
    ).join(
        dsc, sch.discipline_id == dsc.id
    ).join(
        chn, sch.change_id == chn.id, isouter=True
    ).join(
        flw, sch.flow_id == flw.id
    ).join(
        flw_gr, flw.id == flw_gr.flow_id
    ).join(
        gr, flw_gr.group_id == gr.id
    ).join(
        drc, drc.id == gr.direction_id
    )

    async with (session_factory() as session):
        if group_id is not None:
            query = query.where(and_(gr.id == group_id, sch.date.between(start_of_week, end_of_week)))
        elif teacher_id is not None:
            query = query.where(and_(sch.teacher_id == teacher_id, sch.date.between(start_of_week, end_of_week)))
        elif id is not None:
            query = query.where(and_(sch.id == id, sch.date.between(start_of_week, end_of_week)))

        query = query.order_by(sch.date, sch.time_start)
        result = await session.execute(query)
    return result.mappings().all()


@schedule_router.get('/delete')
async def delete(id: int):
    return await queries.db_delete_by_id(model, id)


@schedule_router.post('/new')
async def add(data: schema):
    await queries.db_insert(model, **data.dict())


@schedule_router.post('/edit')
async def edit(data: schema):
    await queries.db_update(model, **data.dict())
