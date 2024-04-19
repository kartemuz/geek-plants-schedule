# Точка входа


from server.config import settings
from server.app import app
import asyncio
from server.database.queries import insert_data, delete_by_id, select_by_id, update_data, search_teachers
from server.database.models import Type, Direction, Teacher


async def main():
    app.run(debug=settings.DEBUG)

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
