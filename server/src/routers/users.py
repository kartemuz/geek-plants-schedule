from fastapi import APIRouter
from server.src.database import models, schemas, queries, session_factory
from typing import Optional
from sqlalchemy import select


users_router = APIRouter(
    prefix="/users",
    tags=["users"]
)
model = models.User
schema = schemas.User


@users_router.post('/register')
async def register(data: schema):
    pass


@users_router.post('/auth')
async def auth(data: schema):
    pass


@users_router.get('/get')
async def get(login: Optional[str] = None):
    async with session_factory() as session:
        query = select(model)
        if login is not None:
           query = query.where(model.login == login)
        result = await session.execute(query)
    return result.scalars().all()
