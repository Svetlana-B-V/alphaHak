# alphaHak — Backend «Инсайт-Радара»

Бэкенд — это **мост между ML-ядром и фронтендом**:

```
 Аналитика ──(датасет новостей, профиль Яндекса)──┐
                                                  ▼
 ML (ChromaDB + LLM) ──(инсайты в JSON)──►  BACKEND (FastAPI + SQLite/PostgreSQL) ──(REST API)──► Фронтенд
                                                  ▲
                          лайки/дизлайки ─────────┘
```

- **Реляционная БД** (SQLite локально, PostgreSQL на сервере) хранит новости, выводы ИИ и обратную связь.
- **Векторная БД** (ChromaDB) живёт в ML-модуле и нужна только для поиска по смыслу. Бэкенд в неё ничего не складывает.

> **Сейчас (Фаза 1)** эндпоинты отдают **заглушечные данные** (`app/services/mock_data.py`). Формат ответов уже финальный: фронтенд может верстать по нему, ML — подгонять свой JSON под него.

---

## Быстрый запуск

Команды для PowerShell (Windows). Все команды выполняются из корня проекта (рядом с `alembic.ini`).

```powershell
python -m venv .venv
.venv\Scripts\activate              # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env              # Linux/macOS: cp .env.example .env
alembic upgrade head                # создать/обновить таблицы в БД
uvicorn app.main:app --reload       # запустить сервер
```

- API: http://127.0.0.1:8000
- **Swagger (вся документация, можно жать «Try it out»): http://127.0.0.1:8000/docs**

Запуск тестов:
```powershell
pytest
```

> Если после `git pull` сервер ругается на БД — выполните `alembic upgrade head`: значит, в репозиторий пришла новая миграция.

---

## Для фронтенда: API

Базовый префикс: `/api/v1`. CORS разрешает запросы с `http://localhost:3000` и `http://localhost:5173` (Vite). Если ваш адрес другой — добавьте его в `CORS_ORIGINS` в `.env`.

| Метод | URL | Что делает |
|---|---|---|
| GET | `/` | проверка, что бэкенд жив |
| GET | `/api/v1/news` | лента новостей с выводами ИИ, **самые важные сверху** |
| GET | `/api/v1/news/{id}` | одна новость — для детальной карточки инсайта |
| POST | `/api/v1/feedback` | лайк / дизлайк |

### `GET /api/v1/news` и `GET /api/v1/news/{id}`

Список возвращает массив таких объектов, `/news/{id}` — один такой объект (или `404`, если новости нет):

```json
{
  "id": 2,
  "title": "Ужесточены требования к хранению персональных данных",
  "content": "Приняты поправки, увеличивающие штрафы за утечки персональных данных.",
  "source": "РБК",
  "source_url": "https://example.com/news/2",
  "published_at": "2026-10-14T15:00:00",
  "created_at": "2026-10-14T15:10:00",
  "insights": [
    {
      "id": 2,
      "news_id": 2,
      "event": "Рост штрафов за утечки ПДн",
      "impact": "Регуляторный риск для такси, e-com и облаков Яндекса: возможны крупные штрафы.",
      "recommendation": "CEO: оценить резерв под штрафы; CFO: обсудить страхование киберрисков.",
      "importance_score": 9,
      "confidence_score": 0.74,
      "created_at": "2026-10-14T15:15:00"
    }
  ]
}
```

| Поле инсайта | Тип | Смысл | Идея для UI |
|---|---|---|---|
| `event` | строка | что произошло | заголовок карточки |
| `impact` | строка | как это влияет на компанию | блок «Влияние» |
| `recommendation` | строка | что делать, какой продукт Альфа-Банка | блок «Рекомендация» |
| `importance_score` | целое 1–10 | важность: 1 — шум, 10 — критично | `Badge`: цвет по уровню |
| `confidence_score` | дробное 0–1 | насколько модель уверена | «уверенность 74%» |

Поля `source`, `source_url`, `published_at` могут быть `null`.

### `POST /api/v1/feedback`

Запрос (`insight_id` можно не передавать, если оценивают новость целиком):
```json
{ "news_id": 2, "insight_id": 2, "is_like": true }
```

Ответ `201`:
```json
{ "news_id": 2, "insight_id": 2, "is_like": true, "id": 1, "created_at": "2026-10-15T08:00:00" }
```

Ошибки:
- `422` — неверный формат (например, `is_like` не `true`/`false`);
- `404` — нет такой новости или у неё нет такого вывода.

---

## Для ML: в каком виде отдавать инсайты

Бэкенд ждёт от LLM JSON с этими полями (они же — колонки таблицы `insights`):

