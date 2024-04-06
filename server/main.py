# Точка входа


from server.config import settings
from server.app import app


def main():
    app.run(debug=settings.DEBUG)


if __name__ == '__main__':
    main()
