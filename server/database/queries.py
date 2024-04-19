from server.database import session_factory
from server.database.models import Schedule, Group, Teacher

from typing import List
from asyncpg import exceptions
from sqlalchemy import update, select


async def insert_data(model, **kwargs) -> bool:
    result = False
    async with session_factory() as session:
        try:
            note = model(**kwargs)
            session.add(note)
            await session.commit()
            result = True
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result


async def delete_by_id(model, id_: int) -> bool:
    result = False
    async with session_factory() as session:
        try:
            # x = await session.query(model).filter_by(id=id_).first()
            x = await session.get(model, id_)
            await session.delete(x)
            await session.commit()
            result = True
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result


# Возвращает model
async def select_by_id(model, id_: int):
    result = None
    async with session_factory() as session:
        try:
            selected_model = await session.get(model, id_)
            result = selected_model
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result


# Возвращает записи по id учителя
async def select_schedule_by_teacher(teacher: int) -> List[Schedule]:
    result = None
    async with session_factory() as session:
        try:
            query = select(Schedule).where(teacher_id=teacher)
            selected_models = await session.execute(query)
            result = selected_models
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result


# Поиск по первым символам
async def search_groups(n_group: str) -> List[Group]:
    result = []
    async with session_factory() as session:
        try:
            query = select(Group).filter(Group.n_group.startswith(n_group))
            selected_models = await session.execute(query)
            result = selected_models.all()
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result


# Поиск по первым символам
async def search_teachers(last_name: str) -> List[Teacher]:
    result = []
    async with session_factory() as session:
        try:
            query = select(Teacher).filter(Teacher.lastname.startswith(last_name))
            selected_models = await session.execute(query)
            result = selected_models.all()
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result


async def update_data(model, **kwargs) -> bool:
    result = False
    async with session_factory() as session:
        try:
            query = update(model).where(model.id == kwargs.get('id')).values(**kwargs)
            await session.execute(query)
            await session.commit()
            result = True
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result
