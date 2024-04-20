# Точка входа


from fastapi import FastAPI
from server.src.routers import api_router


app = FastAPI(
    title='Schedule'
)


app.include_router(api_router)
