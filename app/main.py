from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AlphaHak REST API",
    description="Базовый REST API на FastAPI для хранения новостей и обратной связи",
    version="1.0.0"
)

# Настройка CORS (Пункт из ТЗ для интеграции с фронтендом)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшене замените на конкретные урлы фронтенда
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Заглушки (Mock эндпоинты) из вашего ТЗ

@app.get("/api/v1/news")
async def get_news_mock():
    """Заглушка для получения списка новостей"""
    return [
        {
            "id": 1,
            "title": "Хакатон начался!",
            "content": "Сегодня стартовал первый этап разработки...",
            "created_at": "2026-10-14T15:00:00"
        },
        {
            "id": 2,
            "title": "Векторные базы данных",
            "content": "Chroma DB будет интегрирована в ML-модуль позже.",
            "created_at": "2026-10-14T15:30:00"
        }
    ]

@app.post("/api/v1/feedback")
async def post_feedback_mock(data: dict):
    """Заглушка для отправки обратной связи (лайки/дизлайки)"""
    return {
        "status": "success",
        "message": "Фидбек успешно принят (mock)",
        "received_data": data
    }

@app.get("/")
async def root():
    return {"message": "Бэкенд работает. Перейдите на /docs для просмотра документации API"}
