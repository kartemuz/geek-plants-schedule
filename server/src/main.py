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
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"]
)
