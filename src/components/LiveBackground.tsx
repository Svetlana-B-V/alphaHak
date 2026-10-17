import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import CursorTrail from './CursorTrail';

interface StarConfig {
  id: number;
  top: string;
  left: string;
  size: number;
  colorClass: string;
  ampX: number;
  ampY: number;
  duration: number;
  direction: 1 | -1;
}

const STARS: StarConfig[] = [
  { id: 1, top: '7%', left: '6%', size: 58, colorClass: 'text-primary/25', ampX: 26, ampY: 34, duration: 9, direction: 1 },
  { id: 2, top: '12%', left: '86%', size: 72, colorClass: 'text-secondary/25', ampX: -32, ampY: 28, duration: 11, direction: -1 },
  { id: 3, top: '26%', left: '18%', size: 46, colorClass: 'text-secondary/20', ampX: 22, ampY: -30, duration: 8.5, direction: 1 },
  { id: 4, top: '34%', left: '78%', size: 64, colorClass: 'text-primary/20', ampX: -28, ampY: -24, duration: 10, direction: -1 },
  { id: 5, top: '48%', left: '8%', size: 76, colorClass: 'text-secondary/25', ampX: 35, ampY: 26, duration: 12.5, direction: 1 },
  { id: 6, top: '52%', left: '91%', size: 54, colorClass: 'text-primary/25', ampX: -24, ampY: 32, duration: 9.5, direction: -1 },
  { id: 7, top: '66%', left: '22%', size: 68, colorClass: 'text-primary/20', ampX: 30, ampY: -28, duration: 11.5, direction: 1 },
  { id: 8, top: '72%', left: '74%', size: 52, colorClass: 'text-secondary/25', ampX: -26, ampY: 30, duration: 8, direction: -1 },
  { id: 9, top: '85%', left: '12%', size: 62, colorClass: 'text-secondary/20', ampX: 28, ampY: -22, duration: 10.5, direction: 1 },
  { id: 10, top: '88%', left: '84%', size: 74, colorClass: 'text-primary/25', ampX: -34, ampY: -30, duration: 13, direction: -1 },
  { id: 11, top: '18%', left: '48%', size: 44, colorClass: 'text-primary/15', ampX: 20, ampY: 25, duration: 9, direction: 1 },
  { id: 12, top: '60%', left: '52%', size: 60, colorClass: 'text-secondary/20', ampX: -25, ampY: -26, duration: 10.8, direction: -1 },
];

export default function LiveBackground() {
  const location = useLocation();
  const [routeTurn, setRouteTurn] = useState(0);

  // Поворот всех звёзд при переходе между страницами (асинхронно)
  useEffect(() => {
    const timer = setTimeout(() => {
      setRouteTurn((prev) => prev + 180);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  const orb1Y = useTransform(smoothProgress, [0, 1], ['0%', '45%']);
  const orb1X = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  const orb2Y = useTransform(smoothProgress, [0, 1], ['0%', '-40%']);
  const orb2X = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const starScrollRotateCW = useTransform(smoothProgress, [0, 1], [0, 420]);
  const starScrollRotateCCW = useTransform(smoothProgress, [0, 1], [0, -420]);
  const hexY = useTransform(smoothProgress, [0, 1], ['0px', '-140px']);

  return (
    <>
      {/* След из кубиков за курсором */}
      <CursorTrail />

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Базовая светлая подложка */}
        <div className="absolute inset-0 bg-[#FAFAFA]" />

        {/* Паттерн пчелиных сот на фоне */}
        <motion.div
          style={{ y: hexY }}
          className="absolute -inset-24 opacity-[0.055]"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="honeycomb-pattern"
                width="56"
                height="100"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(1.25)"
              >
                <path
                  d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                  fill="none"
                  stroke="#171717"
                  strokeWidth="1.5"
                />
                <path
                  d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
                  fill="none"
                  stroke="#FF3D71"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#honeycomb-pattern)" />
          </svg>
        </motion.div>

        {/* Мягкие градиентные сферы */}
        <motion.div
          style={{ y: orb1Y, x: orb1X }}
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/12 blur-[100px]"
        />
        <motion.div
          style={{ y: orb2Y, x: orb2X }}
          className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-secondary/12 blur-[110px]"
        />
        <motion.div
          style={{ y: orb1Y }}
          className="absolute -bottom-40 left-1/3 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-[90px]"
        />

        {/* Увеличенные плавающие и вращающиеся звёзды ✦ */}
        {STARS.map((star) => (
          <motion.div
            key={star.id}
            style={{
              top: star.top,
              left: star.left,
              rotate: star.direction === 1 ? starScrollRotateCW : starScrollRotateCCW,
            }}
            animate={{
              x: [0, star.ampX, 0, -star.ampX * 0.7, 0],
              y: [0, -star.ampY, 0, star.ampY * 0.7, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute ${star.colorClass}`}
          >
            <motion.svg
              width={star.size}
              height={star.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              animate={{ rotate: routeTurn * star.direction }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            >
              <path d="M12 0C12.5 8 16 11.5 24 12C16 12.5 12.5 16 12 24C11.5 16 8 12.5 0 12C8 11.5 11.5 8 12 0Z" />
            </motion.svg>
          </motion.div>
        ))}
      </div>
    </>
  );
}