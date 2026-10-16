from app.schemas.news import NewsOut
from app.services.mock_data import MOCK_NEWS


def list_news() -> list[NewsOut]:
    """Все новости, самые важные сверху (по максимальному скору инсайта)."""
    news = [NewsOut.model_validate(item) for item in MOCK_NEWS]
    return sorted(news, key=lambda n: max((i.importance_score for i in n.insights), default=0), reverse=True)


def get_news(news_id: int) -> NewsOut | None:
    """Одна новость по id или None, если такой нет."""
    for item in MOCK_NEWS:
        if item["id"] == news_id:
            return NewsOut.model_validate(item)
    return None
