import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card, { CardTitle, CardDescription } from '../components/Card';

export default function Home() {
  return (
    <div className="min-h-screen bg-yandex-gray">
      {/* Header */}
      <header className="bg-yandex-white border-b border-yandex-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yandex-yellow rounded-lg flex items-center justify-center font-bold text-yandex-black text-sm">
              Я
            </div>
            <span className="text-lg font-semibold text-yandex-black">
              Панель руководителя
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              to="/showcase"
              className="text-sm text-yandex-text-secondary hover:text-yandex-black transition-colors"
            >
              UI-Kit
            </Link>
            <Button size="sm" variant="primary">
              Войти
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yandex-black mb-4">
            Аналитика для руководителей
          </h1>
          <p className="text-lg text-yandex-text-secondary max-w-2xl mx-auto">
            Дашборд с ключевыми метриками, инсайтами и данными в едином пространстве.
            Быстрый доступ к важному.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card hoverable>
            <div className="w-10 h-10 bg-yandex-yellow rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-yandex-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <CardTitle>Метрики</CardTitle>
            <CardDescription>
              Ключевые показатели эффективности в реальном времени
            </CardDescription>
          </Card>

          <Card hoverable>
            <div className="w-10 h-10 bg-yandex-yellow rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-yandex-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <CardTitle>Инсайты</CardTitle>
            <CardDescription>
              Автоматические рекомендации на основе данных
            </CardDescription>
          </Card>

          <Card hoverable>
            <div className="w-10 h-10 bg-yandex-yellow rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-yandex-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <CardTitle>Отчёты</CardTitle>
            <CardDescription>
              Еженедельные сводки и аналитические отчёты
            </CardDescription>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/showcase">
            <Button size="lg" variant="primary">
              Посмотреть компоненты →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yandex-border bg-yandex-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="text-sm text-yandex-text-hint">
            © 2026 Яндекс. Панель руководителя
          </span>
          <span className="text-sm text-yandex-text-hint">
            v0.1.0
          </span>
        </div>
      </footer>
    </div>
  );
}
