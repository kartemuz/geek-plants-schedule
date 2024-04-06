# Представление таблиц БД в виде классов


from typing import Annotated, Optional
from sqlalchemy.orm import Mapped, mapped_column
from server.database import Base


class Groups(Base):
    __tablename__ = 'direction'


class Flows(Base):
    __tablename__ = 'flow'


class FlowsGroups(Base):
    __tablename__ = 'flows_group'


class Teachers(Base):
    __tablename__ = 'teacher'


class Directions(Base):
    __tablename__ = 'direction'


class Disciplines(Base):
    __tablename__ = 'discipline'


class Schedule(Base):
    __tablename__ = 'schedule'


class User(Base):
    __tablename__ = 'user'
