# Точка входа


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.src.routers import api_router
from server.src.config import settings


app = FastAPI(
    title='Schedule'
)


app.include_router(api_router)


origins = [
    settings.client_url,
    settings.client_host,
    'http://91.223.28.50',
    'http://91.223.28.50:5173',
    "*",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
