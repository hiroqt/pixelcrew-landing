'use client';

import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0
  });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setPosition({
        x: clientX,
        y: clientY,
        normalizedX: (clientX / innerWidth) * 2 - 1,
        normalizedY: (clientY / innerHeight) * 2 - 1
      });
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}
