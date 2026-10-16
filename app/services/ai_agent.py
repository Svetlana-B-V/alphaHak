"""Заглушка ИИ-агента (ML-модуля).

Сейчас вместо LLM - простые правила по ключевым словам, чтобы ответы
отличались и было что показать на фронте.

Для ML-команды: чтобы подключить настоящую модель, замените тело analyze_news.
Вход - заголовок и текст новости, выход - InsightDraft (формат из issue ML 2:
event, impact, recommendation, importance_score, confidence_score).
Остальной бэкенд и фронтенд при этом менять не нужно.
"""
from app.schemas.analyze import InsightDraft

# Ключевые слова -> заготовка инсайта (сценарии из профиля Яндекса)
_RULES = [
    (
        ("ставк", "цб", "банк росси"),
        InsightDraft(
            event="Изменение ключевой ставки ЦБ",
            impact="Меняется стоимость долга Яндекса с плавающей ставкой.",
            recommendation="Казначею: оценить рефинансирование через кредитную линию Альфа-Банка.",
            importance_score=8,
            confidence_score=0.6,
        ),
    ),
    (
        ("персональн", "пдн", "утечк"),
        InsightDraft(
            event="Изменения в регулировании персональных данных",
            impact="Регуляторный риск для сервисов Яндекса, работающих с данными пользователей.",
            recommendation="CEO: оценить риски штрафов; CFO: рассмотреть страхование киберрисков.",
            importance_score=9,
            confidence_score=0.6,
        ),
    ),
    (
        ("санкци", "сервер", "поставщик"),
        InsightDraft(
            event="Ограничения в цепочке поставок оборудования",
            impact="Риск роста затрат и задержек для облачного бизнеса Яндекса.",
            recommendation="CFO: рассмотреть аккредитивы и торговое финансирование Альфа-Банка.",
            importance_score=7,
            confidence_score=0.5,
        ),
    ),
]

_NOISE = InsightDraft(
    event="Новость без явной связи с бизнесом Яндекса",
    impact="Прямого влияния на бизнес Яндекса не выявлено.",
    recommendation="Действий не требуется.",
    importance_score=1,
    confidence_score=0.3,
)


def analyze_news(title: str, content: str) -> InsightDraft:
    """MOCK: возвращает инсайт по новости. Здесь будет вызов LLM от ML-команды."""
    text = f"{title} {content}".lower()
    for keywords, insight in _RULES:
        if any(word in text for word in keywords):
            return insight
    return _NOISE
