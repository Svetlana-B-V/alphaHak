import { useEffect, useRef } from 'react';

interface TrailSquare {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

const PALETTE = [
  '#FF3D71', // primary
  '#8B5CF6', // secondary
  '#FF5A87', // primary-hover
  '#A78BFA', // secondary-hover
  '#7C3AED', // secondary-active
];

const GRID_SIZE = 18;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastGridX = -999;
    let lastGridY = -999;
    const squares: TrailSquare[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const spawnSquare = (gx: number, gy: number, alpha = 0.85, decay = 0.024) => {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      squares.push({
        x: gx,
        y: gy,
        size: GRID_SIZE - 2,
        color,
        alpha,
        decay,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const gx = Math.floor(e.clientX / GRID_SIZE) * GRID_SIZE;
      const gy = Math.floor(e.clientY / GRID_SIZE) * GRID_SIZE;

      if (gx !== lastGridX || gy !== lastGridY) {
        lastGridX = gx;
        lastGridY = gy;

        // Главный кубик под курсором
        spawnSquare(gx, gy, 0.85, 0.028);

        // Соседние кубики ступенчатого кластера (как на видео producthack.ru)
        if (Math.random() > 0.25) {
          const offsetX = (Math.floor(Math.random() * 3) - 1) * GRID_SIZE;
          const offsetY = (Math.floor(Math.random() * 3) - 1) * GRID_SIZE;
          spawnSquare(gx + offsetX, gy + offsetY, 0.65, 0.032);
        }
        if (Math.random() > 0.6) {
          const offsetX2 = (Math.floor(Math.random() * 3) - 1) * GRID_SIZE;
          const offsetY2 = (Math.floor(Math.random() * 3) - 1) * GRID_SIZE;
          spawnSquare(gx + offsetX2, gy + offsetY2, 0.45, 0.038);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = squares.length - 1; i >= 0; i--) {
        const sq = squares[i];
        sq.alpha -= sq.decay;

        if (sq.alpha <= 0) {
          squares.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = sq.alpha;
        ctx.fillStyle = sq.color;
        ctx.fillRect(sq.x, sq.y, sq.size, sq.size);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}