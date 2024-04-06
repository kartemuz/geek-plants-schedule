from server.database.models import Groups, Flows, FlowsGroups, Teachers, Directions, Disciplines, Schedule
from server.database import session_factory
from typing import List


async def select_teacher(id_: int = None) -> List[Teachers]:
    pass


async def select_direction(id_: int = None) -> List[Directions]:
    pass


async def select_discipline(id_: int = None) -> List[Disciplines]:
    pass


async def select_group(id_: int = None) -> List[Groups]:
    pass


async def select_flow(id_: int = None) -> List[Flows]:
    pass


# Возвращает записи либо по id записи, либо по id учителя
async def select_schedule(id_: int = None, teacher: int = None) -> List[Schedule] or Schedule:
    pass


# Поиск через LIKE по первым символам
async def search_groups_by_first_symbols(group_name: str) -> List[Schedule]:
    pass


async def search_teachers_by_first_symbols(last_name: str) -> List[Schedule]:
    pass

