import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import Navbar from '../components/Navbar';
import LiveBackground from '../components/LiveBackground';
import ConnectedStats from '../components/ConnectedStats';
import InsightCard from '../components/InsightCard';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function Dashboard() {
  const { news, loading, error } = useNews();
  const [filter, setFilter] = useState<'all' | 'critical' | 'important'>('all');
  const [layout, setLayout] = useState<'honeycomb' | 'grid'>('honeycomb');

  const allInsights = news.flatMap((item) =>
    item.insights.map((insight) => ({ news: item, insight }))
  );

  const filteredInsights = allInsights.filter(({ insight }) => {
    if (filter === 'critical') return insight.importance_score >= 8;
    if (filter === 'important') return insight.importance_score >= 5;
    return true;
  });

  // Вычисляем живую статистику для абстрактного блока (как на 3 фото)
  const criticalCount = allInsights.filter(
    ({ insight }) => insight.importance_score >= 8
  ).length;
  const avgConfidence =
    allInsights.length > 0
      ? Math.round(
          (allInsights.reduce((acc, cur) => acc + cur.insight.confidence_score, 0) /
            allInsights.length) *
            100
        )
      : 82;

  return (
    <div className="min-h-screen relative">
      <LiveBackground />
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Заголовок дашборда в стиле Young & Yandex */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="error">✦ LIVE RADAR</Badge>
              <Badge variant="info">Сотовая матрица инсайтов</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary">
              Дашборд руководителя
            </h1>
          </div>

          {/* Панель управления фильтрами и раскладкой «Пчелиные соты» */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-white/90 border border-border rounded-full p-1 flex items-center gap-1 shadow-sm">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'gradient-bg text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Все ({allInsights.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('important')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'important'
                    ? 'gradient-bg text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Без шума 5+
              </button>
              <button
                type="button"
                onClick={() => setFilter('critical')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'critical'
                    ? 'gradient-bg text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Критичные 8+ ({criticalCount})
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                setLayout((prev) => (prev === 'honeycomb' ? 'grid' : 'honeycomb'))
              }
              className="px-4 py-2 rounded-full bg-text-primary text-white text-xs font-bold hover:bg-primary transition-colors cursor-pointer shadow-sm"
            >
              {layout === 'honeycomb' ? '⬡ Вид: Пчелиные соты' : '⊞ Вид: Ровная сетка'}
            </button>
          </div>
        </div>

        {/* Состояния загрузки и ошибки */}
        {loading && (
          <Card className="text-center py-16">
            <div className="inline-block w-10 h-10 rounded-2xl gradient-bg animate-spin mb-3" />
            <p className="text-base font-bold text-text-primary">
              Загрузка сотовой матрицы инсайтов…
            </p>
          </Card>
        )}

        {error && (
          <Card className="border-rose-300 bg-rose-50/90">
            <p className="text-red-600 font-bold mb-2">
              Не удалось загрузить новости: {error}
            </p>
            <p className="text-xs text-text-secondary">
              Убедитесь, что FastAPI-бэкенд запущен на порту 8000 (`uvicorn app.main:app --reload`).
            </p>
          </Card>
        )}

        {/* Контент дашборда */}
        {!loading && !error && (
          <>
            {/* Абстрактные соединённые блоки статистики (по 3-му референсу) */}
            <ConnectedStats
              stats={[
                {
                  value: String(allInsights.length),
                  suffix: '+',
                  label: 'Активных инсайтов в ленте руководителя',
                },
                {
                  value: `${avgConfidence}%`,
                  label: 'Средняя уверенность ML-модели по текущему потоку событий',
                },
                {
                  value: String(criticalCount),
                  label: 'Критичных сигналов (важность 8–10)',
                },
              ]}
            />

            {/* Сетка в форме пчелиных сот (Honeycomb) */}
            <div
              className={
                layout === 'honeycomb'
                  ? 'honeycomb-grid mt-12'
                  : 'grid gap-6 md:grid-cols-2 mt-12'
              }
            >
              {filteredInsights.map(({ news: item, insight }, idx) => (
                <InsightCard
                  key={insight.id}
                  news={item}
                  insight={insight}
                  index={idx}
                />
              ))}
            </div>

            {filteredInsights.length === 0 && (
              <Card className="text-center py-12 mt-8">
                <p className="text-text-secondary font-medium mb-4">
                  По выбранному фильтру инсайтов не найдено.
                </p>
                <Button size="sm" variant="outline" onClick={() => setFilter('all')}>
                  Сбросить фильтр
                </Button>
              </Card>
            )}

            {/* Нижний баннер быстрого перехода к ИИ-агенту */}
            <div className="mt-16 dark-surface rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                  ✦ AI AGENT REALTIME
                </div>
                <h3 className="text-2xl font-extrabold font-display">
                  Появилась срочная новость вне ленты?
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  Отправьте текст напрямую ИИ-агенту и получите расчёт влияния на Яндекс.
                </p>
              </div>
              <Link to="/analyze">
                <Button size="lg" variant="primary">
                  Проанализировать новость →
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}