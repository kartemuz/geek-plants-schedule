# Конфигурационный файл


from typing import Final
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DEBUG: Final = True

    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    @property
    def db_url(self):
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    # Файл .env (с переменными окружения) располагается в одной директории с main.py (точкой входа)
    model_config = SettingsConfigDict(env_file="server/.env")

    SERVER_HOST: str
    SERVER_PORT: int

    @property
    def server_url(self):
        return f"https://{self.SERVER_HOST}:{self.SERVER_PORT}"


settings = Settings()
