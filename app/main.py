from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import analyze, feedback, news

app = FastAPI(
    title="AlphaHak REST API",
    description="Бэкенд «Инсайт-Радара»: новости, выводы ИИ и обратная связь",
    version="1.0.0",
)

# CORS: разрешаем запросы только с адресов фронтенда из CORS_ORIGINS (.env)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news.router)
app.include_router(feedback.router)
app.include_router(analyze.router)


@app.get("/", tags=["health"])
def root():
    """Проверка, что бэкенд работает."""
    return {"message": "Бэкенд работает. Документация API: /docs"}
