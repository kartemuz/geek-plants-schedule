# Точка входа


# from server.config import settings
# from server.app import app
import asyncio
from server.database.queries.insert import insert_data
from server.database.models import Type, Direction


async def main():
    # app.run(debug=settings.DEBUG)
    # asyncio.run(insert_group(direction_id=123432))
    res = await insert_data(table=Direction, name='2', type=Type.pp, practice='practice')
    print(res)


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
