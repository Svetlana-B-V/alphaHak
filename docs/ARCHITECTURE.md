# Архитектура проекта

Описание структуры, принципов организации кода и подходов к разработке.

---

## 🏗 Общая архитектура

Проект построен по принципу **Feature-based Architecture** с элементами **Atomic Design**.

```
┌─────────────────────────────────────────┐
│              Pages (Страницы)            │
│  Home, Showcase, Dashboard, Settings    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           Components (Компоненты)        │
│  Button, Badge, Card, Input, Modal      │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│              Utilities (Утилиты)         │
│  hooks, helpers, constants, types       │
└─────────────────────────────────────────┘
```

---

## 📁 Структура директорий

```
src/
├── components/          # Переиспользуемые UI-компоненты
│   ├── Button.tsx       # Кнопка
│   ├── Badge.tsx        # Бейдж
│   ├── Card.tsx         # Карточка
│   └── index.ts         # Экспорты (опционально)
│
├── pages/               # Страницы приложения
│   ├── Home.tsx         # Главная
│   ├── Showcase.tsx     # Демонстрация UI
│   └── Dashboard.tsx    # Дашборд (планируется)
│
├── hooks/               # Кастомные React-хуки (планируется)
│   ├── useAuth.ts       # Авторизация
│   └── useData.ts       # Работа с данными
│
├── utils/               # Утилитарные функции (планируется)
│   ├── format.ts        # Форматирование данных
│   └── validators.ts    # Валидация
│
├── types/               # TypeScript-типы (планируется)
│   ├── api.ts           # Типы API
│   └── models.ts        # Типы моделей данных
│
├── constants/           # Константы (планируется)
│   ├── routes.ts        # Маршруты
│   └── colors.ts        # Цвета
│
├── App.tsx              # Корневой компонент + роутинг
├── main.tsx             # Точка входа
└── index.css            # Глобальные стили
```

---

## 🎨 Принципы организации кода

### 1. Компонентный подход

Каждый компонент:
- Находится в отдельном файле
- Имеет чёткую ответственность
- Принимает пропсы через TypeScript-интерфейсы
- Экспортируется по умолчанию

**Пример:**
```tsx
// src/components/Button.tsx

// 1. Определение типов
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// 2. Компонент
export default function Button({
  variant = 'primary',
  size = 'md',
  children
}: ButtonProps) {
  return <button className={...}>{children}</button>;
}
```

### 2. Разделение ответственности

- **Компоненты** — только UI, без бизнес-логики
- **Хуки** — логика, состояние, побочные эффекты
- **Утилиты** — вспомогательные функции
- **Типы** — описание структуры данных

### 3. Именование файлов

- Компоненты: **PascalCase** (`Button.tsx`, `Card.tsx`)
- Утилиты: **camelCase** (`formatDate.ts`, `useAuth.ts`)
- Константы: **camelCase** (`routes.ts`, `colors.ts`)

### 4. Именование переменных

```tsx
// Компоненты — PascalCase
function MyComponent() { }

// Функции — camelCase
function calculateTotal() { }

// Константы — UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Переменные — camelCase
const userName = 'Иван';
```

---

## 🎨 Дизайн-система

### CSS-переменные

Определены в `src/index.css`:

```css
:root {
  --yandex-yellow: #FFCC00;
  --yandex-black: #000;
  --yandex-white: #FFF;
  --yandex-gray: #F5F5F5;
}
```

### Tailwind-конфигурация

Кастомные цвета добавлены через `@theme`:

```css
@theme {
  --color-yandex-yellow: #FFCC00;
  --color-yandex-black: #000000;
  --color-yandex-white: #FFFFFF;
  --color-yandex-gray: #F5F5F5;
}
```

Использование:
```tsx
<div className="bg-yandex-yellow text-yandex-black">
  Жёлтый фон, чёрный текст
</div>
```

---

## 🗺️ Роутинг

Маршруты определены в `src/App.tsx`:

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/showcase" element={<Showcase />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</BrowserRouter>
```

### Планируемая структура маршрутов

| Маршрут | Страница | Описание |
|---------|---------|----------|
| `/` | Home | Главная страница |
| `/showcase` | Showcase | Демонстрация UI-компонентов |
| `/dashboard` | Dashboard | Основной дашборд |
| `/dashboard/analytics` | Analytics | Аналитика |
| `/settings` | Settings | Настройки |
| `/login` | Login | Авторизация |

---

## 📊 Поток данных

### Текущая архитектура (без бэкенда)

```
User Action → Component → State (useState) → Re-render
```

### Планируемая архитектура (с бэкендом)

```
User Action → Component → Hook → API → Supabase → Response → State → Re-render
```

---

## 🔐 Безопасность

### Принципы

1. **Валидация на клиенте** — проверка данных перед отправкой
2. **Защита маршрутов** — авторизация для приватных страниц
3. **Безопасное хранение** — использование environment variables
4. **CSP (Content Security Policy)** — защита от XSS

### Environment Variables

```bash
# .env.local (не коммитится в Git)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Использование:
```tsx
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
```

---

## 🧪 Тестирование (планируется)

### Структура тестов

```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── pages/
│   ├── Home.tsx
│   └── __tests__/
│       └── Home.test.tsx
```

### Типы тестов

1. **Unit-тесты** — тестирование отдельных функций
2. **Component-тесты** — тестирование компонентов
3. **Integration-тесты** — тестирование взаимодействия компонентов
4. **E2E-тесты** — сквозное тестирование

### Инструменты

- **Vitest** — тест-раннер
- **React Testing Library** — тестирование компонентов
- **Playwright** — E2E тесты

---

## 🚀 Производительность

### Оптимизации

1. **Code Splitting** — автоматическое разделение кода по маршрутам
2. **Lazy Loading** — ленивая загрузка компонентов
3. **Tree Shaking** — удаление неиспользуемого кода
4. **Image Optimization** — оптимизация изображений

### Пример Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
```

---

## 📦 Деплой

### Production-сборка

```bash
npm run build
```

Результат в папке `dist/`:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
```

### Хостинг

Рекомендуемые платформы:
- **Vercel** — автоматический деплой из Git
- **Netlify** — простой деплой
- **GitHub Pages** — бесплатный хостинг

---

## 🔄 CI/CD (планируется)

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

---

## 📚 Дополнительные ресурсы

- [React Best Practices](https://www.patterns.dev/posts/react-best-practices)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Vite Performance Guide](https://vitejs.dev/guide/performance)
- [Tailwind CSS Architecture](https://tailwindcss.com/docs/architecture)
