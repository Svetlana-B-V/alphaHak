import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
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
      className="honeycomb-cell h-full"
    >
      <Card
        hoverable
        className={`h-full flex flex-col justify-between relative overflow-hidden ${
          isCritical ? 'ring-2 ring-primary/25' : ''
        }`}
      >
        {/* Верхняя многослойная шапка в стиле 1-го референса */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
            {/* Наклонные декоративные капсулы (как на 1 фото) */}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-5 rounded-full -skew-x-16 ${
                  isCritical ? 'bg-primary' : 'bg-secondary'
                }`}
              />
              <span className="w-2 h-5 rounded-full border border-gray-300 -skew-x-16" />
              <span className="w-2 h-5 rounded-full border border-gray-300 -skew-x-16" />
              <span className="w-2 h-5 rounded-full border border-gray-300 -skew-x-16" />
              <span className="ml-2 text-[11px] font-bold uppercase tracking-wider text-text-hint">
                CELL #{insight.id.toString().padStart(2, '0')}
              </span>
            </div>

            {/* Гексагональный бейдж скора */}
            <div className="hex-badge px-3 py-1 gradient-bg text-white text-xs font-extrabold">
              {insight.importance_score}/10
            </div>
          </div>

          <CardHeader>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant={badge.variant}>✦ {badge.label}</Badge>
              <Badge variant="info">
                AI {Math.round(insight.confidence_score * 100)}%
              </Badge>
              {news.source && <Badge variant="default">{news.source}</Badge>}
            </div>

            <CardTitle className="text-xl leading-snug">{insight.event}</CardTitle>
            <CardDescription className="line-clamp-2">{news.title}</CardDescription>
          </CardHeader>

          {/* Многослойные внутренние капсулы Влияния и Рекомендации */}
          <CardContent className="space-y-3">
            <div className="p-4 rounded-2xl bg-gray-50 border border-border/80 relative">
              <div className="text-[11px] font-extrabold text-yandex-text-hint uppercase tracking-wider mb-1">
                Влияние на Яндекс
              </div>
              <p className="text-sm text-yandex-text-primary leading-relaxed">
                {insight.impact}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/8 via-secondary/8 to-secondary/15 border border-secondary/20 relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold text-primary uppercase tracking-wider">
                  ✦ Рекомендация
                </span>
              </div>
              <p className="text-sm font-medium text-yandex-text-primary leading-relaxed">
                {insight.recommendation}
              </p>
            </div>
          </CardContent>
        </div>

        <CardFooter className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-2">
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
            <Button size="sm" variant="ghost" className="group">
              <span>Детали</span>
              <span className="w-5 h-5 rounded-full bg-gray-900 text-white inline-flex items-center justify-center text-xs group-hover:bg-primary transition-colors">
                →
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}