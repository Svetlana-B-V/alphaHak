import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import Navbar from '../components/Navbar';
import LiveBackground from '../components/LiveBackground';
import ConnectedStats from '../components/ConnectedStats';
import HoneycombCarousel from '../components/HoneycombCarousel';
import InsightCard from '../components/InsightCard';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function Dashboard() {
  const { news, loading, error } = useNews();
  const [filter, setFilter] = useState<'all' | 'critical' | 'important'>('all');

  const allInsights = news.flatMap((item) =>
    item.insights.map((insight) => ({ news: item, insight }))
  );

  const filteredInsights = allInsights.filter(({ insight }) => {
    if (filter === 'critical') return insight.importance_score >= 8;
    if (filter === 'important') return insight.importance_score >= 5;
    return true;
  });

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
        {/* Шапка дашборда и фильтры */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="error">✦ LIVE HONEYCOMB</Badge>
              <Badge variant="info">Сотовый кластер инсайтов</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary">
              Соты руководителя
            </h1>
          </div>

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
                Важные 5+
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
          </div>
        </div>

        {loading && (
          <Card className="text-center py-16">
            <div className="inline-block w-10 h-10 hex-flat gradient-bg animate-spin mb-3" />
            <p className="text-base font-bold text-text-primary">
              Сборка пчелиных сот с инсайтами…
            </p>
          </Card>
        )}

        {error && (
          <Card className="border-rose-300 bg-rose-50/90">
            <p className="text-red-600 font-bold mb-2">
              Не удалось загрузить новости: {error}
            </p>
            <p className="text-xs text-text-secondary">
              Проверьте, что FastAPI-бэкенд запущен на порту 8000 (`uvicorn app.main:app --reload`).
            </p>
          </Card>
        )}

        {!loading && !error && (
          <>
            {/* 1. ГЛАВНЫЙ КЛАСТЕР ПЧЕЛИНЫХ СОТ С БЕСКОНЕЧНЫМ ЛИСТАНИЕМ (Картинка 1 на ПК / Картинка 2 на телефоне) */}
            {filteredInsights.length > 0 ? (
              <HoneycombCarousel items={filteredInsights} />
            ) : (
              <Card className="text-center py-12 my-6">
                <p className="text-text-secondary font-medium mb-4">
                  По выбранному фильтру инсайтов не найдено.
                </p>
                <Button size="sm" variant="outline" onClick={() => setFilter('all')}>
                  Показать все соты
                </Button>
              </Card>
            )}

            {/* 2. СОТОВЫЕ БЛОКИ СТАТИСТИКИ С КРУГЛЫМИ СОЕДИНИТЕЛЯМИ (Картинки 3, 4, 5) */}
            <ConnectedStats
              stats={[
                {
                  value: String(allInsights.length),
                  suffix: '+',
                  label: 'Активных инсайтов в сотовой матрице руководителя',
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

            {/* 3. ВСЕ ИНСАЙТЫ В ВИДЕ СОТОВОЙ СЕТКИ */}
            {filteredInsights.length > 0 && (
              <section className="mt-14">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-text-primary">
                    Все соты потока ({filteredInsights.length})
                  </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {filteredInsights.map(({ news: item, insight }, idx) => (
                    <div
                      key={insight.id}
                      className={idx % 2 === 1 ? 'md:translate-y-10' : ''}
                    >
                      <InsightCard news={item} insight={insight} index={idx} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Нижний баннер быстрого перехода к ИИ-агенту */}
            <div className="mt-20 p-[3px] hex-card-shape gradient-bg hex-drop-shadow-dark">
              <div className="dark-surface hex-card-shape px-8 py-8 md:px-14 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                    ✦ AI AGENT REALTIME
                  </div>
                  <h3 className="text-2xl font-extrabold font-display">
                    Хотите добавить новую соту из своей новости?
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
            </div>
          </>
        )}
      </main>
    </div>
  );
}