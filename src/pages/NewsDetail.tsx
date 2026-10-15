import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNewsById } from '../api/client';
import type { News } from '../types/api';
import InsightCard from '../components/InsightCard';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getNewsById(Number(id))
      .then(setNews)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="glass sticky top-0 z-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm gradient-bg shadow-md">
              Я
            </div>
            <span className="text-lg font-semibold text-text-primary">
              Детали новости
            </span>
          </Link>
          <Link
            to="/dashboard"
            className="text-sm text-text-secondary hover:text-primary transition-colors"
          >
            ← Назад к дашборду
          </Link>
        </div>
      </header>

      {loading && <p className="max-w-6xl mx-auto p-6">Загрузка…</p>}
      {error && (
        <div className="max-w-6xl mx-auto p-6 space-y-4">
          <p className="text-red-600">Не удалось загрузить новость: {error}</p>
          <Link to="/dashboard">
            <Button size="sm" variant="outline">К дашборду</Button>
          </Link>
        </div>
      )}

      {!loading && !error && news && (
        <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{news.title}</CardTitle>
              <CardDescription>
                {news.source && `${news.source} · `}
                {news.published_at
                  ? new Date(news.published_at).toLocaleString('ru-RU')
                  : new Date(news.created_at).toLocaleString('ru-RU')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-text-primary whitespace-pre-line">
                {news.content}
              </p>
              {news.source_url && (
                <a
                  href={news.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm text-primary hover:underline"
                >
                  Источник: {news.source_url}
                </a>
              )}
            </CardContent>
          </Card>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Инсайты по новости
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {news.insights.map((insight) => (
                <InsightCard key={insight.id} news={news} insight={insight} />
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}