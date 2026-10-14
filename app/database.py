from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

# Для SQLite нужен специальный параметр, иначе FastAPI ругается на потоки
connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}

# engine - это "подключение" к базе данных
engine = create_engine(settings.database_url, connect_args=connect_args)

# SessionLocal - фабрика сессий (одна сессия = один разговор с БД)
SessionLocal = sessionmaker(bind=engine, autoflush=False)


class Base(DeclarativeBase):
    """От этого класса наследуются все модели (таблицы)."""
    pass


def get_db():
    """Зависимость FastAPI: выдаёт сессию на время запроса и закрывает её после."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
