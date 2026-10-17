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

/* Псевдоэлемент «Кубик» в оттенках палитры (вместо пчёл на Рисунке 3) */
function FloatingCube({
  className = '',
  size = 24,
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
        y: [0, -9, 0, 7, 0],
        rotate: [0, 8, -6, 0],
      }}
      transition={{
        duration: 5.5,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`pointer-events-none select-none z-30 ${className}`}
    >
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <polygon points="16,2 30,9 16,16 2,9" fill={fillMap.top} />
        <polygon points="2,9 16,16 16,30 2,23" fill={fillMap.left} />
        <polygon points="16,16 30,9 30,23 16,30" fill={fillMap.right} />
      </svg>
    </motion.div>
  );
}

/* Декоративная пустая правильная сота (рамка или блик, как на Рисунке 3) */
function DecorativeHex({
  className = '',
  size = 150,
  variant = 'outline-primary',
}: {
  className?: string;
  size?: number;
  variant?: 'outline-primary' | 'outline-secondary' | 'glow-primary' | 'glow-secondary' | 'double';
}) {
  const height = Math.round(size * 0.866);
  return (
    <div
      style={{ width: size, height }}
      className={`pointer-events-none select-none absolute ${className}`}
    >
      <svg width="100%" height="100%" viewBox="0 0 200 174" fill="none">
        {variant === 'outline-primary' && (
          <polygon
            points="50,4 150,4 196,87 150,170 50,170 4,87"
            stroke="#FF3D71"
            strokeOpacity="0.35"
            strokeWidth="4"
          />
        )}
        {variant === 'outline-secondary' && (
          <polygon
            points="50,4 150,4 196,87 150,170 50,170 4,87"
            stroke="#8B5CF6"
            strokeOpacity="0.35"
            strokeWidth="4"
          />
        )}
        {variant === 'glow-primary' && (
          <polygon
            points="50,4 150,4 196,87 150,170 50,170 4,87"
            fill="#FF3D71"
            fillOpacity="0.10"
            stroke="#FF3D71"
            strokeOpacity="0.25"
            strokeWidth="2.5"
          />
        )}
        {variant === 'glow-secondary' && (
          <polygon
            points="50,4 150,4 196,87 150,170 50,170 4,87"
            fill="#8B5CF6"
            fillOpacity="0.10"
            stroke="#8B5CF6"
            strokeOpacity="0.25"
            strokeWidth="2.5"
          />
        )}
        {variant === 'double' && (
          <>
            <polygon
              points="50,4 150,4 196,87 150,170 50,170 4,87"
              stroke="#FF3D71"
              strokeOpacity="0.45"
              strokeWidth="4"
            />
            <polygon
              points="60,22 140,22 180,87 140,152 60,152 20,87"
              fill="#8B5CF6"
              fillOpacity="0.12"
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default function HoneycombCarousel({ items }: HoneycombCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [likedMap, setLikedMap] = useState<Record<number, boolean | null>>({});

  const total = items.length;
  if (total === 0) return null;

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

  const goToIndex = (targetIdx: number) => {
    if (targetIdx === currentIdx) return;
    setDirection(targetIdx > currentIdx ? 1 : -1);
    setActiveIndex(targetIdx);
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
    <div className="relative py-4 select-none w-full">
      {/* =====================================================================
          ДЕСКТОПНЫЙ ПОЛНОШИРИННЫЙ УЗОР ПРАВИЛЬНЫХ СОТ (КАК НА РИСУНКЕ 3)
          ===================================================================== */}
      <div className="hidden lg:flex items-center justify-center relative min-h-[600px] w-full overflow-visible">
        {/* Левое крыло декоративных пустых сот-рамок и бликов (заполняет всё пространство слева) */}
        <DecorativeHex className="-left-10 top-[38%]" size={135} variant="outline-primary" />
        <DecorativeHex className="left-[2%] top-[20%]" size={155} variant="glow-secondary" />
        <DecorativeHex className="left-[4%] bottom-[16%]" size={165} variant="double" />
        <DecorativeHex className="left-[13%] top-[8%]" size={140} variant="outline-secondary" />
        <DecorativeHex className="left-[15%] bottom-[6%]" size={130} variant="glow-primary" />
        <DecorativeHex className="left-[27%] top-[4%]" size={120} variant="outline-primary" />
        <DecorativeHex className="left-[29%] bottom-[4%]" size={130} variant="glow-secondary" />

        {/* Правое крыло декоративных пустых сот-рамок и бликов (заполняет всё пространство справа) */}
        <DecorativeHex className="right-[28%] top-[4%]" size={130} variant="glow-primary" />
        <DecorativeHex className="right-[27%] bottom-[4%]" size={125} variant="outline-secondary" />
        <DecorativeHex className="right-[14%] top-[7%]" size={145} variant="double" />
        <DecorativeHex className="right-[15%] bottom-[7%]" size={135} variant="outline-primary" />
        <DecorativeHex className="right-[3%] top-[19%]" size={165} variant="glow-primary" />
        <DecorativeHex className="right-[4%] bottom-[17%]" size={150} variant="outline-secondary" />
        <DecorativeHex className="-right-10 top-[40%]" size={135} variant="glow-secondary" />

        {/* Кубики в оттенках палитры (вместо пчёл на Рисунке 3) */}
        <FloatingCube className="absolute left-[5%] top-[14%]" size={30} color="primary" delay={0} />
        <FloatingCube className="absolute left-[12%] bottom-[12%]" size={26} color="secondary" delay={0.8} />
        <FloatingCube className="absolute left-[26%] top-[11%]" size={24} color="dark" delay={1.4} />
        <FloatingCube className="absolute right-[25%] top-[10%]" size={30} color="primary" delay={0.4} />
        <FloatingCube className="absolute right-[11%] bottom-[13%]" size={28} color="secondary" delay={1.1} />
        <FloatingCube className="absolute right-[4%] top-[30%]" size={24} color="dark" delay={1.9} />

        {/* ЛЕВАЯ КОЛОНКА ИНТЕРАКТИВНЫХ ПРАВИЛЬНЫХ СОТ */}
        <div className="flex flex-col items-end gap-3 -mr-6 z-10">
          {/* Верхняя левая правильная сота (Prev) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, x: -4 }}
            onClick={() => paginate(-1)}
            className="relative w-[270px] h-[234px] hex-drop-shadow cursor-pointer text-center group"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
              <polygon
                points="50,4 150,4 196,87 150,170 50,170 4,87"
                fill="#FFFFFF"
                fillOpacity="0.95"
                stroke="#FF3D71"
                strokeWidth="4"
              />
              <polygon
                points="56,14 144,14 186,87 144,160 56,160 14,87"
                stroke="#8B5CF6"
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />
            </svg>

            {/* Текст строго в безопасной центральной области правильной соты */}
            <div className="relative z-10 w-full h-full px-[23%] py-[16%] flex flex-col items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-primary text-[10px] font-extrabold uppercase">
                ← Сота · {prev.insight.importance_score}/10
              </span>

              <div>
                <div className="text-xs font-extrabold text-text-primary line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {prev.insight.event}
                </div>
                <p className="text-[11px] text-text-secondary line-clamp-2 mt-1 leading-tight">
                  {prev.insight.impact}
                </p>
              </div>

              <span className="text-[10px] font-bold text-secondary">
                В центр →
              </span>
            </div>
          </motion.button>

          {/* Нижняя левая правильная сота (Prev-2, смещена по сотовой сетке) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, x: -4 }}
            onClick={() => paginate(-1)}
            className="relative w-[230px] h-[199px] mr-10 hex-drop-shadow cursor-pointer text-center opacity-90 hover:opacity-100"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
              <polygon
                points="50,4 150,4 196,87 150,170 50,170 4,87"
                fill="#FFFFFF"
                fillOpacity="0.9"
                stroke="#8B5CF6"
                strokeOpacity="0.55"
                strokeWidth="3.5"
              />
            </svg>

            <div className="relative z-10 w-full h-full px-[24%] py-[18%] flex flex-col items-center justify-center">
              <span className="text-[10px] font-extrabold text-secondary uppercase mb-1">
                В очереди · {prev2.insight.importance_score}/10
              </span>
              <div className="text-xs font-bold text-text-primary line-clamp-2 leading-snug">
                {prev2.insight.event}
              </div>
            </div>
          </motion.button>
        </div>

        {/* ============================================================
            ЦЕНТРАЛЬНАЯ ГЛАВНАЯ ПРАВИЛЬНАЯ СОТА (600x520)
            ============================================================ */}
        <div className="relative z-20 mx-1">
          {/* Многослойные внешние контуры вокруг главной соты (как на Рисунке 3) */}
          <svg
            className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
            viewBox="0 0 200 174"
            fill="none"
          >
            <polygon
              points="50,2 150,2 198,87 150,172 50,172 2,87"
              stroke="#FF3D71"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
          </svg>
          <svg
            className="absolute inset-0 w-full h-full translate-x-3.5 translate-y-3.5 pointer-events-none"
            viewBox="0 0 200 174"
            fill="none"
          >
            <polygon
              points="50,3 150,3 197,87 150,171 50,171 3,87"
              stroke="#8B5CF6"
              strokeOpacity="0.45"
              strokeWidth="3"
            />
          </svg>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.insight.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -80, scale: 0.9 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) paginate(1);
                else if (info.offset.x > 50) paginate(-1);
              }}
              className="relative w-[600px] h-[520px] hex-drop-shadow cursor-grab active:cursor-grabbing"
            >
              {/* Правильный 6-угольник (SVG-фон с толстой градиентной рамкой и внутренним контуром) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
                <defs>
                  <linearGradient id="mainHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF3D71" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <polygon
                  points="50,3 150,3 197,87 150,171 50,171 3,87"
                  fill="#FFFFFF"
                  stroke="url(#mainHexGrad)"
                  strokeWidth="4.5"
                />
                <polygon
                  points="54,10 146,10 190,87 146,164 54,164 10,87"
                  stroke="url(#mainHexGrad)"
                  strokeOpacity="0.22"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Контент главной соты — строго в центральной безопасной зоне 6-угольника (px-[22%] py-[11%]) */}
              <div className="relative z-10 w-full h-full px-[21%] py-[10%] flex flex-col justify-between text-center">
                {/* Верхние бейджи */}
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <Badge variant={badge.variant}>
                    ✦ {badge.label} · {current.insight.importance_score}/10
                  </Badge>
                  <Badge variant="info">
                    AI {Math.round(current.insight.confidence_score * 100)}%
                  </Badge>
                  {current.news.source && (
                    <Badge variant="default">{current.news.source}</Badge>
                  )}
                </div>

                {/* Заголовок и новость */}
                <div>
                  <h2 className="text-lg xl:text-xl font-extrabold font-display text-text-primary leading-snug">
                    {current.insight.event}
                  </h2>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-1">
                    {current.news.title}
                  </p>
                </div>

                {/* Капсулы Влияния и Рекомендации */}
                <div className="space-y-2 text-left">
                  <div className="p-3 rounded-2xl bg-gray-50 border border-border">
                    <div className="text-[10px] font-extrabold text-text-hint uppercase tracking-wider mb-0.5">
                      Влияние на Яндекс
                    </div>
                    <p className="text-xs text-text-primary leading-relaxed line-clamp-3">
                      {current.insight.impact}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-gradient-to-r from-primary/8 via-secondary/10 to-secondary/15 border border-secondary/25">
                    <div className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-0.5">
                      ✦ Рекомендация руководителю
                    </div>
                    <p className="text-xs font-semibold text-text-primary leading-relaxed line-clamp-3">
                      {current.insight.recommendation}
                    </p>
                  </div>
                </div>

                {/* Кнопки лайка и отчёта */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <Button
                    size="sm"
                    variant={currentLiked === true ? 'primary' : 'ghost'}
                    onClick={() => rate(current.news.id, current.insight.id, true)}
                  >
                    👍 Полезно
                  </Button>
                  <Button
                    size="sm"
                    variant={currentLiked === false ? 'secondary' : 'ghost'}
                    onClick={() => rate(current.news.id, current.insight.id, false)}
                  >
                    👎 Шум
                  </Button>
                  <Link to={`/news/${current.news.id}`}>
                    <Button size="sm" variant="outline">
                      Отчёт →
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ПРАВАЯ КОЛОНКА ИНТЕРАКТИВНЫХ ПРАВИЛЬНЫХ СОТ */}
        <div className="flex flex-col items-start gap-3 -ml-6 z-10">
          {/* Верхняя правая правильная сота (Next) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, x: 4 }}
            onClick={() => paginate(1)}
            className="relative w-[270px] h-[234px] hex-drop-shadow cursor-pointer text-center group"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
              <polygon
                points="50,4 150,4 196,87 150,170 50,170 4,87"
                fill="#FFFFFF"
                fillOpacity="0.95"
                stroke="#8B5CF6"
                strokeWidth="4"
              />
              <polygon
                points="56,14 144,14 186,87 144,160 56,160 14,87"
                stroke="#FF3D71"
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />
            </svg>

            <div className="relative z-10 w-full h-full px-[23%] py-[16%] flex flex-col items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-violet-50 text-secondary text-[10px] font-extrabold uppercase">
                След. · {next.insight.importance_score}/10 →
              </span>

              <div>
                <div className="text-xs font-extrabold text-text-primary line-clamp-2 group-hover:text-secondary transition-colors leading-snug">
                  {next.insight.event}
                </div>
                <p className="text-[11px] text-text-secondary line-clamp-2 mt-1 leading-tight">
                  {next.insight.impact}
                </p>
              </div>

              <span className="text-[10px] font-bold text-primary">
                Вывести в центр →
              </span>
            </div>
          </motion.button>

          {/* Нижняя правая правильная сота (Next-2) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, x: 4 }}
            onClick={() => paginate(1)}
            className="relative w-[230px] h-[199px] ml-10 hex-drop-shadow cursor-pointer text-center opacity-90 hover:opacity-100"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
              <polygon
                points="50,4 150,4 196,87 150,170 50,170 4,87"
                fill="#FFFFFF"
                fillOpacity="0.9"
                stroke="#FF3D71"
                strokeOpacity="0.55"
                strokeWidth="3.5"
              />
            </svg>

            <div className="relative z-10 w-full h-full px-[24%] py-[18%] flex flex-col items-center justify-center">
              <span className="text-[10px] font-extrabold text-primary uppercase mb-1">
                Далее · {next2.insight.importance_score}/10
              </span>
              <div className="text-xs font-bold text-text-primary line-clamp-2 leading-snug">
                {next2.insight.event}
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* =====================================================================
          МОБИЛЬНАЯ И ПЛАНШЕТНАЯ ВЕРСИЯ (ВЕРТИКАЛЬНЫЕ ПРАВИЛЬНЫЕ СОТЫ)
          ===================================================================== */}
      <div className="lg:hidden flex flex-col items-center relative py-2 px-2">
        <FloatingCube className="absolute left-3 top-4" size={24} color="primary" delay={0.2} />
        <FloatingCube className="absolute right-4 top-20" size={22} color="secondary" delay={0.9} />
        <FloatingCube className="absolute left-4 bottom-24" size={22} color="dark" delay={1.5} />

        {/* Верхние малые соты (превью предыдущего инсайта + декоративная сота) */}
        <div className="flex items-center justify-center gap-2 -mb-4 z-10">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="relative w-[170px] h-[148px] hex-drop-shadow cursor-pointer"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
              <polygon
                points="50,4 150,4 196,87 150,170 50,170 4,87"
                fill="#FFFFFF"
                stroke="#FF3D71"
                strokeWidth="4"
              />
            </svg>
            <div className="relative z-10 w-full h-full px-[23%] py-[16%] flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-extrabold text-primary uppercase">
                ← Пред. ({prev.insight.importance_score}/10)
              </span>
              <span className="text-[11px] font-bold text-text-primary line-clamp-2 mt-0.5 leading-tight">
                {prev.insight.event}
              </span>
            </div>
          </button>

          <div className="relative w-[110px] h-[95px] mt-6">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
              <polygon
                points="50,4 150,4 196,87 150,170 50,170 4,87"
                fill="#8B5CF6"
                fillOpacity="0.12"
                stroke="#8B5CF6"
                strokeOpacity="0.4"
                strokeWidth="4"
              />
            </svg>
            <div className="relative z-10 w-full h-full flex items-center justify-center text-xs font-extrabold text-secondary">
              #{currentIdx + 1}/{total}
            </div>
          </div>
        </div>

        {/* Центральная мобильная сота с полным текстом */}
        <div className="w-full max-w-[390px] relative z-20 my-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.insight.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -60, scale: 0.94 }}
              transition={{ duration: 0.32 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) paginate(1);
                else if (info.offset.x > 40) paginate(-1);
              }}
              className="relative w-full min-h-[430px] hex-drop-shadow"
            >
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 200 220"
                preserveAspectRatio="none"
                fill="none"
              >
                <polygon
                  points="100,3 197,38 197,182 100,217 3,182 3,38"
                  fill="#FFFFFF"
                  stroke="url(#mainHexGrad)"
                  strokeWidth="4"
                />
              </svg>

              <div className="relative z-10 w-full h-full px-7 py-12 flex flex-col justify-between space-y-2.5 text-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <Badge variant={badge.variant}>
                    ✦ {badge.label} · {current.insight.importance_score}/10
                  </Badge>
                  <Badge variant="info">
                    AI {Math.round(current.insight.confidence_score * 100)}%
                  </Badge>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold font-display text-text-primary leading-snug">
                  {current.insight.event}
                </h3>
                <p className="text-xs text-text-secondary line-clamp-2">
                  {current.news.title}
                </p>

                <div className="p-3 rounded-2xl bg-gray-50 border border-border text-xs text-left">
                  <div className="font-extrabold text-text-hint uppercase text-[10px] mb-0.5">
                    Влияние
                  </div>
                  <p className="text-text-primary leading-snug">{current.insight.impact}</p>
                </div>

                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/15 border border-secondary/20 text-xs text-left">
                  <div className="font-extrabold text-primary uppercase text-[10px] mb-0.5">
                    ✦ Рекомендация
                  </div>
                  <p className="text-text-primary font-medium leading-snug">
                    {current.insight.recommendation}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
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

        {/* Нижние переплетающиеся соты на мобильном */}
        <div className="flex items-center justify-center gap-2 -mt-4 z-10">
          <div className="relative w-[110px] h-[95px] -mt-6">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
              <polygon
                points="50,4 150,4 196,87 150,170 50,170 4,87"
                fill="#FF3D71"
                fillOpacity="0.12"
                stroke="#FF3D71"
                strokeOpacity="0.4"
                strokeWidth="4"
              />
            </svg>
            <div className="relative z-10 w-full h-full flex items-center justify-center text-[11px] font-extrabold text-primary">
              AI {Math.round(next.insight.confidence_score * 100)}%
            </div>
          </div>

          <button
            type="button"
            onClick={() => paginate(1)}
            className="relative w-[170px] h-[148px] hex-drop-shadow cursor-pointer"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 174" fill="none">
              <polygon
                points="50,4 150,4 196,87 150,170 50,170 4,87"
                fill="#FFFFFF"
                stroke="#8B5CF6"
                strokeWidth="4"
              />
            </svg>
            <div className="relative z-10 w-full h-full px-[23%] py-[16%] flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-extrabold text-secondary uppercase">
                След. ({next.insight.importance_score}/10) →
              </span>
              <span className="text-[11px] font-bold text-text-primary line-clamp-2 mt-0.5 leading-tight">
                {next.insight.event}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* =====================================================================
          НАВИГАЦИОННАЯ ПАНЕЛЬ ПОД СОТАМИ ИНСАЙТОВ (ДЛЯ ДЕСКТОПА И ТЕЛЕФОНОВ)
          ===================================================================== */}
      <div className="mt-6 flex flex-col items-center justify-center gap-3 z-30 relative">
        <div className="glass border border-border rounded-full px-3 py-2 sm:px-5 sm:py-2.5 shadow-lg flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white hover:bg-gray-100 border border-border text-text-primary font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <span className="text-primary text-base leading-none">←</span>
            <span>Предыдущая сота</span>
          </button>

          {/* Индикаторы сот */}
          <div className="flex items-center gap-2">
            {items.map((item, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={item.insight.id}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  title={item.insight.event}
                  className={`h-3.5 transition-all cursor-pointer hex-regular-flat ${
                    isActive
                      ? 'w-8 gradient-bg scale-110 shadow-sm'
                      : 'w-4 bg-gray-300 hover:bg-primary/50'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => paginate(1)}
            className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full gradient-bg text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
          >
            <span>Следующая сота</span>
            <span className="text-base leading-none">→</span>
          </button>
        </div>

        <span className="text-xs text-text-hint font-medium">
          Инсайт {currentIdx + 1} из {total} · Нажмите на кнопки или свайпните соту
        </span>
      </div>
    </div>
  );
}