from server.src.database import session_factory
from sqlalchemy import select, update
from asyncpg import exceptions


async def db_select_by_id(model, id: int or None = None):
    async with session_factory() as session:
        if id is not None:
            result = await session.get(model, id)
            result = result.__dict__
        else:
            query = select(model)
            result = await session.execute(query)
            result = result.scalars().all()
    return result


async def db_delete_by_id(model, id: int):
    async with session_factory() as session:
        x = await session.get(model, id)
        await session.delete(x)
        await session.commit()


async def db_insert(model, **kwargs):
    async with session_factory() as session:
        note = model(**kwargs)
        session.add(note)
        await session.commit()


async def db_update(model, **kwargs):
    async with session_factory() as session:
        query = update(model).where(model.id == kwargs.get('id')).values(**kwargs)
        await session.execute(query)
        await session.commit()
