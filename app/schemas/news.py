from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class InsightOut(BaseModel):
    """Вывод LLM по новости - то, что фронтенд показывает в карточке инсайта."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    news_id: int
    event: str = Field(description="Что произошло")
    impact: str = Field(description="Как это влияет на компанию")
    recommendation: str = Field(description="Что делать, какой продукт Альфа-Банка предложить")
    importance_score: int = Field(ge=1, le=10, description="Важность для компании: 1 - шум, 10 - критично")
    confidence_score: float = Field(ge=0, le=1, description="Уверенность модели в выводе")
    created_at: datetime


class NewsOut(BaseModel):
    """Новость вместе с выводами ИИ по ней."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    content: str
    source: str | None = None
    source_url: str | None = None
    published_at: datetime | None = None
    created_at: datetime
    insights: list[InsightOut] = []
