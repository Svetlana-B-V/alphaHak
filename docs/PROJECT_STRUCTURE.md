# Полная структура проекта

Детальное описание всех файлов и директорий проекта.

---

## 📁 Дерево файлов

```
alphahak/
│
├── 📄 .gitignore                    # Файлы и папки для исключения из Git
├── 📄 README.md                     # Основная документация проекта
├── 📄 CHANGELOG.md                  # История изменений
├── 📄 package.json                  # Зависимости и скрипты npm
├── 📄 package-lock.json             # Зафиксированные версии зависимостей
├── 📄 tsconfig.json                 # Конфигурация TypeScript
├── 📄 vite.config.ts                # Конфигурация Vite
├── 📄 index.html                    # HTML-шаблон приложения
│
├── 📂 docs/                         # Документация
│   ├── 📄 TECH_STACK.md             # Описание технологий
│   ├── 📄 ARCHITECTURE.md           # Архитектура проекта
│   └── 📄 CONTRIBUTING.md           # Руководство по разработке
│
├── 📂 src/                          # Исходный код приложения
│   ├── 📄 main.tsx                  # Точка входа React
│   ├── 📄 App.tsx                   # Корневой компонент + роутинг
│   ├── 📄 index.css                 # Глобальные стили + Tailwind
│   │
│   ├── 📂 components/               # UI-компоненты
│   │   ├── 📄 Button.tsx            # Кнопка (4 варианта, 3 размера)
│   │   ├── 📄 Badge.tsx             # Бейдж-метка (5 вариантов)
│   │   └── 📄 Card.tsx              # Карточка с подкомпонентами
│   │
│   └── 📂 pages/                    # Страницы приложения
│       ├── 📄 Home.tsx              # Главная страница
│       └── 📄 Showcase.tsx          # Демонстрация UI-компонентов
│
└── 📂 dist/                         # Production-сборка (генерируется)
    ├── 📄 index.html
    └── 📂 assets/
        ├── 📄 index-[hash].js
        └── 📄 index-[hash].css
```

---

## 📋 Описание файлов

### Корневые файлы

#### `.gitignore`
Определяет файлы и папки, которые не должны отслеживаться Git:
- `node_modules/` — зависимости
- `dist/` — сборка
- `.env` — переменные окружения
- Файлы IDE (`.vscode/`, `.idea/`)
- Логи и временные файлы

#### `README.md`
Основная документация проекта:
- Описание проекта
- Быстрый старт
- Структура проекта
- Дизайн-система
- Технологии
- Команды
- Решение проблем

#### `CHANGELOG.md`
История изменений по версиям:
- Что добавлено
- Что изменено
- Что исправлено
- Планируемые изменения (Roadmap)

#### `package.json`
Конфигурация npm-проекта:
```json
{
  "name": "alphahak",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "framer-motion": "^11.16.1",
    "lucide-react": "^0.294.0",
    "recharts": "^2.10.0",
    "date-fns": "^2.30.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.3.5",
    "tailwindcss": "^4.1.7",
    "@tailwindcss/vite": "^4.1.7",
    "typescript": "^5.7.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

#### `tsconfig.json`
Конфигурация TypeScript:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src"]
}
```

