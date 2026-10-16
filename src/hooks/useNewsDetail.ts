import { useEffect, useState } from 'react';
import { getNewsById } from '../api/client';
import type { News } from '../types/api';

interface UseNewsDetailResult {
  news: News | null;
  loading: boolean;
  error: string | null;
}

export function useNewsDetail(id: number | undefined): UseNewsDetailResult {
  const invalidId = id === undefined || Number.isNaN(id);

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(!invalidId);
  const [error, setError] = useState<string | null>(
    invalidId ? 'Некорректный идентификатор новости' : null,
  );

  useEffect(() => {
    if (invalidId || id === undefined) return;

    let cancelled = false;

    // Сбрасываем состояние асинхронно — при смене id
    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
    });

    getNewsById(id)
      .then((data) => {
        if (!cancelled) setNews(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, invalidId]);

  return { news, loading, error };
}