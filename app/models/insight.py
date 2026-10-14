from datetime import datetime

from sqlalchemy import ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Insight(Base):
    """Вывод, сгенерированный LLM по конкретной новости."""
    __tablename__ = "insights"

    id: Mapped[int] = mapped_column(primary_key=True)
    # Ссылка на новость, к которой относится вывод
    news_id: Mapped[int] = mapped_column(ForeignKey("news.id"))
    text: Mapped[str] = mapped_column(Text)
    # Уровень риска, например: low / medium / high
    risk_level: Mapped[str | None] = mapped_column(String(50), default=None)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
