from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Строка подключения к БД: по умолчанию локальный SQLite-файл
    database_url: str = "sqlite:///./alphahak.db"

    # Адреса фронтенда через запятую (читаем из .env)
    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    # Читаем переменные из файла .env, лишние переменные игнорируем
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins_list(self) -> list[str]:
        # Превращаем строку "a,b" в список ["a", "b"]
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


# Один общий объект настроек на всё приложение
settings = Settings()
