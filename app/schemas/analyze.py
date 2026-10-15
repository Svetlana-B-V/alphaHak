from pydantic import BaseModel, ConfigDict, Field


class AnalyzeIn(BaseModel):
    """Новость, которую нужно проанализировать ИИ-агентом."""
    title: str = Field(min_length=1, description="Заголовок новости")
    content: str = Field(min_length=1, description="Текст новости")

    model_config = ConfigDict(json_schema_extra={"examples": [{
        "title": "ЦБ снизил ключевую ставку",
        "content": "Банк России снизил ключевую ставку на 100 б.п.",
    }]})


class InsightDraft(BaseModel):
    """Ответ ИИ-агента - ровно тот JSON, который возвращает ML 2 (ещё не сохранён в БД)."""
    event: str = Field(description="Что произошло")
    impact: str = Field(description="Как это влияет на компанию")
    recommendation: str = Field(description="Что делать, какой продукт Альфа-Банка предложить")
    importance_score: int = Field(ge=1, le=10, description="Важность для компании: 1 - шум, 10 - критично")
    confidence_score: float = Field(ge=0, le=1, description="Уверенность модели в выводе")
