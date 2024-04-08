# Представление таблиц БД в виде классов
import enum, datetime
from typing import Annotated, Optional
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from server.database import Base


int_PK = Annotated[int, mapped_column(primary_key=True)]


class Group(Base):
    tablename = 'group'
    id: Mapped[int_PK]
    direction_id: Mapped[int] = mapped_column(ForeignKey('direction.id'), ondelete="CASCADE")


class Flow(Base):
    tablename = 'flow'
    id: Mapped[int_PK]
    discipline_id: Mapped[int] = mapped_column(ForeignKey('discipline.id'), ondelete="CASCADE")


class FlowGroup(Base):
    tablename = 'flow_group'
    flow_id: Mapped[int] = mapped_column(ForeignKey('flow.id'), ondelete="CASCADE")
    group_id: Mapped[int] = mapped_column(ForeignKey('group.id'), ondelete="CASCADE")


class Teacher(Base):
    tablename = 'teacher'
    id: Mapped[int_PK]
    lastname: Mapped[str]
    firstname: Mapped[str]
    surname: Mapped[Optional[str]]
    position: Mapped[str]
    teaching_profile: Mapped[Optional[str]]


class Type(enum.Enum):
    pk = "ПК"
    pp = "ПП"
    s = "С"


class Direction(Base):
    tablename = 'direction'
    id: Mapped[int_PK]
    name: Mapped[str]
    type: Mapped[Type]
    practice: Mapped[Optional[str]]


class Discipline(Base):
    tablename = 'discipline'
    id: Mapped[int_PK]
    name: Mapped[str]
    lecture_hours: Mapped[int]
    practice_hours: Mapped[int]


class Schedule(Base):
    tablename = 'schedule'
    id: Mapped[int_PK]
    date: Mapped[datetime.date]
    time: Mapped[datetime.time]
    room: Mapped[Optional[str]]
    type: Mapped[str]
    teacher_id: Mapped[Optional[int]] = mapped_column(ForeignKey('teacher.id'), ondelete="SET NULL")
    discipline_id: Mapped[Optional[int]] = mapped_column(ForeignKey('discipline.id'), ondelete="SET NULL")
    flow_id: Mapped[Optional[int]] = mapped_column(ForeignKey('flow.id'), ondelete="SET NULL")


class User(Base):
    tablename = 'user'
    login: Mapped[int_PK]
    user_type: Mapped[int]
    password: Mapped[str]
    lastname: Mapped[str]
    firstname: Mapped[str]
    surname: Mapped[str]