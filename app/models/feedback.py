from datetime import datetime

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Feedback(Base):
    """Обратная связь пользователя: лайк или дизлайк."""
    __tablename__ = "feedback"

    id: Mapped[int] = mapped_column(primary_key=True)
    # К какой новости относится оценка
    news_id: Mapped[int] = mapped_column(ForeignKey("news.id"))
    # Если оценивают конкретный вывод ИИ - указываем его, иначе None
    insight_id: Mapped[int | None] = mapped_column(ForeignKey("insights.id"), default=None)
    # True = лайк, False = дизлайк
    is_like: Mapped[bool]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
