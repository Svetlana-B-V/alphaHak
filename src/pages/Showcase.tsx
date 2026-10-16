import Navbar from '../components/Navbar';
import LiveBackground from '../components/LiveBackground';
import ConnectedStats from '../components/ConnectedStats';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/Card';

export default function Showcase() {
  return (
    <div className="min-h-screen relative">
      <LiveBackground />
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-12">
        <div>
          <Badge variant="info" className="mb-2">✦ DESIGN SYSTEM</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary">
            UI-Kit Young & Yandex
          </h1>
          <p className="text-text-secondary mt-2">
            Многослойные карточки, капсульные кнопки, шрифты YS Display / YS Text и абстрактные метабол-блоки
          </p>
        </div>

        {/* Демонстрация абстрактных соединённых блоков (3 фото) */}
        <section>
          <h2 className="text-2xl font-extrabold font-display mb-4">
            Абстрактные соединённые блоки (Metaball Cards)
          </h2>
          <ConnectedStats
            stats={[
              { value: '11 000', suffix: '+', label: 'Обработанных сигналов за месяц' },
              { value: '100%', label: 'Синхронизация с дизайн-кодом Яндекса' },
              { value: 'v0.2', label: 'Honeycomb UI' },
            ]}
          />
        </section>

        {/* Кнопки */}
        <Card hoverable>
          <CardHeader>
            <CardTitle>Кнопки (Button)</CardTitle>
            <CardDescription>Капсульные кнопки с микроанимацией при наведении</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </CardContent>
        </Card>

        {/* Бейджи */}
        <Card hoverable>
          <CardHeader>
            <CardTitle>Бейджи (Badge)</CardTitle>
            <CardDescription>Статусы критичности и уверенности модели</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 items-center">
            <Badge variant="default">По умолчанию</Badge>
            <Badge variant="success">✦ Успешно</Badge>
            <Badge variant="warning">✦ Важно</Badge>
            <Badge variant="error">✦ Критично</Badge>
            <Badge variant="info">✦ Информация</Badge>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}