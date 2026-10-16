# Для фронтенда: как подключить наш бэкенд

Привет! Этот файл — пошаговая инструкция, как подключить твой React-проект (ветка `frontend`) к нашему бэкенду (ветка `backend`). Я посмотрел обе ветки, всё ниже написано под твой код: Vite на порту 5173, Tailwind, компоненты `Button`, `Badge`, `Card`.

**Коротко:**
1. Запускаешь бэкенд у себя (5 команд, раздел 2).
2. Добавляешь 1 строчку в `vite.config.ts` (раздел 3).
3. Копируешь типы и функции для запросов (разделы 5–6).
4. Делаешь страницу с карточками инсайтов (раздел 7).

---

## 0. ⚠️ Важно: сейчас данные — заглушки

ML-ребята ещё не закончили. Поэтому бэкенд пока отдаёт **3 ненастоящие новости** с готовыми инсайтами, они зашиты в коде бэкенда.

Что это значит для тебя:
- **Формат данных финальный.** Названия полей и типы не поменяются. Верстай спокойно.
- **Содержимое поменяется.** Потом будет больше новостей и другие тексты. Не завязывайся на конкретные заголовки и количество.
- **Лайки пока не сохраняются.** Бэкенд отвечает «принято», но после перезагрузки страницы их нет. Если нужно показать «уже лайкнуто», храни это в состоянии компонента (`useState`).
- **Если ML добавит новое поле** (например, «риск / возможность»), я напишу заранее. Новые поля старый код не ломают.

Свои моки для новостей на фронте делать **не нужно**: бэкенд уже отдаёт заглушки в правильном формате. Просто ходи в API.

---

## 1. Как всё связано

```
Твой React (localhost:5173)                Наш FastAPI (localhost:8000)
──────────────────────────                 ────────────────────────────
fetch("/api/v1/news")  ──── Vite proxy ──► GET /api/v1/news
                       ◄──── JSON ──────── [ {новость + инсайты}, ... ]
```

- В `package.json` у тебя есть Supabase, и в `docs/ARCHITECTURE.md` написано `API → Supabase`. **Supabase нам не нужен.** Бэкенд — это наш FastAPI, все данные бери только оттуда.
- Документация API с кнопкой «попробовать»: **http://127.0.0.1:8000/docs** (Swagger). Если что-то непонятно в формате — открой её, нажми на эндпоинт → **Try it out** → **Execute** и посмотри живой ответ.

---

## 2. Запуск бэкенда у себя

Нужен Python 3.11+ (проверь: `python --version`). Бэкенд лежит в ветке `backend`.

Удобнее всего склонировать репозиторий **в отдельную папку** — тогда твоя ветка не трогается:

```powershell
git clone -b backend https://github.com/Svetlana-B-V/alphaHak.git alphaHak-backend
cd alphaHak-backend

python -m venv .venv
.venv\Scripts\activate             # Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env             # Mac/Linux: cp .env.example .env
alembic upgrade head               # создать таблицы в БД
uvicorn app.main:app --reload      # запустить сервер
```

Проверка: открой http://127.0.0.1:8000/api/v1/news. Должен показаться JSON с новостями.

Дальше бэкенд просто держишь запущенным в отдельном терминале, а фронт запускаешь как обычно: `npm run dev`.

**В следующие разы** нужны только две команды (из папки `alphaHak-backend`):
```powershell
.venv\Scripts\activate
uvicorn app.main:app --reload
```
Если я напишу «обновил бэкенд», сначала выполни `git pull` и `alembic upgrade head`.

---

## 3. Настройка Vite: proxy (1 строчка)

Добавь `proxy` в `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    // Все запросы на /api Vite перешлёт в бэкенд
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
```

**Зачем это:**
- В коде пишешь короткие адреса `fetch("/api/v1/news")`, без `http://localhost:8000`.
- Не будет ошибок **CORS**. Это защита браузера: если фронт и бэк на разных портах, браузер блокирует запросы. Через proxy браузеру кажется, что всё идёт с одного адреса.
- Неважно, на каком порту запустился Vite. У тебя стоит `strictPort: false`: если 5173 занят, Vite возьмёт 5174, и без proxy запросы бы сломались.

После изменения `vite.config.ts` перезапусти `npm run dev`.

---

## 4. Эндпоинты API

| Метод | Адрес | Что делает | Ответ |
|---|---|---|---|
| GET | `/api/v1/news` | лента новостей с инсайтами, **самые важные уже сверху** | массив `News[]` |
| GET | `/api/v1/news/{id}` | одна новость (для детальной страницы) | `News` или `404` |
| POST | `/api/v1/feedback` | лайк / дизлайк | `FeedbackOut`, код `201` |
| POST | `/api/v1/analyze` | **ИИ-агент (заглушка):** отправил текст новости → получил инсайт | `InsightDraft` |

