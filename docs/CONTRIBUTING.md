# Руководство по разработке

Инструкции для разработчиков проекта.

---

## 🚀 Начало работы

### 1. Клонирование и установка

```bash
git clone <URL_репозитория>
cd alphahak
npm install
```

### 2. Запуск dev-сервера

```bash
npm run dev
```

Откройте http://localhost:5173

---

## 📝 Процесс разработки

### 1. Создание ветки

```bash
# Для новой фичи
git checkout -b feature/dashboard-charts

# Для исправления бага
git checkout -b fix/button-styling

# Для документации
git checkout -b docs/update-readme
```

### 2. Разработка

- Пишите код в соответствии с принципами из [ARCHITECTURE.md](./ARCHITECTURE.md)
- Следуйте стилю кода (см. ниже)
- Добавляйте комментарии для сложной логики
- Обновляйте документацию при необходимости

### 3. Коммиты

Используйте [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Фича
git commit -m "feat: add dashboard page with charts"

# Исправление
git commit -m "fix: resolve button hover state issue"

# Документация
git commit -m "docs: update README with new components"

# Рефакторинг
git commit -m "refactor: simplify Card component structure"

# Стили
git commit -m "style: format code with Prettier"

# Тесты
git commit -m "test: add unit tests for Button component"
```

### 4. Pull Request

1. Запушьте ветку: `git push origin feature/dashboard-charts`
2. Создайте Pull Request на GitHub
3. Опишите изменения в описании PR
4. Дождитесь ревью

---

## 🎨 Стиль кода

### TypeScript

```tsx
// ✅ Хорошо
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): User | null {
  // ...
}

// ❌ Плохо
function getUser(id) {
  // ...
}
```

### React компоненты

```tsx
// ✅ Хорошо
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={getButtonStyles(variant, size)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ❌ Плохо
export default function Button(props: any) {
  return <button {...props}>{props.children}</button>;
}
```

### CSS / Tailwind

```tsx
// ✅ Хорошо
<div className="flex items-center gap-4 p-6 bg-yandex-white rounded-xl shadow-sm">
  <h1 className="text-2xl font-bold text-yandex-black">Заголовок</h1>
</div>

// ❌ Плохо
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
  <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Заголовок</h1>
</div>
```

### Именование

```tsx
// Компоненты — PascalCase
function UserProfile() { }

// Функции — camelCase
function calculateTotal() { }

// Константы — UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Переменные — camelCase
const userName = 'Иван';

// CSS-классы — kebab-case
.my-custom-class { }

// Файлы компонентов — PascalCase
Button.tsx, UserProfile.tsx

// Файлы утилит — camelCase
formatDate.ts, useAuth.ts
```

---

## 🧩 Добавление компонентов

### 1. Создайте файл компонента

```tsx
// src/components/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-yandex-text-primary">
          {label}
        </label>
      )}
      <input
        className={`
          px-3 py-2 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-yandex-yellow
          ${error ? 'border-red-500' : 'border-yandex-border'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}
```

### 2. Импортируйте и используйте

```tsx
import Input from './components/Input';

function MyForm() {
  return (
    <form>
      <Input label="Email" type="email" placeholder="name@example.com" />
    </form>
  );
}
```

---

## 📄 Добавление страниц

### 1. Создайте файл страницы

```tsx
// src/pages/Dashboard.tsx
import Card from '../components/Card';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-yandex-gray p-6">
      <h1 className="text-3xl font-bold text-yandex-black mb-6">
        Дашборд
      </h1>
      <Card>
        <p>Содержимое дашборда</p>
      </Card>
    </div>
  );
}
```

### 2. Добавьте маршрут

```tsx
// src/App.tsx
import Dashboard from './pages/Dashboard';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

### 3. Создайте ссылку

```tsx
import { Link } from 'react-router-dom';

<Link to="/dashboard">Дашборд</Link>
```

---

## 🎨 Работа со стилями

### Использование цветов Яндекса

```tsx
// Жёлтый фон
<div className="bg-yandex-yellow">

// Чёрный текст
<h1 className="text-yandex-black">

// Серый фон
<div className="bg-yandex-gray">

// Белый фон
<div className="bg-yandex-white">
```

### Адаптивный дизайн

```tsx
// Мобильная версия
<div className="p-4">

// Планшет
<div className="md:p-6">

// Десктоп
<div className="lg:p-8">
```

### Flexbox и Grid

```tsx
// Flexbox
<div className="flex items-center justify-between gap-4">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## 🐛 Отладка

### React DevTools

Установите расширение для браузера:
- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### Консоль браузера

```tsx
// Логирование
console.log('Значение:', value);
console.error('Ошибка:', error);
console.warn('Предупреждение:', warning);
```

### TypeScript ошибки

```bash
npm run typecheck
```

### ESLint ошибки

```bash
npm run lint
```

---

## 🧪 Тестирование (планируется)

### Unit-тесты

```tsx
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders button with text', () => {
  render(<Button>Нажми меня</Button>);
  expect(screen.getByText('Нажми меня')).toBeInTheDocument();
});
```

### Запуск тестов

```bash
npm test
npm run test:coverage
```

---

## 📦 Деплой

### Локальная сборка

```bash
npm run build
```

### Предпросмотр сборки

```bash
npm run preview
```

### Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Vercel автоматически деплоит при каждом push
3. Production-версия на main ветке

---

## 📚 Полезные ссылки

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org)
- [React Best Practices](https://www.patterns.dev)

---

## ❓ Вопросы?

Если возникли вопросы:
1. Проверьте документацию в папке `docs/`
2. Поищите в [Issues](https://github.com/your-repo/issues)
3. Создайте новый Issue с описанием проблемы
