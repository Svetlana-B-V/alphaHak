import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import InsightCard from '../components/InsightCard';
import Button from '../components/Button';

export default function Dashboard() {
  const { news, loading, error } = useNews();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass sticky top-0 z-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm gradient-bg shadow-md">
              Я
            </div>
            <span className="text-lg font-semibold text-text-primary">
              Панель руководителя
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/analyze"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              Проверить новость
            </Link>
            <Link
              to="/showcase"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              UI-Kit
            </Link>
            <Link to="/analyze">
              <Button size="sm" variant="primary">
                ИИ-Агент
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {loading && <p className="max-w-6xl mx-auto p-6">Загрузка…</p>}
      {error && (
        <p className="max-w-6xl mx-auto p-6 text-red-600">
          Не удалось загрузить новости: {error}
        </p>
      )}

      {!loading && !error && (
        <main className="max-w-6xl mx-auto px-6 py-8 grid gap-6 md:grid-cols-2">
          {news.flatMap((item) =>
            item.insights.map((insight) => (
              <InsightCard key={insight.id} news={item} insight={insight} />
            )),
          )}
        </main>
      )}
    </div>
  );
}