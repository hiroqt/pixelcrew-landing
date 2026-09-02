'use client';

import { useEffect, useRef } from 'react';

interface PixelWaveBackgroundProps {
  position?: 'top' | 'bottom' | 'full';
  opacity?: number;
  className?: string;
}

export function PixelWaveBackground({
  position = 'top',
  opacity = 0.85,
  className = ''
}: PixelWaveBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;
    let isLight = false;

    const checkTheme = () => {
      isLight = document.documentElement.classList.contains('light');
    };

    // Resize handler to match container
    const handleResize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 600;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      checkTheme();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('pixelcrew-theme-change', checkTheme);

    // Mouse influence
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const cols = 55;
    const rows = 28;

    const render = () => {
      time += 0.018;

      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        const rowNorm = r / (rows - 1); // 0 to 1
        const depth = 0.3 + rowNorm * 0.7; // Perspective scale
        const baseY = rowNorm * height;

        for (let c = 0; c < cols; c++) {
          const colNorm = c / (cols - 1); // 0 to 1
          const baseX = colNorm * width;

          // Wave math: same horizontal wave pattern for all variants
          const distFromMouse = Math.hypot(baseX - mouseX, baseY - mouseY);
          const mouseInfluence = Math.sin(distFromMouse * 0.015 - time * 2) * Math.max(0, 15 - distFromMouse * 0.03);

          const wave1 = Math.sin(c * 0.28 + time * 1.4) * 16 * depth;
          const wave2 = Math.cos(r * 0.35 + time * 0.9 + c * 0.1) * 12 * depth;
          const wave3 = Math.sin((c + r) * 0.15 + time) * 8;

          const currentX = baseX;
          const currentY = baseY + wave1 + wave2 + wave3 + mouseInfluence;

          // Fade out near edges for seamless integration
          const edgeFadeX = Math.sin(colNorm * Math.PI);
          const edgeFadeY = Math.sin(rowNorm * Math.PI);
          const edgeFade = edgeFadeX * edgeFadeY;

          if (edgeFade <= 0.01) continue;

          // Pixel size based on depth and wave height
          const size = Math.max(1.5, (1.8 + depth * 2.2 + Math.abs(wave1) * 0.04));

          // Theme-aware palette with prominent visibility
          let dotColor: string;
          if (isLight) {
            // Light theme: Crisp indigo and slate
            const alpha = Math.min(0.45, 0.08 + edgeFade * 0.32 * depth).toFixed(3);
            if ((c + r) % 5 === 0) {
              dotColor = `rgba(99, 102, 241, ${alpha})`; // Indigo accent
            } else if ((c + r) % 3 === 0) {
              dotColor = `rgba(147, 51, 234, ${alpha})`; // Purple accent
            } else {
              dotColor = `rgba(100, 116, 139, ${alpha})`; // Slate
            }
          } else {
            // Dark theme: Luminous violet, indigo, and cyan dots
            const alpha = Math.min(0.65, 0.15 + edgeFade * 0.5 * depth).toFixed(3);
            if ((c + r) % 6 === 0) {
              dotColor = `rgba(56, 189, 248, ${alpha})`; // Cyan accent
            } else if ((c + r) % 3 === 0) {
              dotColor = `rgba(167, 139, 250, ${alpha})`; // Violet accent
            } else {
              dotColor = `rgba(129, 140, 248, ${alpha})`; // Indigo
            }
          }

          ctx.fillStyle = dotColor;

          ctx.fillRect(
            Math.round(currentX - size / 2),
            Math.round(currentY - size / 2),
            Math.round(size),
            Math.round(size)
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pixelcrew-theme-change', checkTheme);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const maskStyle = position === 'bottom'
    ? {
        maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
      }
    : position === 'full'
    ? undefined
    : {
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
      };

  // For 'bottom', only occupy the bottom 60% of the parent so the wave
  // doesn't span the full footer—just the lower region.
  const positionClass = position === 'bottom'
    ? 'absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none z-0 overflow-hidden'
    : 'absolute inset-0 pointer-events-none z-0 overflow-hidden';

  return (
    <div 
      className={`${positionClass} ${className}`}
      aria-hidden="true"
      style={maskStyle}
    >
      <canvas 
        ref={canvasRef} 
        style={{ opacity }}
        className="w-full h-full block"
      />
    </div>
  );
}
