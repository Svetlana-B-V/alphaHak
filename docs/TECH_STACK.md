# Технологический стек

Подробное описание технологий, используемых в проекте.

---

## 🎯 Основные технологии

### React 18.x

**Что это:** Библиотека для построения пользовательских интерфейсов.

**Особенности:**
- Компонентный подход — UI разбит на переиспользуемые компоненты
- Virtual DOM — эффективное обновление интерфейса
- Hooks — управление состоянием и побочными эффектами
- JSX — синтаксис для описания UI в JavaScript

**Как использовать:**
```tsx
// Функциональный компонент
function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Нажато: {count}
    </button>
  );
}
```

**Документация:** https://react.dev

---

### TypeScript 5.x

**Что это:** Язык программирования, расширяющий JavaScript типизацией.

**Особенности:**
- Статическая типизация — ошибки ловятся на этапе компиляции
- Инellisense — автодополнение в IDE
- Рефакторинг — безопасное изменение кода
- Интерфейсы и типы — описание структуры данных

**Как использовать:**
```tsx
// Типизация пропсов
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

function Button({ variant, size, children }: ButtonProps) {
  return <button className={...}>{children}</button>;
}
```

**Документация:** https://www.typescriptlang.org

---

### Vite 6.x

**Что это:** Инструмент для быстрой сборки и разработки.

**Особенности:**
- Мгновенный запуск dev-сервера
- Hot Module Replacement (HMR) — изменения применяются без перезагрузки
- Оптимизированная production-сборка
- Поддержка TypeScript, JSX, CSS out of the box

**Как использовать:**
```bash
# Запуск dev-сервера
npm run dev

# Production-сборка
npm run build

# Предпросмотр сборки
npm run preview
```

**Конфигурация:** `vite.config.ts`
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
```

**Документация:** https://vitejs.dev

---

### Tailwind CSS 4.x

**Что это:** Утилитарный CSS-фреймворк.

**Особенности:**
- Утилитарные классы — стили прямо в JSX
- Кастомизация через конфигурацию
- Автоматическое удаление неиспользуемых стилей
- Адаптивный дизайн из коробки

**Как использовать:**
```tsx
<div className="flex items-center gap-4 p-6 bg-yandex-white rounded-xl">
  <h1 className="text-2xl font-bold text-yandex-black">Заголовок</h1>
</div>
```

**Кастомные цвета:**
```css
/* src/index.css */
@theme {
  --color-yandex-yellow: #FFCC00;
  --color-yandex-black: #000000;
}
```

**Документация:** https://tailwindcss.com

---

## 🗺️ Роутинг

### React Router DOM 6.x

**Что это:** Библиотека для навигации между страницами.

**Особенности:**
- Декларативный роутинг
- Динамические маршруты
- Вложенные маршруты
- Программная навигация

**Как использовать:**
```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/showcase">UI-Kit</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<Showcase />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Программная навигация:**
```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/dashboard')}>
      Перейти к дашборду
    </button>
  );
}
```

**Документация:** https://reactrouter.com

---

## 🎨 Дополнительные библиотеки

### Framer Motion 11.x

**Что это:** Библиотека для анимаций в React.

**Особенности:**
- Простой API для анимаций
- Жесты (drag, tap, hover)
- Анимации появления/исчезновения
- Layout-анимации

**Как использовать:**
```tsx
import { motion } from 'framer-motion';

function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>Контент</Card>
    </motion.div>
  );
}
```

**Документация:** https://www.framer.com/motion

---

### Lucide React 0.294.x

**Что это:** Набор иконок для React.

**Особенности:**
- 1000+ иконок
- Настраиваемый размер и цвет
- Оптимизированные SVG
- Tree-shaking — загружаются только используемые иконки

**Как использовать:**
```tsx
import { Home, Settings, User } from 'lucide-react';

function Navigation() {
  return (
    <nav>
      <Home size={24} color="#FFCC00" />
      <Settings size={24} />
      <User size={24} />
    </nav>
  );
}
```

**Документация:** https://lucide.dev

---

### Recharts 2.x

**Что это:** Библиотека для создания графиков и диаграмм.

**Особенности:**
- Компонентный подход
- Адаптивные графики
- Интерактивность (tooltip, legend)
- Различные типы графиков (line, bar, pie, area)

**Как использовать:**
```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Пн', value: 400 },
  { name: 'Вт', value: 300 },
  { name: 'Ср', value: 500 },
];

function MyChart() {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#FFCC00" />
    </LineChart>
  );
}
```

**Документация:** https://recharts.org

---

### date-fns 2.x

**Что это:** Библиотека для работы с датами.

**Особенности:**
- Модульная структура — импортируются только нужные функции
- Типизация из коробки
- Поддержка локализации
- Функциональный подход

**Как использовать:**
```tsx
import { format, formatDistance, subDays, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';

// Форматирование
format(new Date(), 'dd.MM.yyyy', { locale: ru }); // "14.10.2026"

// Относительное время
formatDistance(subDays(new Date(), 3), new Date(), { locale: ru }); // "3 дня назад"

// Математика дат
addDays(new Date(), 7); // дата через неделю
```

**Документация:** https://date-fns.org

---

## 📦 Менеджер пакетов

### npm

**Что это:** Менеджер пакетов для Node.js.

**Основные команды:**
```bash
# Установка всех зависимостей из package.json
npm install

# Установка нового пакета
npm install <package-name>

# Установка dev-зависимости
npm install -D <package-name>

# Удаление пакета
npm uninstall <package-name>

# Запуск скрипта из package.json
npm run <script-name>
```

**Документация:** https://docs.npmjs.com

---

## 🔧 Инструменты разработки

### ESLint

**Что это:** Линтер для JavaScript/TypeScript.

**Назначение:** Проверка кода на ошибки и соответствие стандартам.

**Как использовать:**
```bash
npm run lint
```

---

### TypeScript Compiler (tsc)

**Что это:** Компилятор TypeScript.

**Назначение:** Проверка типов без компиляции.

**Как использовать:**
```bash
npm run typecheck
```

---

## 📚 Полезные ссылки

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion)
- [Recharts Examples](https://recharts.org/en-US/examples)
