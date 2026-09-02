'use client';

import { useEffect, useRef } from 'react';

/**
 * Subtle floating pixel particles that drift upward like digital embers.
 * Theme-aware: cyan/violet sparks in dark mode, indigo/slate in light mode.
 */
export function FooterParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isLight = false;

    const checkTheme = () => {
      isLight = document.documentElement.classList.contains('light');
    };

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      alphaDir: number;
      colorIdx: number;
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = Math.floor((width * height) / 4500); // density relative to area
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.2 + Math.random() * 2,
          speedY: -(0.15 + Math.random() * 0.35), // drift upward
          speedX: (Math.random() - 0.5) * 0.3,    // gentle horizontal sway
          alpha: Math.random() * 0.5,
          alphaDir: 0.003 + Math.random() * 0.006,
          colorIdx: Math.floor(Math.random() * 3),
        });
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      // Canvas extends 200px above the footer into the section above
      height = (parent ? parent.clientHeight : 200) + 200;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      checkTheme();
      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('pixelcrew-theme-change', checkTheme);

    // Dark mode palette
    const darkColors = [
      [56, 189, 248],  // cyan
      [167, 139, 250], // violet
      [129, 140, 248], // indigo
    ];
    // Light mode palette
    const lightColors = [
      [99, 102, 241],  // indigo
      [147, 51, 234],  // purple
      [100, 116, 139], // slate
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = isLight ? lightColors : darkColors;

      for (const p of particles) {
        // Update position
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.02) * 0.12; // subtle sine sway

        // Pulse alpha
        p.alpha += p.alphaDir;
        if (p.alpha >= 0.55) { p.alpha = 0.55; p.alphaDir = -Math.abs(p.alphaDir); }
        if (p.alpha <= 0.05) { p.alpha = 0.05; p.alphaDir = Math.abs(p.alphaDir); }

        // Wrap around when going off-screen
        if (p.y < -5) { p.y = height + 5; p.x = Math.random() * width; }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        const [cr, cg, cb] = colors[p.colorIdx];
        const a = isLight ? p.alpha * 0.7 : p.alpha;

        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a.toFixed(3)})`;
        ctx.fillRect(
          Math.round(p.x - p.size / 2),
          Math.round(p.y - p.size / 2),
          Math.round(p.size),
          Math.round(p.size)
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pixelcrew-theme-change', checkTheme);
    };
  }, []);

  return (
    <div
      className="absolute left-0 right-0 bottom-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{
        top: '-200px',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: 0.7 }}
      />
    </div>
  );
}