Сортировать на фронте ничего не надо, бэкенд уже отдаёт ленту по убыванию важности.

### Пример ответа `GET /api/v1/news/1`

```json
{
  "id": 1,
  "title": "ЦБ снизил ключевую ставку на 100 б.п.",
  "content": "Банк России снизил ключевую ставку, сославшись на замедление инфляции.",
  "source": "Интерфакс",
  "source_url": "https://example.com/news/1",
  "published_at": "2026-10-14T13:30:00",
  "created_at": "2026-10-14T14:00:00",
  "insights": [
    {
      "id": 1,
      "news_id": 1,
      "event": "Снижение ключевой ставки ЦБ",
      "impact": "Часть долга Яндекса с плавающей ставкой дешевеет, растёт окно для рефинансирования.",
      "recommendation": "Казначею: рассмотреть рефинансирование через кредитную линию Альфа-Банка.",
      "importance_score": 8,
      "confidence_score": 0.82,
      "created_at": "2026-10-14T14:05:00"
    }
  ]
}
```

### Что значит каждое поле

**Новость (`News`):**

| Поле | Тип | Может быть `null`? | Что это |
|---|---|---|---|
| `id` | число | нет | id новости |
| `title` | строка | нет | заголовок |
| `content` | строка | нет | текст новости |
| `source` | строка | **да** | источник: «РБК», «Интерфакс» |
| `source_url` | строка | **да** | ссылка на оригинал |
| `published_at` | строка-дата | **да** | когда вышла новость |
| `created_at` | строка-дата | нет | когда попала к нам в базу |
| `insights` | массив | нет (может быть пустым `[]`) | выводы ИИ по новости |

**Инсайт (`Insight`) — главное для карточки:**

| Поле | Тип | Что это | Как показать |
|---|---|---|---|
| `event` | строка | что произошло | заголовок карточки |
| `impact` | строка | как влияет на Яндекс | блок «Влияние» |
| `recommendation` | строка | что делать | блок «Рекомендация» |
| `importance_score` | целое **1–10** | важность: 1 — шум, 10 — критично | `Badge` с цветом (см. раздел 7) |
| `confidence_score` | дробное **0–1** | уверенность ИИ | «Уверенность 82%» (умножить на 100) |

Даты приходят строкой в формате ISO (`"2026-10-14T13:30:00"`). Превращай их в `Date` через `new Date(...)`. У тебя уже установлен `date-fns`, им удобно форматировать.

### Лайк: `POST /api/v1/feedback`

Что отправить:
```json
{ "news_id": 1, "insight_id": 1, "is_like": true }
```
- `is_like`: `true` — лайк, `false` — дизлайк.
- `insight_id` можно не отправлять, если оценивают новость целиком.

Что придёт (код `201`):
```json
{ "news_id": 1, "insight_id": 1, "is_like": true, "id": 1, "created_at": "2026-10-15T08:00:00" }
```

### ИИ-агент: `POST /api/v1/analyze`

Это сердце нашего трека: новость → персональный инсайт для Яндекса. ML пока не готов, поэтому за агента работает **заглушка на ключевых словах**:

| Если в тексте есть… | Что вернёт агент | Важность |
|---|---|---|
| «ставка», «ЦБ», «Банк России» | инсайт про стоимость долга | 8 |
| «персональные данные», «утечка» | регуляторный риск | 9 |
| «санкции», «серверы», «поставщики» | риск в цепочке поставок | 7 |
| что-то другое | «влияния не выявлено» (шум) | 1 |

Что отправить:
```json
{ "title": "ЦБ снизил ключевую ставку", "content": "Банк России снизил ключевую ставку на 100 б.п." }
```

Что придёт (код `200`) — те же поля, что у инсайта, только без `id`, `news_id` и `created_at` (результат в базу не сохраняется):
```json
{
  "event": "Изменение ключевой ставки ЦБ",
  "impact": "Меняется стоимость долга Яндекса с плавающей ставкой.",
  "recommendation": "Казначею: оценить рефинансирование через кредитную линию Альфа-Банка.",
  "importance_score": 8,
  "confidence_score": 0.6
}
```

Пустой `title` или `content` → `422`.

**Идея для демо:** страница «Проверить новость» — два поля (заголовок, текст), кнопка «Проанализировать», под ней карточка с результатом. Когда ML подключит настоящую модель, страница заработает с ней **без изменений на фронте**.

### Ошибки

