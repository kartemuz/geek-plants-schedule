from fastapi import APIRouter
from server.src.database import models
from server.src.database import schemas


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
