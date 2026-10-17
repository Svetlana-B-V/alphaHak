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
    <div className="relative max-w-5xl mx-auto my-12 select-none px-4">
      {/* Декоративные пустые правильные соты-рамки и блики вокруг (как в сотовом узоре) */}
      <svg
        className="hidden md:block absolute top-4 left-[8%] w-28 h-24 text-primary/25 pointer-events-none"
        viewBox="0 0 200 174"
        fill="none"
      >
        <polygon
          points="50,3 150,3 197,87 150,171 50,171 3,87"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      <svg
        className="hidden md:block absolute top-16 left-[14%] w-20 h-18 text-secondary/15 pointer-events-none"
        viewBox="0 0 200 174"
        fill="currentColor"
      >
        <polygon points="50,3 150,3 197,87 150,171 50,171 3,87" />
      </svg>
      <svg
        className="hidden md:block absolute bottom-12 left-[18%] w-24 h-20 text-secondary/25 pointer-events-none"
        viewBox="0 0 200 174"
        fill="none"
      >
        <polygon
          points="50,3 150,3 197,87 150,171 50,171 3,87"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
      <svg
        className="hidden md:block absolute top-1/3 right-[6%] w-28 h-24 text-primary/15 pointer-events-none"
        viewBox="0 0 200 174"
        fill="currentColor"
      >
        <polygon points="50,3 150,3 197,87 150,171 50,171 3,87" />
      </svg>

      {/* Сотовый триптих правильных шестиугольников */}
      <div className="flex flex-col md:grid md:grid-cols-12 items-center gap-4 md:gap-0 relative">
        {/* ПРАВИЛЬНАЯ СОТА 1 (Верхняя правая) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="md:col-start-6 md:col-span-6 flex justify-center relative z-10"
        >
          <div className="relative w-[320px] h-[278px] sm:w-[370px] sm:h-[320px] hex-drop-shadow-dark">
            {/* Смещённый многослойный контур соты */}
            <svg
              className="absolute inset-0 w-full h-full translate-x-2.5 translate-y-2.5 text-primary/35 pointer-events-none"
              viewBox="0 0 200 174"
              fill="none"
            >
              <polygon
                points="50,2 150,2 198,87 150,172 50,172 2,87"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </svg>

            {/* Основной правильный шестиугольник */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 174"
              fill="none"
            >
              <defs>
                <linearGradient id="hexDark1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#171717" />
                  <stop offset="100%" stopColor="#241D30" />
                </linearGradient>
                <linearGradient id="hexStroke1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF3D71" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <polygon
                points="50,3 150,3 197,87 150,171 50,171 3,87"
                fill="url(#hexDark1)"
                stroke="url(#hexStroke1)"
                strokeWidth="3.5"
              />
            </svg>

            {/* Контент строго в безопасной зоне правильного 6-угольника */}
            <div className="relative z-10 w-full h-full px-[22%] py-[14%] flex flex-col items-center justify-center text-center text-white">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2.5 h-2.5 bg-primary inline-block" />
                <span className="w-2.5 h-2.5 bg-secondary inline-block" />
                <span className="text-[10px] uppercase tracking-widest text-white/55 font-bold ml-1">
                  YANDEX // RADAR
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight flex items-baseline justify-center gap-1">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stats[0].value}
                </span>
                {stats[0].suffix && (
                  <span className="text-white/45 text-2xl sm:text-3xl font-bold">
                    {stats[0].suffix}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-[13px] text-white/85 mt-2 leading-snug">
                {stats[0].label}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Круглый соединитель 1 */}
        <div className="flex md:col-start-5 md:col-span-2 items-center justify-center -my-3 md:-my-8 z-20 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-[#1B1924] border-2 border-primary/50 shadow-lg flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>

        {/* ПРАВИЛЬНАЯ СОТА 2 (Средняя левая) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="md:col-start-2 md:col-span-6 flex justify-center relative z-10 md:-mt-14"
        >
          <div className="relative w-[320px] h-[278px] sm:w-[370px] sm:h-[320px] hex-drop-shadow-dark">
            <svg
              className="absolute inset-0 w-full h-full -translate-x-2.5 translate-y-2.5 text-secondary/35 pointer-events-none"
              viewBox="0 0 200 174"
              fill="none"
            >
              <polygon
                points="50,2 150,2 198,87 150,172 50,172 2,87"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </svg>

            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 174"
              fill="none"
            >
              <polygon
                points="50,3 150,3 197,87 150,171 50,171 3,87"
                fill="url(#hexDark1)"
                stroke="url(#hexStroke1)"
                strokeWidth="3.5"
              />
            </svg>

            <div className="relative z-10 w-full h-full px-[22%] py-[14%] flex flex-col items-center justify-center text-center text-white">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-white/90 border border-white/15 mb-2">
                ✦ Live-поток
              </span>

              <div className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight flex items-baseline justify-center gap-1">
                <span className="bg-gradient-to-r from-secondary via-primary to-primary bg-clip-text text-transparent">
                  {stats[1].value}
                </span>
                {stats[1].suffix && (
                  <span className="text-white/45 text-2xl sm:text-3xl font-bold">
                    {stats[1].suffix}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-[13px] text-white/85 mt-2 leading-snug">
                {stats[1].label}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Круглый соединитель 2 */}
        <div className="flex md:col-start-6 md:col-span-2 items-center justify-center -my-3 md:-my-8 z-20 pointer-events-none">
          <div className="w-9 h-9 rounded-full bg-[#1B1924] border-2 border-secondary/60 shadow-lg flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
        </div>

        {/* ПРАВИЛЬНАЯ СОТА 3 (Нижняя правая градиентная со стрелкой на /dashboard) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="md:col-start-6 md:col-span-5 flex justify-center relative z-10 md:-mt-12"
        >
          <div className="relative w-[290px] h-[252px] sm:w-[320px] sm:h-[278px] hex-drop-shadow">
            <svg
              className="absolute inset-0 w-full h-full translate-x-2 translate-y-2 text-primary/40 pointer-events-none"
              viewBox="0 0 200 174"
              fill="none"
            >
              <polygon
                points="50,2 150,2 198,87 150,172 50,172 2,87"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </svg>

            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 174"
              fill="none"
            >
              <defs>
                <linearGradient id="hexGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF3D71" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <polygon
                points="50,3 150,3 197,87 150,171 50,171 3,87"
                fill="url(#hexGradMain)"
                stroke="#FFFFFF"
                strokeWidth="3"
              />
            </svg>

            <div className="relative z-10 w-full h-full px-[22%] py-[14%] flex flex-col items-center justify-center text-center text-white">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold font-display">
                  {stats[2].value}
                  {stats[2].suffix}
                </span>

                <Link
                  to="/dashboard"
                  title="Перейти к дашборду инсайтов"
                  aria-label="Перейти к дашборду инсайтов"
                  className="w-9 h-9 rounded-full bg-white/25 hover:bg-white hover:text-primary flex items-center justify-center text-sm font-extrabold transition-all duration-200 hover:scale-110 shadow-md cursor-pointer shrink-0"
                >
                  ↗
                </Link>
              </div>

              <p className="text-xs sm:text-[13px] text-white/95 mt-2 font-medium leading-snug">
                {stats[2].label}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}