#### `vite.config.ts`
Конфигурация Vite:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
```

#### `index.html`
HTML-шаблон приложения:
- Подключение шрифта Inter
- Базовые стили
- Точка монтирования React (`<div id="root">`)
- Подключение `main.tsx`

---

### Директория `docs/`

#### `TECH_STACK.md`
Подробное описание технологий:
- React 18.x
- TypeScript 5.x
- Vite 6.x
- Tailwind CSS 4.x
- React Router DOM 6.x
- Framer Motion 11.x
- Lucide React 0.294.x
- Recharts 2.x
- date-fns 2.x
- Примеры использования каждой технологии

#### `ARCHITECTURE.md`
Архитектура проекта:
- Общая структура
- Принципы организации кода
- Дизайн-система
- Роутинг
- Поток данных
- Безопасность
- Производительность
- Деплой

#### `CONTRIBUTING.md`
Руководство по разработке:
- Начало работы
- Процесс разработки
- Стиль кода
- Добавление компонентов
- Добавление страниц
- Работа со стилями
- Отладка
- Тестирование
- Деплой

---

### Директория `src/`

#### `main.tsx`
Точка входа React:
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `App.tsx`
Корневой компонент с роутингом:
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Showcase from './pages/Showcase';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<Showcase />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### `index.css`
Глобальные стили и Tailwind:
- Импорт Tailwind CSS
- Определение кастомных цветов в `@theme`
- CSS-переменные
- Базовые стили для `body`

---

### Директория `src/components/`

#### `Button.tsx`
Компонент кнопки:
- **Варианты**: `primary`, `secondary`, `outline`, `ghost`
- **Размеры**: `sm`, `md`, `lg`
- **Пропсы**: `variant`, `size`, `children`, `className`, `onClick`, `disabled`
- **Стилизация**: Tailwind-классы
- **Доступность**: focus-состояния, disabled-состояние

#### `Badge.tsx`
Компонент бейджа:
- **Варианты**: `default`, `success`, `warning`, `error`, `info`
- **Пропсы**: `variant`, `children`, `className`
- **Стилизация**: Tailwind-классы
- **Использование**: статусы, теги, метки

#### `Card.tsx`
Компонент карточки с подкомпонентами:
- **Card** — основной контейнер
- **CardHeader** — заголовок карточки
- **CardTitle** — заголовок
- **CardDescription** — описание
- **CardContent** — содержимое
- **CardFooter** — подвал
- **Пропсы**: `hoverable`, `padding` (`none`, `sm`, `md`, `lg`)

---

### Директория `src/pages/`

#### `Home.tsx`
Главная страница:
- Header с логотипом и навигацией
- Hero-секция с заголовком и описанием
- Три карточки фич (Метрики, Инсайты, Отчёты)
- CTA-кнопка для перехода к Showcase
- Footer

#### `Showcase.tsx`
Страница демонстрации UI-компонентов:
- Header с навигацией
- Секция Button (варианты и размеры)
- Секция Badge (все варианты)
- Секция Card (примеры использования)
- Секция Color Palette (цветовая палитра)
- Footer

---

## 🔧 Зависимости

### Production-зависимости

| Пакет | Версия | Назначение |
|-------|--------|-----------|
| `react` | ^18.2.0 | UI-библиотека |
| `react-dom` | ^18.2.0 | Рендеринг React в DOM |
| `react-router-dom` | ^6.8.0 | Роутинг |
| `framer-motion` | ^11.16.1 | Анимации |
| `lucide-react` | ^0.294.0 | Иконки |
| `recharts` | ^2.10.0 | Графики и диаграммы |
| `date-fns` | ^2.30.0 | Работа с датами |
| `uuid` | ^9.0.1 | Генерация UUID |

### Dev-зависимости

| Пакет | Версия | Назначение |
|-------|--------|-----------|
| `vite` | ^6.3.5 | Сборщик и dev-сервер |
| `@vitejs/plugin-react` | ^4.3.4 | Плагин React для Vite |
| `tailwindcss` | ^4.1.7 | CSS-фреймворк |
| `@tailwindcss/vite` | ^4.1.7 | Плагин Tailwind для Vite |
| `typescript` | ^5.7.0 | TypeScript компилятор |
| `@types/react` | ^18.2.0 | Типы для React |
| `@types/react-dom` | ^18.2.0 | Типы для React DOM |

---

## 📊 Статистика проекта

### Текущее состояние (v0.1.0)

- **Файлов**: 15
- **Компонентов**: 3 (Button, Badge, Card)
- **Страниц**: 2 (Home, Showcase)
- **Строк кода**: ~500
- **Размер сборки**: ~180 KB (JS) + ~17 KB (CSS)

### Планируемое состояние (v1.0.0)

- **Файлов**: ~50
- **Компонентов**: ~15
- **Страниц**: ~10
- **Строк кода**: ~5000
- **Размер сборки**: ~500 KB (JS) + ~50 KB (CSS)

---

## 🚀 Команды

| Команда | Описание | Результат |
|---------|----------|-----------|
| `npm run dev` | Запуск dev-сервера | http://localhost:5173 |
| `npm run build` | Production-сборка | Папка `dist/` |
| `npm run preview` | Предпросмотр сборки | http://localhost:4173 |
| `npm run lint` | Проверка кода | Отчёт ESLint |
| `npm run typecheck` | Проверка типов | Отчёт TypeScript |

---

## 📚 Дополнительные ресурсы

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
