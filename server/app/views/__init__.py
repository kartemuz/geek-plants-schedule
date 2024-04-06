# Модуль представления


from server.app.views.directions import directions
from server.app.views.disciplines import disciplines
from server.app.views.flows import flows
from server.app.views.groups import groups
from server.app.views.schedule import schedule
from server.app.views.search_schedule import search_schedule
from server.app.views.teachers import teachers

blueprints = {
    '/directions': directions,
    '/disciplines': disciplines,
    '/flows': flows,
    '/groups': groups,
    '/schedule': schedule,
    '/searchSchedule': search_schedule,
    '/teachers': teachers
}