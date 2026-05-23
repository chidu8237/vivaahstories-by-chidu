"use client";

import { useEffect, useState } from "react";

interface ParallaxOffset {
  x: number;
  y: number;
}

/**
 * Subtle mouse parallax — disabled on touch devices for performance.
 */
export function useMouseParallax(intensity = 20): ParallaxOffset {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * intensity;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [intensity]);

  return offset;
}
