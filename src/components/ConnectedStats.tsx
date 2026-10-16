import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface StatItem {
  value: string;
  suffix?: string;
  label: string;
  accent?: 'primary' | 'secondary' | 'gradient';
}

interface ConnectedStatsProps {
  stats: [StatItem, StatItem, StatItem];
}

export default function ConnectedStats({ stats }: ConnectedStatsProps) {
  return (
    <div className="relative max-w-5xl mx-auto my-10 select-none px-2">
      {/* Фоновые декоративные соты и кубики вокруг статистики */}
      <div className="hidden md:block absolute -top-6 left-12 w-24 h-20 hex-flat border-2 border-primary/20 pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 right-6 w-20 h-16 hex-flat bg-secondary/10 pointer-events-none" />
      <div className="hidden md:block absolute -bottom-4 left-1/4 w-4 h-4 bg-primary/35 rotate-12 rounded-xs pointer-events-none" />
      <div className="hidden md:block absolute top-8 right-1/3 w-3.5 h-3.5 bg-secondary/40 -rotate-12 rounded-xs pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 relative items-center">
        {/* Верхняя правая сота (Блок 1) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-start-6 md:col-span-7 relative hex-drop-shadow-dark"
        >
          {/* Внешний многослойный контур соты */}
          <div className="p-[3px] hex-card-shape bg-gradient-to-r from-primary/60 via-secondary/60 to-white/20">
            <div className="dark-surface text-white hex-card-shape px-10 py-8 md:px-14 md:py-10 relative">
              <div className="flex items-center justify-between mb-4">
                {/* Декоративные кубики вместо полосок */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-primary inline-block" />
                  <span className="w-3 h-3 bg-secondary/70 inline-block" />
                  <span className="w-3 h-3 border border-white/40 inline-block" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-white/50 font-bold">
                  YANDEX // RADAR
                </span>
              </div>

              <div className="text-4xl md:text-6xl font-extrabold font-display tracking-tight flex items-baseline gap-1 md:justify-end">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stats[0].value}
                </span>
                {stats[0].suffix && (
                  <span className="text-white/40 text-2xl md:text-4xl font-bold">
                    {stats[0].suffix}
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-white/85 mt-3 md:text-right leading-relaxed max-w-md ml-auto">
                {stats[0].label}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Промежуточный элемент 1 — ТОЛЬКО В ФОРМЕ КРУГА (исправлено по Картинке 4) */}
        <div className="flex md:col-start-6 md:col-span-2 items-center justify-center -my-3 md:-my-5 z-20 pointer-events-none">
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#1B1924] border-2 border-primary/40 shadow-lg flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>

        {/* Средняя левая сота (Блок 2) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="md:col-start-1 md:col-span-7 relative hex-drop-shadow-dark md:-mt-4"
        >
          <div className="p-[3px] hex-card-shape bg-gradient-to-r from-secondary/60 via-primary/60 to-white/20">
            <div className="dark-surface text-white hex-card-shape px-10 py-8 md:px-14 md:py-10 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15">
                  ✦ Live-поток
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-primary animate-pulse" />
                  <span className="w-2.5 h-2.5 bg-secondary" />
                </div>
              </div>

              <div className="text-4xl md:text-6xl font-extrabold font-display tracking-tight flex items-baseline gap-1">
                <span className="bg-gradient-to-r from-secondary via-primary to-primary bg-clip-text text-transparent">
                  {stats[1].value}
                </span>
                {stats[1].suffix && (
                  <span className="text-white/40 text-2xl md:text-4xl font-bold">
                    {stats[1].suffix}
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-white/85 mt-3 max-w-md leading-relaxed">
                {stats[1].label}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Промежуточный элемент 2 — ТОЛЬКО В ФОРМЕ КРУГА (исправлено по Картинке 4) */}
        <div className="flex md:col-start-7 md:col-span-2 items-center justify-center -my-3 md:-my-4 z-20 pointer-events-none">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1B1924] border-2 border-secondary/50 shadow-lg flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
        </div>

        {/* Нижняя правая градиентная сота (Блок 3 + переход по стрелке на Картинке 5) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="md:col-start-7 md:col-span-5 relative hex-drop-shadow md:-mt-3"
        >
          <div className="p-[3px] hex-card-shape bg-white/80">
            <div className="gradient-bg text-white hex-card-shape px-10 py-7 md:px-12 md:py-8 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4">
                <span className="text-3xl md:text-4xl font-extrabold font-display">
                  {stats[2].value}
                  {stats[2].suffix}
                </span>

                {/* Стрелка с переходом на страницу дашборда (Картинка 5) */}
                <Link
                  to="/dashboard"
                  title="Перейти к дашборду инсайтов"
                  aria-label="Перейти к дашборду инсайтов"
                  className="w-10 h-10 rounded-full bg-white/25 hover:bg-white hover:text-primary flex items-center justify-center text-base font-extrabold transition-all duration-200 hover:scale-110 shadow-md cursor-pointer shrink-0"
                >
                  ↗
                </Link>
              </div>
              <p className="text-xs md:text-sm text-white/95 mt-2 font-medium leading-snug">
                {stats[2].label}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}