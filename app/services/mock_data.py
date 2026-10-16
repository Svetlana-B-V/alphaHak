"""Заглушечные данные, пока ML-модуль и загрузка датасета не подключены.

Формат совпадает со схемами из app/schemas, поэтому фронтенд может верстать
по ним уже сейчас. Когда появятся реальные данные, меняются только сервисы.
"""
from datetime import datetime

MOCK_NEWS = [
    {
        "id": 1,
        "title": "ЦБ снизил ключевую ставку на 100 б.п.",
        "content": "Банк России снизил ключевую ставку, сославшись на замедление инфляции.",
        "source": "Интерфакс",
        "source_url": "https://example.com/news/1",
        "published_at": datetime(2026, 10, 14, 13, 30),
        "created_at": datetime(2026, 10, 14, 14, 0),
        "insights": [
            {
                "id": 1,
                "news_id": 1,
                "event": "Снижение ключевой ставки ЦБ",
                "impact": "Часть долга Яндекса с плавающей ставкой дешевеет, растёт окно для рефинансирования.",
                "recommendation": "Казначею: рассмотреть рефинансирование через кредитную линию Альфа-Банка.",
                "importance_score": 8,
                "confidence_score": 0.82,
                "created_at": datetime(2026, 10, 14, 14, 5),
            }
        ],
    },
    {
        "id": 2,
        "title": "Ужесточены требования к хранению персональных данных",
        "content": "Приняты поправки, увеличивающие штрафы за утечки персональных данных.",
        "source": "РБК",
        "source_url": "https://example.com/news/2",
        "published_at": datetime(2026, 10, 14, 15, 0),
        "created_at": datetime(2026, 10, 14, 15, 10),
        "insights": [
            {
                "id": 2,
                "news_id": 2,
                "event": "Рост штрафов за утечки ПДн",
                "impact": "Регуляторный риск для такси, e-com и облаков Яндекса: возможны крупные штрафы.",
                "recommendation": "CEO: оценить резерв под штрафы; CFO: обсудить страхование киберрисков.",
                "importance_score": 9,
                "confidence_score": 0.74,
                "created_at": datetime(2026, 10, 14, 15, 15),
            }
        ],
    },
    {
        "id": 3,
        "title": "Apple представила новый iPhone",
        "content": "Компания показала новую линейку смартфонов.",
        "source": "Коммерсантъ",
        "source_url": "https://example.com/news/3",
        "published_at": datetime(2026, 10, 14, 18, 0),
        "created_at": datetime(2026, 10, 14, 18, 20),
        # Шумовая новость: ML ставит низкий скор
        "insights": [
            {
                "id": 3,
                "news_id": 3,
                "event": "Выход нового iPhone",
                "impact": "Прямого влияния на бизнес Яндекса нет.",
                "recommendation": "Действий не требуется.",
                "importance_score": 1,
                "confidence_score": 0.9,
                "created_at": datetime(2026, 10, 14, 18, 25),
            }
        ],
    },
]