| Код | Когда | Что в ответе |
|---|---|---|
| `404` | нет такой новости / инсайта | `{ "detail": "Новость не найдена" }` |
| `422` | неправильный формат запроса (например, `is_like: "да"`) | `{ "detail": [ ...список ошибок... ] }` |
| нет ответа | бэкенд не запущен | `fetch` выбросит ошибку → см. раздел 9 |

---

## 5. Типы TypeScript

Создай файл `src/types/api.ts` (эта папка уже запланирована в твоём `ARCHITECTURE.md`):

```ts
// Типы ответов нашего бэкенда. Совпадают со Swagger: http://127.0.0.1:8000/docs

export interface Insight {
  id: number;
  news_id: number;
  event: string;            // что произошло
  impact: string;           // как влияет на Яндекс
  recommendation: string;   // что делать
  importance_score: number; // 1..10, где 1 — шум, 10 — критично
  confidence_score: number; // 0..1, уверенность ИИ
  created_at: string;       // дата в формате ISO
}

export interface News {
  id: number;
  title: string;
  content: string;
  source: string | null;
  source_url: string | null;
  published_at: string | null;
  created_at: string;
  insights: Insight[];
}

export interface FeedbackIn {
  news_id: number;
  insight_id?: number | null;
  is_like: boolean;
}

export interface FeedbackOut extends FeedbackIn {
  id: number;
  created_at: string;
}

// ИИ-агент: что отправляем и что получаем
export interface AnalyzeIn {
  title: string;
  content: string;
}

export interface InsightDraft {
  event: string;
  impact: string;
  recommendation: string;
  importance_score: number;
  confidence_score: number;
}
```

---

## 6. Функции для запросов к API

Создай файл `src/api/client.ts`. Все запросы к бэкенду — **только через этот файл**: если адрес или формат поменяется, править придётся в одном месте.

```ts
import type { AnalyzeIn, FeedbackIn, FeedbackOut, InsightDraft, News } from '../types/api';

// Благодаря proxy в vite.config.ts хватает короткого адреса
const BASE_URL = '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Ошибка API ${response.status}: ${await response.text()}`);
  }
  return response.json() as Promise<T>;
}

export function getNews(): Promise<News[]> {
  return request<News[]>('/news');
}

export function getNewsById(id: number): Promise<News> {
  return request<News>(`/news/${id}`);
}

