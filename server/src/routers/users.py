from fastapi import APIRouter
from server.src.database import models, schemas, queries, session_factory
from typing import Optional
from sqlalchemy import select, update
from sqlalchemy.orm import aliased, selectinload


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
async def users_get(login: Optional[str] = None):
    async with session_factory() as session:
        query = select(model)
        if login is not None:
            query = query.where(model.login == login)
        result = await session.execute(query)
    return result.scalars().all()


@users_router.post('/edit')
async def edit_user(data: schema):
    async with session_factory() as session:
        query = update(model).where(model.login == data.login).values(data.dict())
        await session.execute(query)
        await session.commit()


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
    async with session_factory() as session:

        query = select(
            models.UsersRole
        ).options(
            selectinload(models.UsersRole.opportunity).selectinload(models.UserOpportunity.options)
        )
        if id is not None:
            query = query.where(models.UsersRole.id == id)
        query_res = await session.execute(query)
        query_res = query_res.scalars().all()

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
