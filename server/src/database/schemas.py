from pydantic import BaseModel
from typing import Optional
from server.src.database.models import dir_type

import datetime


class Direction(BaseModel):
    id: Optional[int] = None
    name: str
    type: dir_type
    practice: Optional[str] = None


class Teacher(BaseModel):
    id: Optional[int] = None
    lastname: str
    firstname: str
    surname: Optional[str] = None
    position: Optional[str] = None
    teaching_profile: Optional[str] = None


class Group(BaseModel):
    id: Optional[int] = None
    direction_id: Optional[int] = None
    file_upload: Optional[str] = None


class Flow(BaseModel):
    id: Optional[int] = None
    discipline_id: int


class Discipline(BaseModel):
    id: Optional[int] = None
    name: str
    lecture_hours: Optional[int] = None
    practice_hours: Optional[int] = None


class Schedule(BaseModel):
    id: Optional[int] = None
    date: datetime.date
    time: datetime.time
    room: str
    type: Optional[str] = None
    teacher_id: int
    discipline_id: int
    flow_id: int
    change_id: Optional[int] = None


class User(BaseModel):
    login: str
    user_role_id: int
    password: str
    lastname: str
    firstname: str
    surname: str


class UserRole(BaseModel):
    id: int
    title: int


class UserOpportunity(BaseModel):
    user_type: int
    option: int


class Options(BaseModel):
    id: int
    title: str
