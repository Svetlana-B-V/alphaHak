# Импортируем все модели, чтобы Alembic и SQLAlchemy "увидели" таблицы
from app.models.news import News
from app.models.insight import Insight
from app.models.feedback import Feedback

__all__ = ["News", "Insight", "Feedback"]
