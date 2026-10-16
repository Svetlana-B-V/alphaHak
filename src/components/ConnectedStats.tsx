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
    <div className="relative max-w-4xl mx-auto my-8 select-none">
      {/* Десктопная композиция соединённых блоков с перемычками (как на 3 фото) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 relative items-stretch">
        {/* Верхний правый блок (Блок 1) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-start-7 md:col-span-6 dark-surface text-white rounded-[32px] p-8 md:p-10 relative shadow-xl border border-white/10 overflow-hidden"
        >
          {/* Декоративные слоты как на 1 фото */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-5 rounded-full bg-primary -skew-x-16 inline-block" />
              <span className="w-2.5 h-5 rounded-full border border-white/30 -skew-x-16 inline-block" />
              <span className="w-2.5 h-5 rounded-full border border-white/30 -skew-x-16 inline-block" />
              <span className="w-2.5 h-5 rounded-full border border-white/30 -skew-x-16 inline-block" />
            </div>
            <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
              Yandex // Radar
            </span>
          </div>

          <div className="text-4xl md:text-6xl font-extrabold font-display tracking-tight flex items-baseline gap-1 md:justify-end">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {stats[0].value}
            </span>
            {stats[0].suffix && (
              <span className="text-white/40 text-3xl md:text-4xl font-bold">
                {stats[0].suffix}
              </span>
            )}
          </div>
          <p className="text-sm md:text-base text-white/85 mt-3 md:text-right leading-snug">
            {stats[0].label}
          </p>
        </motion.div>

        {/* Центральная диагональная «жидкая» перемычка 1 (SVG Metaball Bridge) */}
        <div className="hidden md:flex md:col-start-6 md:col-span-2 items-center justify-center -my-5 z-10 pointer-events-none">
          <svg
            width="120"
            height="90"
            viewBox="0 0 120 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 0 L120 0 C85 0 75 20 75 45 C75 70 65 90 30 90 L60 90 C60 55 45 45 0 45 L60 0 Z"
              fill="#1B1924"
            />
            <circle cx="62" cy="45" r="22" fill="#1B1924" />
          </svg>
        </div>

        {/* Средний левый блок (Блок 2) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="md:col-start-1 md:col-span-7 dark-surface text-white rounded-[32px] p-8 md:p-10 relative shadow-xl border border-white/10 md:-mt-4"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15">
              ✦ Live-поток
            </span>
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>

          <div className="text-4xl md:text-6xl font-extrabold font-display tracking-tight flex items-baseline gap-1">
            <span className="bg-gradient-to-r from-secondary via-primary to-primary bg-clip-text text-transparent">
              {stats[1].value}
            </span>
            {stats[1].suffix && (
              <span className="text-white/40 text-3xl md:text-4xl font-bold">
                {stats[1].suffix}
              </span>
            )}
          </div>
          <p className="text-sm md:text-base text-white/85 mt-3 max-w-sm leading-snug">
            {stats[1].label}
          </p>
        </motion.div>

        {/* Нижняя диагональная перемычка 2 */}
        <div className="hidden md:flex md:col-start-7 md:col-span-2 items-center justify-center -my-4 z-10 pointer-events-none">
          <svg
            width="100"
            height="70"
            viewBox="0 0 100 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="35" r="20" fill="#1B1924" />
          </svg>
        </div>

        {/* Нижний правый компактный блок-капсула (Блок 3, как на 3 фото) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="md:col-start-8 md:col-span-4 gradient-bg text-white rounded-[28px] p-6 md:p-7 relative shadow-lg md:-mt-3 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl md:text-3xl font-extrabold font-display">
              {stats[2].value}
              {stats[2].suffix}
            </span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              ↗
            </span>
          </div>
          <p className="text-xs md:text-sm text-white/90 mt-2 font-medium">
            {stats[2].label}
          </p>
        </motion.div>
      </div>
    </div>
  );
}