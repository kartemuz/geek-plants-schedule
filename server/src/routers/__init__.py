from fastapi import APIRouter


from server.src.routers.directions import directions_router
from server.src.routers.disciplines import disciplines_router
from server.src.routers.flows import flows_router
from server.src.routers.groups import groups_router
from server.src.routers.schedule import schedule_router
from server.src.routers.teachers import teachers_router
from server.src.routers.search_schedule import search_schedule_router
from server.src.routers.users import users_router
from server.src.routers.org import org_router


api_router = APIRouter(
    prefix="/api"
)


routers = (
    directions_router,
    disciplines_router,
    flows_router,
    groups_router,
    schedule_router,
    teachers_router,
    search_schedule_router,
    users_router,
    org_router
)


for r in routers:
    api_router.include_router(r)
