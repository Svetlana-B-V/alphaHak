import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { analyzeNews } from '../api/client';
import type { InsightDraft } from '../types/api';
import { importanceBadge } from '../components/InsightCard';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

export default function Analyze() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState<InsightDraft | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeNews({ title, content });
      setResult(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const badge = result ? importanceBadge(result.importance_score) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="glass sticky top-0 z-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm gradient-bg shadow-md">
              Я
            </div>
            <span className="text-lg font-semibold text-text-primary">
              Проверить новость (ИИ-агент)
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              ← К дашборду
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Проверить новость</CardTitle>
            <CardDescription>
              Введите заголовок и текст новости, чтобы получить персональный инсайт для Яндекса
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Заголовок новости
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ЦБ снизил ключевую ставку"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Текст новости
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Банк России снизил ключевую ставку на 100 б.п."
                  className="w-full px-4 py-2 rounded-lg border border-border bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Анализ…' : 'Проанализировать'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <p className="text-red-600 text-sm">Ошибка анализа: {error}</p>
        )}

        {result && badge && (
          <Card hoverable>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={badge.variant}>
                  {badge.label} · {result.importance_score}/10
                </Badge>
                <Badge variant="info">
                  Уверенность {Math.round(result.confidence_score * 100)}%
                </Badge>
              </div>
              <CardTitle>{result.event}</CardTitle>
              <CardDescription>{title}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-yandex-text-hint uppercase">Влияние</div>
                <p className="text-sm text-yandex-text-primary">{result.impact}</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-yandex-text-hint uppercase">Рекомендация</div>
                <p className="text-sm text-yandex-text-primary">{result.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}