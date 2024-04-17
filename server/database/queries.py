from server.database import session_factory
from server.database.models import Schedule, Group, Teacher

from typing import List
from asyncpg import exceptions


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


async def update_data(model, **kwargs) -> bool:
    pass


async def delete_by_id(model, id_: int) -> bool:
    result = False
    async with session_factory() as session:
        try:
            x = session.query(model).filter_by(id=id_).first()
            session.delete(x)
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
            selected_model = session.get(model, id_)
            result = selected_model
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result


# Возвращает записи либо по id учителя
async def select_schedule_by_teacher(teacher: int) -> List[Schedule]:
    async with session_factory() as session:
        try:
            selected_schedule = session.query(Schedule).filter_by(teacher_id=teacher)
            result = selected_schedule
        except exceptions.UniqueViolationError:
            pass
        except exceptions.NotNullViolationError:
            pass
        except exceptions.CheckViolationError:
            pass
    return result


# Поиск по первым символам
async def search_groups(group_name: str) -> List[Group]:
    pass


# Поиск по первым символам
async def search_teachers(last_name: str) -> List[Teacher]:
    pass
