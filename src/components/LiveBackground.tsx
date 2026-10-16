import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function LiveBackground() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Параллакс-смещения при скролле
  const orb1Y = useTransform(smoothProgress, [0, 1], ['0%', '45%']);
  const orb1X = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  const orb2Y = useTransform(smoothProgress, [0, 1], ['0%', '-40%']);
  const orb2X = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const starRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const hexY = useTransform(smoothProgress, [0, 1], ['0px', '-120px']);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Мягкая базовая подложка */}
      <div className="absolute inset-0 bg-[#FAFAFA]" />

      {/* Паттерн пчелиных сот на фоне, двигающийся при скролле */}
      <motion.div
        style={{ y: hexY }}
        className="absolute -inset-20 opacity-[0.045]"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="honeycomb-pattern"
              width="56"
              height="100"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(1.2)"
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

      {/* Живая сфера 1 (Primary #FF3D71) */}
      <motion.div
        style={{ y: orb1Y, x: orb1X }}
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/12 blur-[100px]"
      />

      {/* Живая сфера 2 (Secondary #8B5CF6) */}
      <motion.div
        style={{ y: orb2Y, x: orb2X }}
        className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-secondary/12 blur-[110px]"
      />

      {/* Живая сфера 3 (нижняя) */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -bottom-40 left-1/3 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-[90px]"
      />

      {/* Декоративные вращающиеся звёзды ✦ (как на референсах 1 и 2) */}
      <motion.div
        style={{ rotate: starRotate }}
        className="hidden lg:block absolute top-28 right-[12%] text-primary/25"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12.5 8 16 11.5 24 12C16 12.5 12.5 16 12 24C11.5 16 8 12.5 0 12C8 11.5 11.5 8 12 0Z" />
        </svg>
      </motion.div>

      <motion.div
        style={{ rotate: starRotate }}
        className="hidden lg:block absolute bottom-24 left-[8%] text-secondary/25"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12.5 8 16 11.5 24 12C16 12.5 12.5 16 12 24C11.5 16 8 12.5 0 12C8 11.5 11.5 8 12 0Z" />
        </svg>
      </motion.div>
    </div>
  );
}