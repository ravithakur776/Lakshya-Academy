"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { _setLenisInstance } from "@/hooks/use-lenis";

/**
 * Lenis Smooth Scroll Provider
 *
 * Initializes a global Lenis instance for buttery-smooth scrolling.
 * Registers the instance globally so useLenis() can access it from anywhere.
 *
 * Features:
 * - Lerp: 0.08 (smooth, natural feel)
 * - Infinite: false
 * - Respects prefers-reduced-motion automatically
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    _setLenisInstance(lenis);

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      _setLenisInstance(null);
    };
  }, []);

  return <>{children}</>;
}
