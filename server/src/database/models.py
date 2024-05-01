# Представление таблиц БД в виде классов


import datetime
import enum


from typing import Annotated, Optional, List
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from server.src.database import Base


int_PK = Annotated[int, mapped_column(primary_key=True)]


class Group(Base):
    __tablename__ = 'group'
    id: Mapped[int_PK]
    direction_id: Mapped[Optional[int]] = mapped_column(ForeignKey('direction.id', ondelete="CASCADE"))
    file_upload: Mapped[Optional[str]]

    direction: Mapped['Direction'] = relationship()


class Flow(Base):
    __tablename__ = 'flow'
    id: Mapped[int_PK]
    discipline_id: Mapped[int] = mapped_column(ForeignKey('discipline.id', ondelete="CASCADE"))

    flow_groups: Mapped[List['FlowGroup']] = relationship()


class FlowGroup(Base):
    __tablename__ = 'flow_group'
    flow_id: Mapped[int] = mapped_column(ForeignKey('flow.id', ondelete="CASCADE"), primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey('group.id', ondelete="CASCADE"), primary_key=True)

    flow: Mapped['Flow'] = relationship()
    group: Mapped['Group'] = relationship()


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
    time_start: Mapped[datetime.time]
    time_end: Mapped[datetime.time]
    room: Mapped[str]
    type: Mapped[Optional[str]]
    teacher_id: Mapped[int] = mapped_column(ForeignKey('teacher.id', ondelete="SET NULL"))
    discipline_id: Mapped[int] = mapped_column(ForeignKey('discipline.id', ondelete="SET NULL"))
    flow_id: Mapped[Optional[int]] = mapped_column(ForeignKey('flow.id', ondelete="SET NULL"))
    change_id: Mapped[int] = mapped_column(ForeignKey('change.id'))
    list_id: Mapped[int] = mapped_column(ForeignKey('schedule_list.id'))
    date: Mapped[datetime.date]

    teacher: Mapped['Teacher'] = relationship()
    change: Mapped['Change'] = relationship()
    discipline: Mapped['Discipline'] = relationship()
    flow: Mapped['Flow'] = relationship()
    schedule_list: Mapped['ScheduleList'] = relationship()


class Change(Base):
    __tablename__ = 'change'
    id: Mapped[int_PK]
    substitute_teacher_id: Mapped[int] = mapped_column(ForeignKey('teacher.id'))
    discipline_id: Mapped[int] = mapped_column(ForeignKey('discipline.id'))
    changed_teacher_id: Mapped[int] = mapped_column(ForeignKey('teacher.id'))

    changed_teacher: Mapped['Teacher'] = relationship(primaryjoin='Teacher.id == Change.changed_teacher_id')


class ScheduleList(Base):
    __tablename__ = 'schedule_list'
    id: Mapped[int_PK]
    title: Mapped[str]
    group_id: Mapped[Optional[int]] = mapped_column(ForeignKey('group.id'))
    archive: Mapped[Optional[bool]]


class User(Base):
    __tablename__ = 'user'
    id: Mapped[int_PK]
    login: Mapped[str]
    user_role_id: Mapped[int] = mapped_column(ForeignKey('users_role.id'))
    password: Mapped[str]
    lastname: Mapped[str]
    firstname: Mapped[str]
    surname: Mapped[Optional[str]]

    user_role: Mapped['UsersRole'] = relationship()


class Options(Base):
    __tablename__ = 'options'
    id: Mapped[int_PK]
    title: Mapped[str]
    code: Mapped[str]


class UsersRole(Base):
    __tablename__ = 'users_role'
    id: Mapped[int_PK]
    title: Mapped[str]

    opportunity: Mapped[List['UserOpportunity']] = relationship()


class UserOpportunity(Base):
    __tablename__ = 'user_opportunity'
    user_role_id: Mapped[int] = mapped_column(ForeignKey('users_role.id'), primary_key=True)
    option_id: Mapped[int] = mapped_column(ForeignKey('options.id'), primary_key=True)
    options: Mapped['Options'] = relationship()
    role: Mapped['UsersRole'] = relationship()


class Org(Base):
    __tablename__ = 'org'
    id: Mapped[int_PK]
    address: Mapped[str]
    phone: Mapped[str]
    email: Mapped[Optional[str]]
    vk: Mapped[Optional[str]]
    telegram: Mapped[Optional[str]]
    full_name: Mapped[Optional[str]]
    abbr_name: Mapped[Optional[str]]


class UserSession(Base):
    __tablename__ = 'user_sessions'
    id: Mapped[int_PK]
    token: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
