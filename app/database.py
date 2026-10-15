from sqlalchemy import MetaData, create_engine, event
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

is_sqlite = settings.database_url.startswith("sqlite")

# Для SQLite нужен специальный параметр, иначе FastAPI ругается на потоки
connect_args = {"check_same_thread": False} if is_sqlite else {}

# engine - это "подключение" к базе данных
engine = create_engine(settings.database_url, connect_args=connect_args)

if is_sqlite:
    # SQLite по умолчанию не проверяет внешние ключи (и не делает CASCADE) - включаем
    @event.listens_for(engine, "connect")
    def _enable_sqlite_foreign_keys(dbapi_connection, _connection_record):
        dbapi_connection.execute("PRAGMA foreign_keys=ON")

# SessionLocal - фабрика сессий (одна сессия = один разговор с БД)
SessionLocal = sessionmaker(bind=engine, autoflush=False)


class Base(DeclarativeBase):
    """От этого класса наследуются все модели (таблицы)."""

    # Явные имена индексов и ключей: без них Alembic не может удалить/изменить ограничение
    metadata = MetaData(naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    })


def get_db():
    """Зависимость FastAPI: выдаёт сессию на время запроса и закрывает её после."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