export function sendFeedback(data: FeedbackIn): Promise<FeedbackOut> {
  return request<FeedbackOut>('/feedback', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function analyzeNews(data: AnalyzeIn): Promise<InsightDraft> {
  return request<InsightDraft>('/analyze', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

И хук для загрузки ленты — `src/hooks/useNews.ts` (папка `hooks/` тоже есть в твоём плане):

```ts
import { useEffect, useState } from 'react';
import { getNews } from '../api/client';
import type { News } from '../types/api';

export function useNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNews()
      .then(setNews)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { news, loading, error };
}
```

---

## 7. Карточка инсайта на твоих компонентах

### Цвет `Badge` по важности

У твоего `Badge` есть варианты `default | success | warning | error | info`. Предлагаю так:

| `importance_score` | Вариант `Badge` | Текст |
|---|---|---|
| 8–10 | `error` (красный) | «Критично» |
| 5–7 | `warning` (жёлтый) | «Важно» |
| 1–4 | `default` (серый) | «Низкая важность» |

Новости со скором 1–4 — это «шум» (пример — новость про iPhone). Их можно бледнее показывать или прятать за фильтром.

### Компонент `src/components/InsightCard.tsx`

```tsx
import { useState } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import Badge from './Badge';
import Button from './Button';
import { sendFeedback } from '../api/client';
import type { Insight, News } from '../types/api';

function importanceBadge(score: number) {
  if (score >= 8) return { variant: 'error' as const, label: 'Критично' };
  if (score >= 5) return { variant: 'warning' as const, label: 'Важно' };
  return { variant: 'default' as const, label: 'Низкая важность' };
}

interface InsightCardProps {
  news: News;
  insight: Insight;
}

export default function InsightCard({ news, insight }: InsightCardProps) {
  // Бэкенд пока не сохраняет лайки, поэтому помним их здесь
  const [liked, setLiked] = useState<boolean | null>(null);
  const badge = importanceBadge(insight.importance_score);

  async function rate(isLike: boolean) {
    try {
      await sendFeedback({ news_id: news.id, insight_id: insight.id, is_like: isLike });
      setLiked(isLike);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card hoverable>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={badge.variant}>
            {badge.label} · {insight.importance_score}/10
          </Badge>
          <Badge variant="info">
            Уверенность {Math.round(insight.confidence_score * 100)}%
          </Badge>
        </div>
        <CardTitle>{insight.event}</CardTitle>
        <CardDescription>
          {news.title}
          {news.source && ` · ${news.source}`}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <div className="text-xs font-semibold text-yandex-text-hint uppercase">Влияние</div>
          <p className="text-sm text-yandex-text-primary">{insight.impact}</p>
        </div>
        <div>
          <div className="text-xs font-semibold text-yandex-text-hint uppercase">Рекомендация</div>
          <p className="text-sm text-yandex-text-primary">{insight.recommendation}</p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button size="sm" variant={liked === true ? 'primary' : 'ghost'} onClick={() => rate(true)}>
          👍 Полезно
        </Button>
        <Button size="sm" variant={liked === false ? 'secondary' : 'ghost'} onClick={() => rate(false)}>
          👎 Не полезно
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Страница-дашборд `src/pages/Dashboard.tsx`

```tsx
import { useNews } from '../hooks/useNews';
import InsightCard from '../components/InsightCard';

export default function Dashboard() {
  const { news, loading, error } = useNews();

  if (loading) return <p className="p-6">Загрузка…</p>;
  if (error) return <p className="p-6 text-red-600">Не удалось загрузить новости: {error}</p>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 grid gap-6 md:grid-cols-2">
      {news.flatMap((item) =>
        item.insights.map((insight) => (
          <InsightCard key={insight.id} news={item} insight={insight} />
        )),
      )}
    </main>
  );
}
```

И маршрут в `src/App.tsx`:

```tsx
import Dashboard from './pages/Dashboard';
// ...
<Route path="/dashboard" element={<Dashboard />} />
```

> Код написан под твои компоненты из ветки `frontend` (пропсы `Card`, `Badge`, `Button` сверены), но я не запускал его у себя. Если TypeScript на что-то ругнётся — пиши, поправлю.

**Детальная страница** (`/news/:id`) делается так же: `useParams()` из `react-router-dom` → `getNewsById(Number(id))` → показываешь `content`, ссылку `source_url` и все `insights`.

---

## 8. Как слить ветки `backend` и `frontend`

Обе ветки лежат в корне репозитория, но **файлы почти не пересекаются**: у тебя `src/`, `package.json` и т.д., у бэкенда `app/`, `alembic/`, `requirements.txt`. Конфликтов будет всего два, оба простые.

Я проверил заранее (`git merge-tree`):

| Файл | Почему конфликт | Как решить |
|---|---|---|
| `.gitignore` | у обеих веток свой | **оставить оба блока** (просто удалить строчки `<<<<<<<`, `=======`, `>>>>>>>`) |
| `README.md` | в `backend` удалён, у тебя — шаблон Vite | можно оставить твой или договориться о новом общем README |

Порядок, о котором договоримся с командой:
1. Ветка `backend` вливается в `main` через Pull Request.
2. Потом `frontend` вливается в `main` через Pull Request, и в нём решаются два конфликта выше.

Пока ветки не слиты, можно работать как в разделе 2: бэкенд в отдельной папке, фронт в своей. Сливать для разработки ничего не обязательно.

---

## 9. Если что-то не работает

| Что видишь | Причина | Что делать |
|---|---|---|
| `Failed to fetch` / `ECONNREFUSED` в терминале Vite | бэкенд не запущен | запусти `uvicorn app.main:app --reload` (раздел 2) |
| `404` на `/api/v1/news` | нет proxy или Vite не перезапущен | проверь `vite.config.ts` (раздел 3), перезапусти `npm run dev` |
| ошибка **CORS** в консоли браузера | пишешь полный адрес `http://localhost:8000/...` | используй короткий `/api/v1/...` через proxy |
| бэкенд при старте ругается на таблицы | после `git pull` пришла новая миграция | `alembic upgrade head` |
| `422` при лайке | неверный формат тела | проверь: `news_id` — число, `is_like` — `true`/`false` |
| не понимаешь, что приходит | — | открой http://127.0.0.1:8000/docs → Try it out |

---

## 10. Чек-лист интеграции

- [ ] Бэкенд запускается, http://127.0.0.1:8000/api/v1/news отдаёт JSON
- [ ] В `vite.config.ts` добавлен `proxy`
- [ ] Созданы `src/types/api.ts`, `src/api/client.ts`, `src/hooks/useNews.ts`
- [ ] Есть `InsightCard` и страница `/dashboard`, карточки показывают данные с бэкенда
- [ ] Кнопки 👍/👎 отправляют `POST /api/v1/feedback` (во вкладке Network видно `201`)
- [ ] (демо) Страница «Проверить новость» вызывает `analyzeNews` и показывает результат
- [ ] Видны состояния «Загрузка…» и «ошибка» (проверка: останови бэкенд и обнови страницу)

Вопросы по API — пиши мне (бэкенд). Если нужно новое поле или эндпоинт — тоже пиши, добавлю.
