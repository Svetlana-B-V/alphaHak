// Типы ответов нашего бэкенда. Совпадают со Swagger: http://127.0.0.1:8000/docs

export interface Insight {
  id: number;
  news_id: number;
  event: string;            // что произошло
  impact: string;           // как влияет на Яндекс
  recommendation: string;   // что делать
  importance_score: number; // 1..10, где 1 — шум, 10 — критично
  confidence_score: number; // 0..1, уверенность ИИ
  created_at: string;       // дата в формате ISO
}

export interface News {
  id: number;
  title: string;
  content: string;
  source: string | null;
  source_url: string | null;
  published_at: string | null;
  created_at: string;
  insights: Insight[];
}

export interface FeedbackIn {
  news_id: number;
  insight_id?: number | null;
  is_like: boolean;
}

export interface FeedbackOut extends FeedbackIn {
  id: number;
  created_at: string;
}

// ИИ-агент: что отправляем и что получаем
export interface AnalyzeIn {
  title: string;
  content: string;
}

export interface InsightDraft {
  event: string;
  impact: string;
  recommendation: string;
  importance_score: number;
  confidence_score: number;
}