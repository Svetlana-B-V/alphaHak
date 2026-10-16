from fastapi import APIRouter, HTTPException

from app.schemas.news import NewsOut
from app.services import news as news_service

router = APIRouter(prefix="/api/v1/news", tags=["news"])


@router.get("", response_model=list[NewsOut])
def list_news():
    """Список новостей с выводами ИИ (mock). Самые важные - сверху."""
    return news_service.list_news()


@router.get("/{news_id}", response_model=NewsOut)
def get_news(news_id: int):
    """Одна новость с выводами ИИ (mock) - для детальной карточки."""
    news = news_service.get_news(news_id)
    if news is None:
        raise HTTPException(status_code=404, detail="Новость не найдена")
    return news
