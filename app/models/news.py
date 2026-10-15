from datetime import datetime

from sqlalchemy import String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class News(Base):
    """Новость: сырой текст, который потом анализирует ML-модуль."""
    __tablename__ = "news"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(500))
    content: Mapped[str] = mapped_column(Text)
    # Откуда новость: "Интерфакс", "Аналитика Альфа-Банка" и т.п.
    source: Mapped[str | None] = mapped_column(String(200), default=None)
    # unique - чтобы одну и ту же новость не загрузить дважды
    source_url: Mapped[str | None] = mapped_column(String(1000), unique=True, default=None)
    # Когда новость вышла у источника (не путать с created_at)
    published_at: Mapped[datetime | None] = mapped_column(default=None)
    # Когда новость попала в нашу БД - проставляет сама БД
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
