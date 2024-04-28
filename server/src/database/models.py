# Представление таблиц БД в виде классов


import datetime
import enum


from typing import Annotated, Optional
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from server.src.database import Base


int_PK = Annotated[int, mapped_column(primary_key=True)]


class Group(Base):
    __tablename__ = 'group'
    id: Mapped[int_PK]
    direction_id: Mapped[Optional[int]] = mapped_column(ForeignKey('direction.id', ondelete="CASCADE"))
    file_upload: Mapped[Optional[str]]


class Flow(Base):
    __tablename__ = 'flow'
    id: Mapped[int_PK]
    discipline_id: Mapped[int] = mapped_column(ForeignKey('discipline.id', ondelete="CASCADE"))


class FlowGroup(Base):
    __tablename__ = 'flow_group'
    flow_id: Mapped[int] = mapped_column(ForeignKey('flow.id', ondelete="CASCADE"), primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey('group.id', ondelete="CASCADE"), primary_key=True)


class Teacher(Base):
    __tablename__ = 'teacher'
    id: Mapped[int_PK]
    lastname: Mapped[str]
    firstname: Mapped[str]
    surname: Mapped[Optional[str]]
    position: Mapped[Optional[str]]
    teaching_profile: Mapped[Optional[str]]


class dir_type(enum.Enum):
    ПК = 'ПК'
    ПП = 'ПП'
    С = 'С'


class Direction(Base):
    __tablename__ = 'direction'
    id: Mapped[int_PK]
    name: Mapped[str]
    type: Mapped[dir_type]
    practice: Mapped[Optional[str]]


class Discipline(Base):
    __tablename__ = 'discipline'
    id: Mapped[int_PK]
    name: Mapped[str]
    lecture_hours: Mapped[Optional[int]]
    practice_hours: Mapped[Optional[int]]


class Schedule(Base):
    __tablename__ = 'schedule'
    id: Mapped[int_PK]
    date: Mapped[datetime.date]
    time: Mapped[datetime.time]
    room: Mapped[str]
    type: Mapped[Optional[str]]
    teacher_id: Mapped[int] = mapped_column(ForeignKey('teacher.id', ondelete="SET NULL"))
    discipline_id: Mapped[int] = mapped_column(ForeignKey('discipline.id', ondelete="SET NULL"))
    flow_id: Mapped[Optional[int]] = mapped_column(ForeignKey('flow.id', ondelete="SET NULL"))
    change_id: Mapped[int] = mapped_column(ForeignKey('change.id'))


class User(Base):
    __tablename__ = 'user'
    login: Mapped[int_PK]
    user_type: Mapped[int]
    password: Mapped[str]
    lastname: Mapped[str]
    firstname: Mapped[str]
    surname: Mapped[Optional[str]]


class Change(Base):
    __tablename__ = 'change'
    id: Mapped[int_PK]
    substitute_teacher_id: Mapped[int] = mapped_column(ForeignKey('teacher.id'))
    discipline_id: Mapped[int] = mapped_column(ForeignKey('discipline.id'))
    changed_teacher_id: Mapped[int] = mapped_column(ForeignKey('teacher.id'))


# class Organization(Base):
#     __tablename__ = 'organization'
