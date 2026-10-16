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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      className="relative pt-6 h-full group"
    >
      {/* ПРАВИЛЬНАЯ СОТА ОЦЕНКИ В ПРАВОМ ВЕРХНЕМ УГЛУ — НАПОЛОВИНУ ВЫЕЗЖАЕТ НАД КАРТОЧКОЙ НА ПЕРЕДНЕМ ПЛАНЕ */}
      <div className="absolute top-0 right-6 z-30 w-16 h-14 hex-drop-shadow transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <svg className="w-full h-full" viewBox="0 0 200 174" fill="none">
          <defs>
            <linearGradient id={`scoreHexGrad-${insight.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3D71" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {/* Внешний белый контур для отделения от границы карточки */}
          <polygon
            points="50,3 150,3 197,87 150,171 50,171 3,87"
            fill={`url(#scoreHexGrad-${insight.id})`}
            stroke="#FFFFFF"
            strokeWidth="8"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white leading-none">
          <span className="text-sm font-extrabold font-display">
            {insight.importance_score}/10
          </span>
        </div>
      </div>

      {/* Прямоугольная карточка со скруглением углов (как было раньше) */}
      <Card
        hoverable
        className={`h-full flex flex-col justify-between relative ${
          isCritical ? 'ring-2 ring-primary/25' : ''
        }`}
      >
        <div>
          {/* Верхняя строка с декоративными кубиками */}
          <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-gray-100 pr-16">
            <span className="w-3 h-3 bg-primary inline-block rounded-[2px]" />
            <span className="w-3 h-3 bg-secondary inline-block rounded-[2px]" />
            <span className="w-3 h-3 border border-gray-300 inline-block rounded-[2px]" />
            <span className="ml-1.5 text-[11px] font-extrabold uppercase tracking-wider text-text-hint">
              INSIGHT #{insight.id.toString().padStart(2, '0')}
            </span>
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

          <CardContent className="space-y-3">
            <div className="p-4 rounded-2xl bg-gray-50 border border-border/80">
              <div className="text-[11px] font-extrabold text-yandex-text-hint uppercase tracking-wider mb-1">
                Влияние на Яндекс
              </div>
              <p className="text-sm text-yandex-text-primary leading-relaxed">
                {insight.impact}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/8 via-secondary/8 to-secondary/15 border border-secondary/20">
              <div className="text-[11px] font-extrabold text-primary uppercase tracking-wider mb-1">
                ✦ Рекомендация
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
            <Button size="sm" variant="ghost" className="group/btn">
              <span>Детали</span>
              <span className="w-5 h-5 rounded-full bg-gray-900 text-white inline-flex items-center justify-center text-xs group-hover/btn:bg-primary transition-colors">
                →
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}