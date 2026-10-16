import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from './Badge';
import Button from './Button';
import { sendFeedback } from '../api/client';
import { importanceBadge } from '../utils/badges';
import type { Insight, News } from '../types/api';

export interface InsightItem {
  news: News;
  insight: Insight;
}

interface HoneycombCarouselProps {
  items: InsightItem[];
}

/* Псевдоэлемент «Кубик» (вместо пчёл на Картинках 1 и 2) */
function FloatingCube({
  className = '',
  size = 22,
  color = 'primary',
  delay = 0,
}: {
  className?: string;
  size?: number;
  color?: 'primary' | 'secondary' | 'dark';
  delay?: number;
}) {
  const fillMap = {
    primary: { top: '#FF5A87', left: '#FF3D71', right: '#E6356A' },
    secondary: { top: '#A78BFA', left: '#8B5CF6', right: '#7C3AED' },
    dark: { top: '#525252', left: '#262626', right: '#171717' },
  }[color];

  return (
    <motion.div
      animate={{
        y: [0, -10, 0, 8, 0],
        rotate: [0, 8, -6, 0],
      }}
      transition={{
        duration: 5.5,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`pointer-events-none select-none z-20 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Верхняя грань кубика */}
        <polygon points="16,2 30,9 16,16 2,9" fill={fillMap.top} />
        {/* Левая грань кубика */}
        <polygon points="2,9 16,16 16,30 2,23" fill={fillMap.left} />
        {/* Правая грань кубика */}
        <polygon points="16,16 30,9 30,23 16,30" fill={fillMap.right} />
      </svg>
    </motion.div>
  );
}

export default function HoneycombCarousel({ items }: HoneycombCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [likedMap, setLikedMap] = useState<Record<number, boolean | null>>({});

  const total = items.length;
  if (total === 0) return null;

  // Бесконечный индекс по модулю
  const getModIndex = (idx: number) => ((idx % total) + total) % total;

  const currentIdx = getModIndex(activeIndex);
  const prevIdx = getModIndex(activeIndex - 1);
  const nextIdx = getModIndex(activeIndex + 1);
  const next2Idx = getModIndex(activeIndex + 2);
  const prev2Idx = getModIndex(activeIndex - 2);

  const current = items[currentIdx];
  const prev = items[prevIdx];
  const next = items[nextIdx];
  const next2 = items[next2Idx];
  const prev2 = items[prev2Idx];

  const paginate = (step: 1 | -1) => {
    setDirection(step);
    setActiveIndex((prevVal) => prevVal + step);
  };

  async function rate(newsId: number, insightId: number, isLike: boolean) {
    try {
      await sendFeedback({
        news_id: newsId,
        insight_id: insightId,
        is_like: isLike,
      });
      setLikedMap((prevMap) => ({ ...prevMap, [insightId]: isLike }));
    } catch (e) {
      console.error(e);
    }
  }

  const badge = importanceBadge(current.insight.importance_score);
  const currentLiked = likedMap[current.insight.id] ?? null;

  return (
    <div className="relative py-6 md:py-10 select-none">
      {/* Панель управления бесконечным листанием сот */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2">
        <div className="flex items-center gap-3">
          <span className="hex-badge px-3.5 py-1.5 gradient-bg text-white text-xs font-extrabold">
            СОТА {currentIdx + 1} ИЗ {total}
          </span>
          <span className="text-xs md:text-sm text-text-secondary font-medium">
            Листайте бесконечно — следующий инсайт помещается в главную соту
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="w-11 h-11 rounded-full bg-white border-2 border-border hover:border-primary text-text-primary hover:text-primary font-extrabold flex items-center justify-center shadow-sm transition-all cursor-pointer"
            aria-label="Предыдущий инсайт"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            className="w-11 h-11 rounded-full gradient-bg text-white font-extrabold flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
            aria-label="Следующий инсайт"
          >
            →
          </button>
        </div>
      </div>

      {/* =====================================================================
          ДЕСКТОПНЫЙ КЛАСТЕР СОТ (КАРТИНКА 1 — ГОРИЗОНТАЛЬНОЕ БЕСКОНЕЧНОЕ ЛИСТАНИЕ)
          ===================================================================== */}
      <div className="hidden lg:flex items-center justify-center relative min-h-[560px] px-4 overflow-hidden">
        {/* Фоновые многослойные пустые контуры сот (как на Картинке 1) */}
        <div className="absolute left-[2%] top-[18%] w-36 h-32 hex-flat bg-primary/10 pointer-events-none" />
        <div className="absolute left-[6%] bottom-[14%] w-40 h-36 p-[2px] hex-flat bg-secondary/25 pointer-events-none">
          <div className="w-full h-full hex-flat bg-[#FAFAFA]" />
        </div>
        <div className="absolute right-[3%] top-[14%] w-40 h-36 p-[2px] hex-flat bg-primary/25 pointer-events-none">
          <div className="w-full h-full hex-flat bg-[#FAFAFA]" />
        </div>
        <div className="absolute right-[5%] bottom-[16%] w-32 h-28 hex-flat bg-secondary/12 pointer-events-none" />
        <div className="absolute left-[26%] top-[6%] w-28 h-24 hex-flat bg-primary/10 pointer-events-none" />
        <div className="absolute right-[26%] bottom-[6%] w-28 h-24 hex-flat bg-secondary/10 pointer-events-none" />

        {/* Декоративные КУБИКИ вокруг сот (вместо пчёл на Картинке 1) */}
        <FloatingCube className="absolute left-[11%] top-[12%]" size={30} color="primary" delay={0} />
        <FloatingCube className="absolute left-[19%] bottom-[10%]" size={26} color="secondary" delay={0.8} />
        <FloatingCube className="absolute left-[31%] top-[8%]" size={22} color="dark" delay={1.4} />
        <FloatingCube className="absolute right-[29%] top-[9%]" size={32} color="primary" delay={0.4} />
        <FloatingCube className="absolute right-[13%] bottom-[12%]" size={28} color="secondary" delay={1.1} />
        <FloatingCube className="absolute right-[8%] top-[28%]" size={22} color="dark" delay={1.9} />

        {/* Левая колонка малых сот (предыдущие инсайты — клик переносит в центр) */}
        <div className="flex flex-col gap-5 -mr-6 z-10 items-end">
          {/* Сота Prev-1 */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.04, x: -4 }}
            onClick={() => paginate(-1)}
            className="w-[250px] h-[220px] p-[3px] hex-flat bg-gradient-to-br from-primary/60 to-secondary/60 hex-drop-shadow cursor-pointer text-left group"
          >
            <div className="w-full h-full hex-flat bg-white/95 px-9 py-6 flex flex-col justify-between relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-secondary">
                  ← Пред. сота
                </span>
                <span className="hex-badge px-2 py-0.5 bg-gray-100 text-text-primary text-[10px] font-bold">
                  {prev.insight.importance_score}/10
                </span>
              </div>
              <div>
                <div className="text-sm font-extrabold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
                  {prev.insight.event}
                </div>
                <p className="text-[11px] text-text-secondary line-clamp-2 mt-1">
                  {prev.insight.impact}
                </p>
              </div>
              <span className="text-[10px] font-bold text-primary">
                Нажмите, чтобы открыть в центре →
              </span>
            </div>
          </motion.button>

          {/* Сота Prev-2 (смещённая по сотовой сетке) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.04, x: -4 }}
            onClick={() => paginate(-1)}
            className="w-[220px] h-[190px] mr-8 p-[2px] hex-flat bg-gradient-to-br from-secondary/40 to-primary/40 opacity-85 hover:opacity-100 cursor-pointer text-left"
          >
            <div className="w-full h-full hex-flat bg-white/90 px-8 py-5 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-text-hint uppercase">
                В очереди · {prev2.insight.importance_score}/10
              </span>
              <div className="text-xs font-extrabold text-text-primary line-clamp-2 mt-1">
                {prev2.insight.event}
              </div>
            </div>
          </motion.button>
        </div>

        {/* ============================================================
            ЦЕНТРАЛЬНАЯ ГЛАВНАЯ САМАЯ БОЛЬШАЯ МНОГОСЛОЙНАЯ СОТА
            ============================================================ */}
        <div className="relative z-20 mx-2">
          {/* Слой 1: Смещённый внешний гексагональный ореол */}
          <div className="absolute -inset-3 hex-flat bg-gradient-to-r from-primary/25 to-secondary/25 blur-sm pointer-events-none" />
          {/* Слой 2: Смещённая контурная рамка соты (эффект многослойности с Картинки 1) */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 hex-flat border-2 border-primary/40 pointer-events-none" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.insight.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 70, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -70, scale: 0.92 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) paginate(1);
                else if (info.offset.x > 50) paginate(-1);
              }}
              className="w-[570px] min-h-[480px] p-[5px] hex-flat gradient-bg hex-drop-shadow cursor-grab active:cursor-grabbing"
            >
              {/* Внутренний слой центральной соты */}
              <div className="w-full h-full min-h-[470px] hex-flat bg-white px-16 py-10 flex flex-col justify-between relative">
                {/* Верхняя плашка внутри главной соты */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Badge variant={badge.variant}>
                        ✦ {badge.label} · {current.insight.importance_score}/10
                      </Badge>
                      <Badge variant="info">
                        AI {Math.round(current.insight.confidence_score * 100)}%
                      </Badge>
                    </div>
                    {current.news.source && (
                      <Badge variant="default">{current.news.source}</Badge>
                    )}
                  </div>

                  <h2 className="text-xl md:text-2xl font-extrabold font-display text-text-primary leading-snug">
                    {current.insight.event}
                  </h2>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                    {current.news.title}
                  </p>

                  {/* Многослойные капсулы Влияния и Рекомендации внутри соты */}
                  <div className="space-y-2.5 mt-4">
                    <div className="p-3.5 rounded-2xl bg-gray-50 border border-border">
                      <div className="text-[10px] font-extrabold text-text-hint uppercase tracking-wider mb-0.5">
                        Влияние на Яндекс
                      </div>
                      <p className="text-xs md:text-sm text-text-primary leading-relaxed">
                        {current.insight.impact}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-primary/8 via-secondary/10 to-secondary/15 border border-secondary/25">
                      <div className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-0.5">
                        ✦ Рекомендация руководителю
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-text-primary leading-relaxed">
                        {current.insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Нижние кнопки оценки и перехода */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 mt-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={currentLiked === true ? 'primary' : 'ghost'}
                      onClick={() =>
                        rate(current.news.id, current.insight.id, true)
                      }
                    >
                      👍 Полезно
                    </Button>
                    <Button
                      size="sm"
                      variant={currentLiked === false ? 'secondary' : 'ghost'}
                      onClick={() =>
                        rate(current.news.id, current.insight.id, false)
                      }
                    >
                      👎 Шум
                    </Button>
                  </div>

                  <Link to={`/news/${current.news.id}`}>
                    <Button size="sm" variant="outline">
                      Полный отчёт →
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Правая колонка малых сот (следующие инсайты — клик переносит в центр) */}
        <div className="flex flex-col gap-5 -ml-6 z-10 items-start">
          {/* Сота Next-1 */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.04, x: 4 }}
            onClick={() => paginate(1)}
            className="w-[260px] h-[225px] p-[3px] hex-flat bg-gradient-to-br from-secondary to-primary hex-drop-shadow cursor-pointer text-left group"
          >
            <div className="w-full h-full hex-flat bg-white/95 px-9 py-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  След. сота →
                </span>
                <span className="hex-badge px-2 py-0.5 gradient-bg text-white text-[10px] font-bold">
                  {next.insight.importance_score}/10
                </span>
              </div>
              <div>
                <div className="text-sm font-extrabold text-text-primary line-clamp-2 group-hover:text-secondary transition-colors">
                  {next.insight.event}
                </div>
                <p className="text-[11px] text-text-secondary line-clamp-2 mt-1">
                  {next.insight.impact}
                </p>
              </div>
              <span className="text-[10px] font-bold text-secondary">
                Кликните для вывода на главный план →
              </span>
            </div>
          </motion.button>

          {/* Сота Next-2 */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.04, x: 4 }}
            onClick={() => paginate(1)}
            className="w-[225px] h-[195px] ml-8 p-[2px] hex-flat bg-gradient-to-br from-primary/50 to-secondary/50 opacity-85 hover:opacity-100 cursor-pointer text-left"
          >
            <div className="w-full h-full hex-flat bg-white/90 px-8 py-5 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-text-hint uppercase">
                Далее · {next2.insight.importance_score}/10
              </span>
              <div className="text-xs font-extrabold text-text-primary line-clamp-2 mt-1">
                {next2.insight.event}
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* =====================================================================
          МОБИЛЬНЫЙ И ПЛАНШЕТНЫЙ КЛАСТЕР СОТ (КАРТИНКА 2 — ВЕРТИКАЛЬНЫЕ СОТЫ)
          ===================================================================== */}
      <div className="lg:hidden flex flex-col items-center relative py-4 px-2">
        {/* Декоративные кубики для мобильной сотовой ветки (вместо пчёл на Картинке 2) */}
        <FloatingCube className="absolute left-3 top-6" size={24} color="primary" delay={0.2} />
        <FloatingCube className="absolute right-4 top-28" size={22} color="secondary" delay={0.9} />
        <FloatingCube className="absolute left-4 bottom-24" size={22} color="dark" delay={1.5} />
        <FloatingCube className="absolute right-3 bottom-6" size={26} color="primary" delay={0.5} />

        {/* Верхние малые переплетающиеся соты (как на Картинке 2) */}
        <div className="flex items-center justify-center gap-3 -mb-5 z-10 w-full max-w-sm">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="w-40 h-36 p-[2.5px] hex-pointy bg-gradient-to-b from-primary to-secondary shadow-md text-center cursor-pointer"
          >
            <div className="w-full h-full hex-pointy bg-white/95 px-4 py-6 flex flex-col items-center justify-center">
              <span className="text-[10px] font-extrabold text-primary uppercase">
                ← Пред. ({prev.insight.importance_score}/10)
              </span>
              <span className="text-xs font-bold text-text-primary line-clamp-2 mt-1">
                {prev.insight.event}
              </span>
            </div>
          </button>

          <div className="w-24 h-24 hex-pointy bg-secondary/15 border border-secondary/30 flex items-center justify-center text-xs font-extrabold text-secondary mt-6">
            #{currentIdx + 1}/{total}
          </div>
        </div>

        {/* Центральная большая вертикальная сота на мобильном (Картинка 2) */}
        <div className="w-full max-w-md relative z-20 my-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.insight.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) paginate(1);
                else if (info.offset.x > 40) paginate(-1);
              }}
              className="p-[4px] hex-card-mobile-pointy gradient-bg hex-drop-shadow"
            >
              <div className="w-full hex-card-mobile-pointy bg-white px-6 py-12 sm:px-10 flex flex-col justify-between space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <Badge variant={badge.variant}>
                    ✦ {badge.label} · {current.insight.importance_score}/10
                  </Badge>
                  <Badge variant="info">
                    AI {Math.round(current.insight.confidence_score * 100)}%
                  </Badge>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold font-display text-center text-text-primary">
                  {current.insight.event}
                </h3>
                <p className="text-xs text-text-secondary text-center">
                  {current.news.title}
                </p>

                <div className="p-3 rounded-2xl bg-gray-50 border border-border text-xs">
                  <div className="font-extrabold text-text-hint uppercase mb-0.5">
                    Влияние
                  </div>
                  <p className="text-text-primary">{current.insight.impact}</p>
                </div>

                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/15 border border-secondary/20 text-xs">
                  <div className="font-extrabold text-primary uppercase mb-0.5">
                    ✦ Рекомендация
                  </div>
                  <p className="text-text-primary font-medium">
                    {current.insight.recommendation}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <Button
                    size="sm"
                    variant={currentLiked === true ? 'primary' : 'ghost'}
                    onClick={() => rate(current.news.id, current.insight.id, true)}
                  >
                    👍
                  </Button>
                  <Button
                    size="sm"
                    variant={currentLiked === false ? 'secondary' : 'ghost'}
                    onClick={() => rate(current.news.id, current.insight.id, false)}
                  >
                    👎
                  </Button>
                  <Link to={`/news/${current.news.id}`}>
                    <Button size="sm" variant="outline">
                      Детали →
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Нижние переплетающиеся соты (как в нижней части Картинки 2) */}
        <div className="flex items-center justify-center gap-3 -mt-5 z-10 w-full max-w-sm">
          <div className="w-24 h-24 hex-pointy bg-primary/12 border border-primary/30 flex items-center justify-center text-[11px] font-extrabold text-primary -mt-6">
            AI {Math.round( next.insight.confidence_score * 100 )}%
          </div>

          <button
            type="button"
            onClick={() => paginate(1)}
            className="w-44 h-38 p-[2.5px] hex-pointy bg-gradient-to-b from-secondary to-primary shadow-md text-center cursor-pointer"
          >
            <div className="w-full h-full hex-pointy bg-white/95 px-4 py-6 flex flex-col items-center justify-center">
              <span className="text-[10px] font-extrabold text-secondary uppercase">
                След. сота ({next.insight.importance_score}/10) →
              </span>
              <span className="text-xs font-bold text-text-primary line-clamp-2 mt-1">
                {next.insight.event}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}