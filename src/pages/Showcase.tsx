import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/Card';

export default function Showcase() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass sticky top-0 z-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm gradient-bg shadow-md">
              Я
            </div>
            <span className="text-lg font-semibold text-text-primary">
              UI-Kit Showcase
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              Дашборд
            </Link>
            <Link
              to="/"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              ← На главную
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Базовые компоненты
          </h1>
          <p className="text-text-secondary">
            Демонстрация UI-компонентов в современной стилистике
          </p>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Button
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Варианты кнопок</CardTitle>
              <CardDescription>
                Четыре варианта для разных сценариев использования
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Размеры кнопок</CardTitle>
              <CardDescription>
                Три размера для разных контекстов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badge Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            Badge
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Варианты бейджей</CardTitle>
              <CardDescription>
                Для отображения статусов, тегов и меток
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge variant="default">По умолчанию</Badge>
                <Badge variant="success">Успешно</Badge>
                <Badge variant="warning">Внимание</Badge>
                <Badge variant="error">Ошибка</Badge>
                <Badge variant="info">Информация</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Примеры использования</CardTitle>
              <CardDescription>
                Бейджи в контексте карточек и списков
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-border">
                  <span className="text-sm font-medium">Рост выручки</span>
                  <Badge variant="success">+12.5%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-border">
                  <span className="text-sm font-medium">Отток пользователей</span>
                  <Badge variant="error">+3.2%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-border">
                  <span className="text-sm font-medium">Конверсия</span>
                  <Badge variant="warning">Внимание</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-border">
                  <span className="text-sm font-medium">Новые фичи</span>
                  <Badge variant="info">3 в работе</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Card
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card hoverable>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Карточка инсайта</CardTitle>
                  <Badge variant="success">Новое</Badge>
                </div>
                <CardDescription>
                  Пример карточки с инсайтом для дашборда руководителя
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 border border-border">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ₽ 2.4M
                  </div>
                  <div className="text-sm text-text-secondary mt-1">
                    Выручка за неделю
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-hint">Обновлено 5 мин назад</span>
                  <Button size="sm" variant="ghost">Подробнее</Button>
                </div>
              </CardFooter>
            </Card>

            <Card hoverable>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Метрика команды</CardTitle>
                  <Badge variant="warning">Риск</Badge>
                </div>
                <CardDescription>
                  Производительность команды за текущий спринт
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 border border-border">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    78%
                  </div>
                  <div className="text-sm text-text-secondary mt-1">
                    Выполнение задач спринта
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-hint">Спринт 24</span>
                  <Button size="sm" variant="ghost">Подробнее</Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Размеры отступов</CardTitle>
              <CardDescription>
                Карточки поддерживают разные размеры внутренних отступов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Card padding="sm" className="bg-gray-50">
                  <span className="text-xs font-mono text-text-hint">padding: sm</span>
                </Card>
                <Card padding="md" className="bg-gray-50">
                  <span className="text-xs font-mono text-text-hint">padding: md</span>
                </Card>
                <Card padding="lg" className="bg-gray-50">
                  <span className="text-xs font-mono text-text-hint">padding: lg</span>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            Цветовая палитра
          </h2>

          <Card>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-full h-20 bg-primary rounded-xl mb-2 shadow-md"></div>
                  <span className="text-xs font-medium">Primary</span>
                  <span className="block text-xs text-text-hint">#FF3D71</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-secondary rounded-xl mb-2 shadow-md"></div>
                  <span className="text-xs font-medium">Secondary</span>
                  <span className="block text-xs text-text-hint">#8B5CF6</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-white rounded-xl mb-2 border border-border shadow-sm"></div>
                  <span className="text-xs font-medium">White</span>
                  <span className="block text-xs text-text-hint">#FFFFFF</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-gray-100 rounded-xl mb-2 border border-border"></div>
                  <span className="text-xs font-medium">Gray</span>
                  <span className="block text-xs text-text-hint">#F5F5F5</span>
                </div>
              </div>

              {/* Gradient */}
              <div className="mt-6">
                <div className="text-xs font-medium text-text-secondary mb-2">Градиент (Primary → Secondary)</div>
                <div className="w-full h-20 rounded-xl gradient-bg shadow-md"></div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-text-hint">
            © 2026 Яндекс. Панель руководителя
          </span>
          <span className="text-sm text-text-hint">
            UI-Kit v0.1.0
          </span>
        </div>
      </footer>
    </div>
  );
}