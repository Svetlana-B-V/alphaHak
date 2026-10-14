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
    source_url: Mapped[str | None] = mapped_column(String(1000), default=None)
    # Время создания проставляет сама БД
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
