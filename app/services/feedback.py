from datetime import datetime
from itertools import count

from app.schemas.feedback import FeedbackIn, FeedbackOut

# Счётчик id для заглушки (в БД id будет выдавать сама база)
_ids = count(1)


def create_feedback(data: FeedbackIn) -> FeedbackOut:
    """Заглушка: принимает оценку и возвращает её как сохранённую, в БД не пишет."""
    return FeedbackOut(id=next(_ids), created_at=datetime.now(), **data.model_dump())
