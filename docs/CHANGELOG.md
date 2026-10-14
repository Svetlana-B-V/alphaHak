# Changelog

Все значимые изменения проекта документируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

---

## [0.1.0] — 2026-10-14

### Добавлено
- 🎨 **Дизайн-система в стилистике Яндекса**
  - CSS-переменные фирменных цветов: Yellow (#FFCC00), Black, White, Gray
  - Подключение шрифта Inter (аналог Yandex Sans)
  - Базовые утилитарные классы через Tailwind CSS

- 🧩 **UI-Kit: базовые компоненты**
  - `Button` — 4 варианта (primary, secondary, outline, ghost), 3 размера (sm, md, lg)
  - `Badge` — 5 вариантов статусов (default, success, warning, error, info)
  - `Card` — карточка с подкомпонентами (Header, Title, Description, Content, Footer)

- 📄 **Страницы**
  - Главная страница (`/`) — hero-секция, карточки фич, CTA
  - Showcase (`/showcase`) — демонстрация всех компонентов UI-Kit

- 🗺️ **Роутинг**
  - React Router DOM для навигации между страницами

- ⚙️ **Инструменты разработки**
  - Vite 6.x для быстрой сборки
  - TypeScript для типизации
  - Tailwind CSS 4.x для стилей
  - ESLint для проверки кода

### Конфигурация
- Настроен `vite.config.ts` с плагинами React и Tailwind
- Определены кастомные цвета в `@theme` (Tailwind CSS 4)
- Настроен `tsconfig.json` для строгой типизации

---

## [0.0.0] — Инициализация

- Инициализация проекта с помощью `create-vite` (шаблон `react-ts`)
- Базовая структура React + TypeScript + Vite

---

## Планируемые изменения (Roadmap)

### [0.2.0] — Следующий релиз
- [ ] Страница дашборда с графиками (Recharts)
- [ ] Компонент `Input` для форм
- [ ] Компонент `Modal` для модальных окон
- [ ] Компонент `Table` для таблиц данных
- [ ] Компонент `Sidebar` для боковой навигации

### [0.3.0]
- [ ] Интеграция с Supabase для хранения данных
- [ ] Авторизация и аутентификация
- [ ] Drag & Drop виджеты на дашборде
- [ ] Анимации переходов между страницами

### [1.0.0]
- [ ] Production-ready дашборд
- [ ] Полная документация API
- [ ] Покрытие тестами (Vitest + React Testing Library)
- [ ] CI/CD пайплайн
