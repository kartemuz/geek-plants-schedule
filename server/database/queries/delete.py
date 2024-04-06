from server.database.models import Groups, Flows, FlowsGroups, Teachers, Directions, Disciplines, Schedule
from server.database import session_factory


# True - успешное выполнение запроса,
# False - неудачное
async def delete_teacher(id_: int) -> bool:
    pass


async def delete_direction(id_: int) -> bool:
    pass


async def delete_discipline(id_: int) -> bool:
    pass


async def delete_group(id_: int) -> bool:
    pass


async def delete_flow(id_: int) -> bool:
    pass


async def delete_schedule(id_: int) -> bool:
    pass
