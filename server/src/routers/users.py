from fastapi import APIRouter
from server.src.database import models, schemas, queries, session_factory
from typing import Optional
from sqlalchemy import select
from sqlalchemy.orm import aliased


users_router = APIRouter(
    prefix="/users",
    tags=["users"]
)
schema = schemas.User
model = models.User


options_router = APIRouter(
    prefix="/options"
)


role_router = APIRouter(
    prefix="/role"
)


# @users_router.post('/register')
# async def register(data: schema):
#     pass
#
#
# @users_router.post('/auth')
# async def auth(data: schema):
#     pass


@users_router.get('/get')
async def users_get(login: str):
    async with session_factory() as session:
        query = select(model).where(model.login == login)
        result = await session.execute(query)
    return result.scalars().all()


@users_router.post('/edit')
async def edit_user(data: schema):
    await queries.db_update(model, **data.dict())


@users_router.post('/new')
async def add_user(data: schema):
    await queries.db_insert(model, **data.dict())


@users_router.get('/delete')
async def delete_user(id: str):
    return await queries.db_delete_by_id(model, id)


@options_router.get('/get')
async def get_options(id: Optional[int] = None):
    opt = aliased(models.Options)
    async with session_factory() as session:
        query = select(opt)
        if id is not None:
           query = query.where(opt.id == id)
        result = await session.execute(query)
    return result.scalars().all()


@role_router.get('/get')
async def get_role(id: Optional[int] = None):
    rl = aliased(models.UsersRole)
    opportunity = aliased(models.UserOpportunity)
    opt = aliased(models.Options)
    async with session_factory() as session:

        query = select(
            rl.id.label('role_id'),
            rl.title.label('role_title'),
            opt.id.label('option_id'),
            opt.title.label('option_title'),
            opt.code
        ).join(
            opportunity, opportunity.user_role_id == rl.id
        ).join(
            opt, opt.id == opportunity.option_id
        )
        if id is not None:
           query = query.where(rl.id == id)
        query_res = await session.execute(query)
        query_res = query_res.mappings().all()

    return query_res


@role_router.post('/edit')
async def edit_role(data: schemas.UserRole):
    await queries.db_update(models.UsersRole, **data.dict())


@role_router.post('/new')
async def add_role(data: schemas.UserRole):
    await queries.db_insert(models.UsersRole, **data.dict())


@role_router.get('/delete')
async def delete_role(id: int):
    return await queries.db_delete_by_id(models.UsersRole, id)


routers = (
    options_router,
    role_router
)


for r in routers:
    users_router.include_router(r)
