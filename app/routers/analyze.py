from fastapi import APIRouter

from app.schemas.analyze import AnalyzeIn, InsightDraft
from app.services import ai_agent

router = APIRouter(prefix="/api/v1/analyze", tags=["ai-agent"])


@router.post("", response_model=InsightDraft)
def analyze(data: AnalyzeIn):
    """Проанализировать новость ИИ-агентом (mock): текст новости -> инсайт. В БД не сохраняется."""
    return ai_agent.analyze_news(data.title, data.content)
