import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card, { CardTitle, CardDescription } from '../components/Card';

export default function Home() {
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
              Панель руководителя
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              to="/showcase"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              UI-Kit
            </Link>
            <Button size="sm" variant="primary">
              Войти
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero с градиентом */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg absolute inset-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
              ✨ Новая версия v0.1.0
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Аналитика для<br />руководителей
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Дашборд с ключевыми метриками, инсайтами и данными в едином пространстве.
              Быстрый доступ к важному.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/showcase">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                Посмотреть компоненты →
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Документация
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16 -mt-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card hoverable>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-primary to-secondary shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <CardTitle>Метрики</CardTitle>
            <CardDescription>
              Ключевые показатели эффективности в реальном времени
            </CardDescription>
          </Card>

          <Card hoverable>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-primary to-secondary shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <CardTitle>Инсайты</CardTitle>
            <CardDescription>
              Автоматические рекомендации на основе данных
            </CardDescription>
          </Card>

          <Card hoverable>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-primary to-secondary shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <CardTitle>Отчёты</CardTitle>
            <CardDescription>
              Еженедельные сводки и аналитические отчёты
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <Card padding="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                3
              </div>
              <div className="text-sm text-text-secondary mt-1">Компонента</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                2
              </div>
              <div className="text-sm text-text-secondary mt-1">Страницы</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-text-secondary mt-1">Адаптивность</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                9
              </div>
              <div className="text-sm text-text-secondary mt-1">Документов</div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-text-hint">
            © 2026 Яндекс. Панель руководителя
          </span>
          <span className="text-sm text-text-hint">
            v0.1.0
          </span>
        </div>
      </footer>
    </div>
  );
}