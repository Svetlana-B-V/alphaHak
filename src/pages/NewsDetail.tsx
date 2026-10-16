import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LiveBackground from '../components/LiveBackground';
import InsightCard from '../components/InsightCard';
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useNewsDetail } from '../hooks/useNewsDetail';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : undefined;
  const { news, loading, error } = useNewsDetail(numericId);

  return (
    <div className="min-h-screen relative">
      <LiveBackground />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-8">
        <div>
          <Link to="/dashboard">
            <Button size="sm" variant="ghost">
              ← Назад к сотам инсайтов
            </Button>
          </Link>
        </div>

        {loading && <p className="p-6 font-bold">Загрузка новости…</p>}

        {error && (
          <Card className="border-rose-300 bg-rose-50">
            <p className="text-red-600 font-bold mb-4">
              Не удалось загрузить новость: {error}
            </p>
            <Link to="/dashboard">
              <Button size="sm" variant="outline">
                К дашборду
              </Button>
            </Link>
          </Card>
        )}

        {!loading && !error && news && (
          <>
            <Card hoverable>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {news.source && <Badge variant="info">✦ {news.source}</Badge>}
                  <Badge variant="default">
                    {news.published_at
                      ? new Date(news.published_at).toLocaleString('ru-RU')
                      : new Date(news.created_at).toLocaleString('ru-RU')}
                  </Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  {news.title}
                </CardTitle>
                <CardDescription>
                  Полный текст первоисточника
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base text-text-primary leading-relaxed whitespace-pre-line">
                  {news.content}
                </p>
                {news.source_url && (
                  <a
                    href={news.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                  >
                    Перейти к оригиналу ({news.source_url}) ↗
                  </a>
                )}
              </CardContent>
            </Card>

            <section className="space-y-6">
              <h2 className="text-2xl font-extrabold font-display text-text-primary">
                Связанные инсайты ({news.insights.length})
              </h2>
              <div className="honeycomb-grid">
                {news.insights.map((insight, idx) => (
                  <InsightCard
                    key={insight.id}
                    news={news}
                    insight={insight}
                    index={idx}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}