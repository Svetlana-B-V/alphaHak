from datetime import datetime

from sqlalchemy import ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Insight(Base):
    """Вывод, сгенерированный LLM по конкретной новости.

    Поля повторяют JSON, который возвращает ML 2: Event, Impact, Recommendation,
    оценка важности 1-10 и уверенность модели 0-1.
    """
    __tablename__ = "insights"

    id: Mapped[int] = mapped_column(primary_key=True)
    # Ссылка на новость; при удалении новости её выводы удаляются тоже
    news_id: Mapped[int] = mapped_column(ForeignKey("news.id", ondelete="CASCADE"), index=True)
    # Что произошло
    event: Mapped[str] = mapped_column(Text)
    # Как это влияет на компанию
    impact: Mapped[str] = mapped_column(Text)
    # Что делать (в т.ч. какой продукт Альфа-Банка предложить)
    recommendation: Mapped[str] = mapped_column(Text)
    # Важность новости для компании: 1 (шум) ... 10 (критично)
    importance_score: Mapped[int]
    # Уверенность LLM в выводе: 0.0 ... 1.0
    confidence_score: Mapped[float]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
