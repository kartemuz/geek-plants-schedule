import datetime

from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List
from server.src.database import schemas, session_factory
from sqlalchemy import select, func
from sqlalchemy.orm import aliased


schedule_router = APIRouter(
    prefix="/schedule",
    tags=["schedule"]
)
model = models.Schedule
schema = schemas.Schedule


@schedule_router.get('/get')
async def get(id: Optional[int] = None, group_id: Optional[int] = None):
    if group_id is not None:
        tch = aliased(models.Teacher)
        sch = aliased(models.Schedule)
        chn = aliased(models.Change)
        dsc = aliased(models.Discipline)
        flw = aliased(models.Flow)
        flw_gr = aliased(models.FlowGroup)
        gr = aliased(models.Group)
        async with session_factory() as session:
            query = select(
                sch.id,
                sch.date,
                sch.room,
                sch.teacher_id,
                sch.type,
                sch.discipline_id,
                sch.flow_id,
                sch.time,
                sch.change_id,

                tch.lastname,
                tch.firstname,
                tch.surname,
                func.concat(
                    tch.lastname, ' ',
                    tch.firstname, ' ',
                    tch.surname,
                ).label('fullname'),
                tch.position,
                tch.teaching_profile,

                dsc.name.label('discipline_name'),
                dsc.lecture_hours,
                dsc.practice_hours,

                gr.id.label('group_id')
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
            ).where(gr.id == group_id)
            result = await session.execute(query)
            return result.mappings().all()
    else:
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
