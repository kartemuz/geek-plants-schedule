# Движок БД

from server.config import settings
from typing import Tuple

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase


engine = create_async_engine(
    url=settings.db_url,
    echo=settings.DEBUG
)
session_factory = async_sessionmaker(engine)


class Base(DeclarativeBase):

    repr_cols_num = 4
    repr_cols: Tuple[str] = tuple()

    def __repr__(self):
        """Relationships не используются в repr(), т.к. могут вести к неожиданным подгрузкам"""
        cols = []
        for idx, col in enumerate(self.__table__.columns.keys()):
            if col in self.repr_cols or idx < self.repr_cols_num:
                cols.append(f"{col}={getattr(self, col)}")

        return f"<{self.__class__.__name__} {', '.join(cols)}>"
