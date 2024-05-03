from fastapi import APIRouter, Header
from server.src.database import models, schemas, queries, session_factory
from typing import Optional
from sqlalchemy import select, update, insert, func
from sqlalchemy.orm import aliased, selectinload
import jwt


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


@users_router.post('/auth')
async def auth(data: schemas.AuthUser):
    async with session_factory() as session:
        query = select(models.User).where(data.login == models.User.login)
        resp = await session.execute(query)
        resp = resp.scalars().first()
    try:
        if resp.password == data.password:
            tkn = jwt.encode(data.dict(), 'secret', algorithm='HS256')
            md = models.UserSession(user_id=resp.id, token=tkn)
            session.add(md)
            await session.commit()

            return tkn
        else:
            return 'message_notFoundUser'
    except AttributeError:
        return 'message_notFoundUser'


@users_router.post('/get')
async def users_get(auth_token: str = Header()):
    query = select(models.UserSession).where(auth_token == models.UserSession.token)
    async with session_factory() as session:
        resp = await session.execute(query)
        resp = resp.scalars().first()

    if resp:
        query = select(models.User).options(
            selectinload(models.User.user_role).selectinload(models.UsersRole.opportunity).selectinload(
                models.UserOpportunity.options
            )
        ).where(resp.user_id == models.User.id)
        result = await session.execute(query)
        result = result.scalars().first()
        return result
    else:
        return 'Error'


@users_router.post('/delete')
async def users_delete(auth_token: str = Header()):
    query = select(models.UserSession).where(models.UserSession.token == auth_token)
    async with session_factory() as session:
        try:
            resp = await session.execute(query)
            resp = resp.scalars().first()
            await session.delete(resp)
            await session.commit()
            return 'OK'
        except Exception:
            return 'Error'
        

@users_router.get('/get_all')
async def users_get_all():
    async with session_factory() as session:
        query = select(models.User).options(
            selectinload(models.User.user_role).selectinload(models.UsersRole.opportunity).selectinload(
                models.UserOpportunity.options
            )
        )
        result = await session.execute(query)
    return result.mappings().all()


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