```json
{
  "event": "Что произошло",
  "impact": "Как это влияет на Яндекс",
  "recommendation": "Что делать / какой продукт КИБ предложить",
  "importance_score": 8,
  "confidence_score": 0.82
}
```

- `importance_score` — целое от 1 до 10, `confidence_score` — дробное от 0 до 1. Значения вне диапазона бэкенд не примет.
- Если хотите добавить или переименовать поле — напишите бэкенду, поменяем схему и миграцию.

---

## База данных

| Таблица | Что хранит | Поля |
|---|---|---|
| `news` | новости (сырой текст для ML) | `id`, `title`, `content`, `source`, `source_url` (уникальный — защита от дублей), `published_at` (когда вышла у источника), `created_at` (когда попала к нам) |
| `insights` | выводы LLM по новости | `id`, `news_id` → `news.id`, `event`, `impact`, `recommendation`, `importance_score`, `confidence_score`, `created_at` |
| `feedback` | лайки и дизлайки | `id`, `news_id` → `news.id`, `insight_id` → `insights.id` (необязательно), `is_like`, `created_at` |

При удалении новости её выводы и оценки удаляются автоматически.

### Миграции (Alembic)

Схема БД меняется **только через миграции**, вручную таблицы не трогаем.

```powershell
alembic upgrade head                              # применить все миграции
alembic current                                   # какая версия схемы сейчас
alembic downgrade -1                              # откатить последнюю
alembic revision --autogenerate -m "описание"     # создать миграцию после изменения моделей
```

Как менять модели:
1. Измените модель в `app/models/`.
2. `alembic revision --autogenerate -m "..."`.
3. Откройте созданный файл в `alembic/versions/` и проверьте его.
4. `alembic upgrade head`.
5. Закоммитьте модель и миграцию вместе.

Уже запушенные миграции не правим — создаём новую. Файл `alphahak.db` у каждого свой и в git не попадает.

---

## Настройки (`.env`)

`.env` у каждого свой и не коммитится. Шаблон — `.env.example`.

| Переменная | Что это | По умолчанию |
|---|---|---|
| `DATABASE_URL` | подключение к БД | `sqlite:///./alphahak.db` |
| `CORS_ORIGINS` | адреса фронтенда через запятую | `http://localhost:3000,http://localhost:5173` |

PostgreSQL вместо SQLite:
```
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/alphahak
```

---

## Структура проекта

Запрос проходит по цепочке **router → service → (mock-данные / БД)**:

```
alphaHak/
├── app/
│   ├── main.py            # создание приложения, CORS, подключение роутеров
│   ├── config.py          # настройки из .env
│   ├── database.py        # подключение к БД: engine, сессии, Base
│   ├── models/            # таблицы БД (SQLAlchemy): News, Insight, Feedback
│   ├── schemas/           # формат JSON запросов/ответов (Pydantic) — контракт для фронта и ML
│   ├── routers/           # эндпоинты: принимают запрос, отдают ответ
│   └── services/          # логика; сейчас берёт данные из mock_data.py, потом — из БД и ML
├── alembic/versions/      # миграции БД
├── tests/                 # тесты API (pytest)
├── alembic.ini
├── pytest.ini
├── .env.example
└── requirements.txt
```

Когда заглушки заменятся реальными данными, поменяются только файлы в `services/`. Роутеры и формат ответов останутся прежними, фронтенду ничего переделывать не придётся.

---

## Статус (Фаза 1, issue #3)

**Задачи**
- [x] Проект FastAPI со структурой `routers` / `models` / `services` (+ `schemas`)
- [x] SQLAlchemy, SQLite локально / PostgreSQL через `DATABASE_URL`
- [x] Модели `News`, `Insight`, `Feedback` (поля инсайта совпадают с JSON от ML)
- [x] Mock-эндпоинты `GET /api/v1/news`, `GET /api/v1/news/{id}`, `POST /api/v1/feedback`
- [x] CORS: только адреса фронтенда из `CORS_ORIGINS`

**Критерии готовности**
- [x] Сервер запускается, документация доступна на `/docs`
- [x] Миграции БД проходят (`upgrade` и `downgrade`)
- [x] Эндпоинты возвращают заглушечные данные
- [x] Тесты API: `pytest` → 7 passed

## Что дальше (по роадмапу)

- **15.10** — загрузить JSON-датасет новостей от аналитики в таблицу `news`; подключить ML-модуль (ChromaDB) к бэкенду.
- Перевести `services/` с mock-данных на БД: лента из `news` + `insights`, лайки сохраняются в `feedback`.
- Деплой.
