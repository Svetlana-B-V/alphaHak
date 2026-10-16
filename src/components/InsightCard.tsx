import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from './Badge';
import Button from './Button';
import { sendFeedback } from '../api/client';
import { importanceBadge } from '../utils/badges';
import type { Insight, News } from '../types/api';

interface InsightCardProps {
  news: News;
  insight: Insight;
  index?: number;
}

export default function InsightCard({ news, insight, index = 0 }: InsightCardProps) {
  const [liked, setLiked] = useState<boolean | null>(null);
  const badge = importanceBadge(insight.importance_score);
  const isCritical = insight.importance_score >= 8;

  async function rate(isLike: boolean) {
    try {
      await sendFeedback({
        news_id: news.id,
        insight_id: insight.id,
        is_like: isLike,
      });
      setLiked(isLike);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      className="relative group h-full"
    >
      {/* Декоративные псевдоэлементы-кубики в оттенках фронтенда */}
      <span
        className={`absolute -top-2 left-8 w-4 h-4 rotate-12 z-20 transition-transform group-hover:rotate-45 ${
          isCritical ? 'bg-primary' : 'bg-secondary'
        }`}
      />
      <span className="absolute -bottom-2 right-10 w-3.5 h-3.5 bg-secondary/70 -rotate-12 z-20 transition-transform group-hover:-rotate-45" />

      {/* Многослойная подложка соты */}
      <div className="absolute inset-0 translate-x-2 translate-y-2.5 hex-card-shape bg-gradient-to-r from-primary/25 to-secondary/25 -z-10 transition-transform group-hover:translate-x-3.5 group-hover:translate-y-3.5" />

      {/* Основной гексагональный контейнер-сота */}
      <div
        className={`h-full p-[3px] hex-card-shape hex-drop-shadow transition-transform duration-300 group-hover:-translate-y-1 ${
          isCritical
            ? 'bg-gradient-to-r from-primary via-secondary to-primary'
            : 'bg-gradient-to-r from-secondary/60 via-primary/50 to-gray-300'
        }`}
      >
        <div className="h-full bg-white hex-card-shape px-8 py-7 sm:px-11 sm:py-8 flex flex-col justify-between">
          <div>
            {/* Верхняя строка соты с кубиками и номером */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-primary inline-block" />
                <span className="w-3 h-3 bg-secondary inline-block" />
                <span className="w-3 h-3 border border-gray-400 inline-block" />
                <span className="ml-1.5 text-[11px] font-extrabold uppercase tracking-wider text-text-hint">
                  HEX #{insight.id.toString().padStart(2, '0')}
                </span>
              </div>

              <div className="hex-badge px-3 py-1 gradient-bg text-white text-xs font-extrabold">
                {insight.importance_score}/10
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              <Badge variant={badge.variant}>✦ {badge.label}</Badge>
              <Badge variant="info">
                AI {Math.round(insight.confidence_score * 100)}%
              </Badge>
              {news.source && <Badge variant="default">{news.source}</Badge>}
            </div>

            <h3 className="text-lg md:text-xl font-extrabold font-display text-text-primary leading-snug">
              {insight.event}
            </h3>
            <p className="text-xs text-text-secondary mt-1 line-clamp-2">
              {news.title}
            </p>

            <div className="space-y-2.5 mt-4">
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-border/80">
                <div className="text-[10px] font-extrabold text-yandex-text-hint uppercase tracking-wider mb-0.5">
                  Влияние на Яндекс
                </div>
                <p className="text-xs sm:text-sm text-yandex-text-primary leading-relaxed">
                  {insight.impact}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary/8 via-secondary/8 to-secondary/15 border border-secondary/20">
                <div className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-0.5">
                  ✦ Рекомендация
                </div>
                <p className="text-xs sm:text-sm font-medium text-yandex-text-primary leading-relaxed">
                  {insight.recommendation}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap mt-4 pt-3 border-t border-gray-100">
            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant={liked === true ? 'primary' : 'ghost'}
                onClick={() => rate(true)}
              >
                👍 Полезно
              </Button>
              <Button
                size="sm"
                variant={liked === false ? 'secondary' : 'ghost'}
                onClick={() => rate(false)}
              >
                👎 Шум
              </Button>
            </div>

            <Link to={`/news/${news.id}`}>
              <Button size="sm" variant="ghost">
                <span>Детали</span>
                <span className="w-5 h-5 rounded-full bg-gray-900 text-white inline-flex items-center justify-center text-xs">
                  →
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}