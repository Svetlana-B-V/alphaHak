import type { AnalyzeIn, FeedbackIn, FeedbackOut, InsightDraft, News } from '../types/api';

// Благодаря proxy в vite.config.ts хватает короткого адреса
const BASE_URL = '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Ошибка API ${response.status}: ${await response.text()}`);
  }
  return response.json() as Promise<T>;
}

export function getNews(): Promise<News[]> {
  return request<News[]>('/news');
}

export function getNewsById(id: number): Promise<News> {
  return request<News>(`/news/${id}`);
}

export function sendFeedback(data: FeedbackIn): Promise<FeedbackOut> {
  return request<FeedbackOut>('/feedback', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function analyzeNews(data: AnalyzeIn): Promise<InsightDraft> {
  return request<InsightDraft>('/analyze', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}