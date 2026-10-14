# alphaHak - Backend Service

Базовый REST API на **FastAPI** для хранения новостей, выводов ИИ и обратной связи.

Бэкенд - мост между ML-ядром и фронтендом. Реляционная БД (SQLite локально, PostgreSQL при необходимости) хранит сырые тексты, сгенерированные выводы и лайки/дизлайки. Векторная БД (Chroma) используется отдельно, в ML-модуле, для семантического поиска.

## Стек

- Python, FastAPI, Uvicorn
- SQLAlchemy 2.x (ORM)
- Alembic (миграции БД)
- Pydantic Settings (настройки из `.env`)
- SQLite для локальной разработки, PostgreSQL как вариант для сервера

## Структура проекта

```
alphaHak/
├── app/
│   ├── main.py          # приложение FastAPI, CORS, эндпоинты-заглушки
│   ├── config.py        # настройки из .env
│   ├── database.py      # подключение к БД: engine, сессии, Base
│   ├── models/          # таблицы SQLAlchemy: News, Insight, Feedback
│   ├── routers/         # (пока пусто) сюда переедут эндпоинты
│   └── services/        # (пока пусто) бизнес-логика, вызовы ML-модуля
├── alembic/             # миграции БД
│   └── versions/        # файлы миграций
├── alembic.ini          # конфиг Alembic
├── assets/              # картинки для документации
├── .env.example         # пример настроек (копируется в .env)
└── requirements.txt     # зависимости
```

## Быстрый запуск

Команды для PowerShell (Windows). На Linux/macOS отличаются только активация окружения и копирование файла.

1. Создайте и активируйте виртуальное окружение, установите зависимости:
   ```powershell
   python -m venv .venv
   .venv\Scripts\activate          # Linux/macOS: source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. Создайте файл настроек из примера:
   ```powershell
   copy .env.example .env          # Linux/macOS: cp .env.example .env
   ```
3. Создайте таблицы в БД (применить миграции):
   ```powershell
   alembic upgrade head
   ```
4. Запустите сервер разработки:
   ```powershell
   uvicorn app.main:app --reload
   ```

Все команды выполняются из корня проекта (рядом с `alembic.ini`).

Интерактивная документация API (Swagger UI): http://127.0.0.1:8000/docs

## Настройки (`.env`)

Файл `.env` у каждого свой и не попадает в git. Шаблон лежит в `.env.example`.

| Переменная | Описание | Значение по умолчанию |
|---|---|---|
| `DATABASE_URL` | строка подключения к БД | `sqlite:///./alphahak.db` |
| `CORS_ORIGINS` | адреса фронтенда через запятую | `http://localhost:3000,http://localhost:5173` |

Чтобы использовать PostgreSQL, замените `DATABASE_URL`, например:
```
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/alphahak
```

> Сейчас `CORS_ORIGINS` в `main.py` ещё не подключён: CORS пока разрешает все адреса (`*`). Подключение настройки запланировано.

## База данных

Три таблицы:

| Таблица | Назначение | Ключевые поля |
|---|---|---|
| `news` | новости (сырой текст для ML) | `id`, `title`, `content`, `source_url`, `created_at` |
| `insights` | выводы, сгенерированные LLM | `id`, `news_id` -> `news.id`, `text`, `risk_level`, `created_at` |
| `feedback` | лайки и дизлайки | `id`, `news_id` -> `news.id`, `insight_id` -> `insights.id` (необязательно), `is_like`, `created_at` |

### Миграции (Alembic)

Схема БД меняется только через миграции, а не вручную.

```powershell
alembic upgrade head                                   # применить все миграции
alembic current                                        # какая версия схемы сейчас
alembic downgrade -1                                   # откатить последнюю миграцию
alembic revision --autogenerate -m "описание"          # создать миграцию после изменения моделей
```

Порядок работы при изменении моделей:
1. Измените модель в `app/models/`.
2. Создайте миграцию командой `alembic revision --autogenerate -m "..."`.
3. Проверьте созданный файл в `alembic/versions/`.
4. Примените: `alembic upgrade head`.
5. Закоммитьте модель и файл миграции вместе.

Не правьте уже запушенные миграции: создавайте новую. Локальный файл `alphahak.db` в git не коммитится.

## API

Базовый префикс: `/api/v1`. Сейчас эндпоинты возвращают заглушечные данные и в БД не обращаются.

| Метод | URL | Описание |
|---|---|---|
| GET | `/` | проверка, что бэкенд работает |
| GET | `/api/v1/news` | список новостей (mock) |
| POST | `/api/v1/feedback` | отправка лайка/дизлайка (mock) |

### `GET /api/v1/news`

Пример ответа:
```json
[
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
```

### `POST /api/v1/feedback`

Пример запроса:
```json
{ "news_id": 1, "is_like": true }
```

Пример ответа:
```json
{
  "status": "success",
  "message": "Фидбек успешно принят (mock)",
  "received_data": { "news_id": 1, "is_like": true }
}
```

> Тело запроса пока не валидируется: заглушка принимает любой JSON. Формат выше - тот, который будет требоваться после добавления схем.

## Статус работ (Фаза 1)

- [x] Проект FastAPI, структура папок `routers`, `models`, `services`
- [x] SQLAlchemy и SQLite (`config.py`, `database.py`, `.env.example`)
- [x] Модели `News`, `Insight`, `Feedback`
- [x] Миграции Alembic, первая миграция создаёт все три таблицы
- [x] Mock-эндпоинты `GET /api/v1/news`, `POST /api/v1/feedback`
- [x] CORS подключён
- [ ] Эндпоинты вынесены в `routers/`, входные данные валидируются Pydantic-схемами
- [ ] CORS берёт адреса из `CORS_ORIGINS`
- [ ] Тесты API
- [ ] Эндпоинты читают и пишут данные в БД вместо заглушек

## 📸 Текущий прогресс (Swagger UI)

![Swagger UI](./assets/swagger.png)
