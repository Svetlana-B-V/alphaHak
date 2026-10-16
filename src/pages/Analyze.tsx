import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeNews } from '../api/client';
import type { InsightDraft } from '../types/api';
import { importanceBadge } from '../utils/badges';
import Navbar from '../components/Navbar';
import LiveBackground from '../components/LiveBackground';
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/Card';
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

  function applyPreset(presetTitle: string, presetContent: string) {
    setTitle(presetTitle);
    setContent(presetContent);
  }

  const badge = result ? importanceBadge(result.importance_score) : null;

  return (
    <div className="min-h-screen relative">
      <LiveBackground />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8">
        <div>
          <Badge variant="info" className="mb-2">✦ AI AGENT</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary">
            Проверить новость
          </h1>
          <p className="text-text-secondary mt-2">
            Отправьте заголовок и текст новости — ИИ-агент мгновенно сформирует персональный инсайт для Яндекса
          </p>
        </div>

        <Card hoverable>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <CardTitle>Ввод параметров события</CardTitle>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    applyPreset(
                      'ЦБ снизил ключевую ставку',
                      'Банк России снизил ключевую ставку на 100 б.п. на фоне замедления инфляции.'
                    )
                  }
                >
                  Пример: Ставка ЦБ
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    applyPreset(
                      'Ужесточение штрафов за утечки',
                      'Приняты поправки об увеличении штрафов за утечку персональных данных.'
                    )
                  }
                >
                  Пример: Персональные данные
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    applyPreset(
                      'Задержка поставок оборудования',
                      'Поставщики предупредили о рисках задержки отгрузки серверов.'
                    )
                  }
                >
                  Пример: Серверы
                </Button>
              </div>
            </div>
            <CardDescription>
              Нажмите на готовый пример выше или введите собственный текст
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-primary mb-1.5">
                  Заголовок новости
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: ЦБ снизил ключевую ставку"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-gray-50/80 text-sm text-text-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary mb-1.5">
                  Текст новости
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Банк России снизил ключевую ставку на 100 б.п..."
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-gray-50/80 text-sm text-text-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={loading}>
                {loading ? 'Анализируем…' : '✦ Проанализировать новость'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-rose-300 bg-rose-50">
            <p className="text-red-600 text-sm font-bold">Ошибка анализа: {error}</p>
          </Card>
        )}

        {result && badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card hoverable className="ring-2 ring-secondary/30">
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={badge.variant}>
                      ✦ {badge.label} · {result.importance_score}/10
                    </Badge>
                    <Badge variant="info">
                      Уверенность {Math.round(result.confidence_score * 100)}%
                    </Badge>
                  </div>
                  <div className="hex-badge px-3 py-1 gradient-bg text-white text-xs font-extrabold">
                    AI RESULT
                  </div>
                </div>
                <CardTitle className="text-2xl">{result.event}</CardTitle>
                <CardDescription>{title}</CardDescription>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-border">
                  <div className="text-xs font-extrabold text-yandex-text-hint uppercase mb-1">
                    Влияние на Яндекс
                  </div>
                  <p className="text-sm text-yandex-text-primary leading-relaxed">
                    {result.impact}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/15 border border-secondary/20">
                  <div className="text-xs font-extrabold text-primary uppercase mb-1">
                    ✦ Рекомендация
                  </div>
                  <p className="text-sm font-medium text-yandex-text-primary leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}