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
    <div className="min-h-screen bg-yandex-gray">
      {/* Header */}
      <header className="bg-yandex-white border-b border-yandex-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yandex-yellow rounded-lg flex items-center justify-center font-bold text-yandex-black text-sm">
              Я
            </div>
            <span className="text-lg font-semibold text-yandex-black">
              UI-Kit Showcase
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-yandex-text-secondary hover:text-yandex-black transition-colors"
            >
              ← На главную
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-yandex-black mb-2">
            Базовые компоненты
          </h1>
          <p className="text-yandex-text-secondary">
            Демонстрация UI-компонентов в стилистике Яндекса
          </p>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-yandex-black mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-yandex-yellow rounded-full"></span>
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
          <h2 className="text-2xl font-semibold text-yandex-black mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-yandex-yellow rounded-full"></span>
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
                <div className="flex items-center justify-between p-3 bg-yandex-gray rounded-lg">
                  <span className="text-sm font-medium">Рост выручки</span>
                  <Badge variant="success">+12.5%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yandex-gray rounded-lg">
                  <span className="text-sm font-medium">Отток пользователей</span>
                  <Badge variant="error">+3.2%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yandex-gray rounded-lg">
                  <span className="text-sm font-medium">Конверсия</span>
                  <Badge variant="warning">Внимание</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yandex-gray rounded-lg">
                  <span className="text-sm font-medium">Новые фичи</span>
                  <Badge variant="info">3 в работе</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-yandex-black mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-yandex-yellow rounded-full"></span>
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
                <div className="bg-yandex-gray rounded-lg p-4">
                  <div className="text-2xl font-bold text-yandex-black">₽ 2.4M</div>
                  <div className="text-sm text-yandex-text-secondary mt-1">
                    Выручка за неделю
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-yandex-text-hint">Обновлено 5 мин назад</span>
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
                <div className="bg-yandex-gray rounded-lg p-4">
                  <div className="text-2xl font-bold text-yandex-black">78%</div>
                  <div className="text-sm text-yandex-text-secondary mt-1">
                    Выполнение задач спринта
                  </div>
                  <div className="mt-3 w-full bg-yandex-gray-dark rounded-full h-2">
                    <div className="bg-yandex-yellow h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-yandex-text-hint">Спринт 24</span>
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
                <Card padding="sm" className="bg-yandex-gray">
                  <span className="text-xs font-mono text-yandex-text-hint">padding: sm</span>
                </Card>
                <Card padding="md" className="bg-yandex-gray">
                  <span className="text-xs font-mono text-yandex-text-hint">padding: md</span>
                </Card>
                <Card padding="lg" className="bg-yandex-gray">
                  <span className="text-xs font-mono text-yandex-text-hint">padding: lg</span>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-yandex-black mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-yandex-yellow rounded-full"></span>
            Цветовая палитра
          </h2>

          <Card>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-full h-20 bg-yandex-yellow rounded-lg mb-2 border border-yandex-border"></div>
                  <span className="text-xs font-medium text-yandex-text-primary">Yellow</span>
                  <span className="block text-xs text-yandex-text-hint">#FFCC00</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-yandex-black rounded-lg mb-2"></div>
                  <span className="text-xs font-medium text-yandex-text-primary">Black</span>
                  <span className="block text-xs text-yandex-text-hint">#000000</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-yandex-white rounded-lg mb-2 border border-yandex-border"></div>
                  <span className="text-xs font-medium text-yandex-text-primary">White</span>
                  <span className="block text-xs text-yandex-text-hint">#FFFFFF</span>
                </div>
                <div className="text-center">
                  <div className="w-full h-20 bg-yandex-gray rounded-lg mb-2 border border-yandex-border"></div>
                  <span className="text-xs font-medium text-yandex-text-primary">Gray</span>
                  <span className="block text-xs text-yandex-text-hint">#F5F5F5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-yandex-border bg-yandex-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="text-sm text-yandex-text-hint">
            © 2026 Яндекс. Панель руководителя
          </span>
          <span className="text-sm text-yandex-text-hint">
            UI-Kit v0.1.0
          </span>
        </div>
      </footer>
    </div>
  );
}