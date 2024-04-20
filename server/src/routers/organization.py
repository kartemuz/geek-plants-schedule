from fastapi import APIRouter
from server.src.database import models
from server.src.database import queries
from typing import Optional, List
from server.src.database import schemas


organization_router = APIRouter(
    prefix="/organization",
    tags=["organization"]
)
# model = models.Organization
