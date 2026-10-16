from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class FeedbackIn(BaseModel):
    """Что фронтенд присылает, когда пользователь ставит лайк/дизлайк."""
    news_id: int = Field(description="Новость, которую оценили")
    insight_id: int | None = Field(default=None, description="Конкретный вывод ИИ, если оценили его")
    is_like: bool = Field(description="true - лайк, false - дизлайк")

    model_config = ConfigDict(json_schema_extra={"examples": [{"news_id": 1, "insight_id": 1, "is_like": True}]})


class FeedbackOut(FeedbackIn):
    """Сохранённая оценка."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
