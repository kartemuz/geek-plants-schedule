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
    pass


# Возвращает model
async def select_by_id(model, id_: int):
    pass


# Возвращает записи либо по id учителя
async def select_schedule_by_teacher(teacher: int) -> List[Schedule]:
    pass


# Поиск по первым символам
async def search_groups(group_name: str) -> List[Group]:
    pass


# Поиск по первым символам
async def search_teachers(last_name: str) -> List[Teacher]:
    pass
