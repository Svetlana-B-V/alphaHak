import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import Badge from './Badge';
import Button from './Button';
import { sendFeedback } from '../api/client';
import type { Insight, News } from '../types/api';

export function importanceBadge(score: number) {
  if (score >= 8) return { variant: 'error' as const, label: 'Критично' };
  if (score >= 5) return { variant: 'warning' as const, label: 'Важно' };
  return { variant: 'default' as const, label: 'Низкая важность' };
}

interface InsightCardProps {
  news: News;
  insight: Insight;
}

export default function InsightCard({ news, insight }: InsightCardProps) {
  // Бэкенд пока не сохраняет лайки, поэтому помним их здесь
  const [liked, setLiked] = useState<boolean | null>(null);
  const badge = importanceBadge(insight.importance_score);

  async function rate(isLike: boolean) {
    try {
      await sendFeedback({ news_id: news.id, insight_id: insight.id, is_like: isLike });
      setLiked(isLike);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card hoverable>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={badge.variant}>
            {badge.label} · {insight.importance_score}/10
          </Badge>
          <Badge variant="info">
            Уверенность {Math.round(insight.confidence_score * 100)}%
          </Badge>
        </div>
        <CardTitle>{insight.event}</CardTitle>
        <CardDescription>
          {news.title}
          {news.source && ` · ${news.source}`}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <div className="text-xs font-semibold text-yandex-text-hint uppercase">Влияние</div>
          <p className="text-sm text-yandex-text-primary">{insight.impact}</p>
        </div>
        <div>
          <div className="text-xs font-semibold text-yandex-text-hint uppercase">Рекомендация</div>
          <p className="text-sm text-yandex-text-primary">{insight.recommendation}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button size="sm" variant={liked === true ? 'primary' : 'ghost'} onClick={() => rate(true)}>
            👍 Полезно
          </Button>
          <Button size="sm" variant={liked === false ? 'secondary' : 'ghost'} onClick={() => rate(false)}>
            👎 Не полезно
          </Button>
        </div>
        <Link to={`/news/${news.id}`}>
          <Button size="sm" variant="ghost">
            Подробнее →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}