from fastapi import APIRouter, HTTPException

from app.schemas.feedback import FeedbackIn, FeedbackOut
from app.services import feedback as feedback_service
from app.services import news as news_service

router = APIRouter(prefix="/api/v1/feedback", tags=["feedback"])


@router.post("", response_model=FeedbackOut, status_code=201)
def create_feedback(data: FeedbackIn):
    """Лайк/дизлайк новости или конкретного вывода ИИ (mock, в БД пока не сохраняется)."""
    news = news_service.get_news(data.news_id)
    if news is None:
        raise HTTPException(status_code=404, detail="Новость не найдена")
    if data.insight_id is not None and all(i.id != data.insight_id for i in news.insights):
        raise HTTPException(status_code=404, detail="Вывод не найден у этой новости")
    return feedback_service.create_feedback(data)
