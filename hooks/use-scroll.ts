"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/ui-store";

/**
 * Hook that tracks the window scroll position and updates the UI store.
 * Also returns isScrolled (true when scrollY > 80px) for navbar styling.
 *
 * @example
 * const { scrollY, isScrolled } = useScroll();
 */
export function useScroll() {
  const setScrollY = useUIStore((state) => state.setScrollY);
  const scrollY = useUIStore((state) => state.scrollY);
  const isScrolled = useUIStore((state) => state.isScrolled);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollY]);

  return { scrollY, isScrolled };
}

/**
 * Hook that returns the current scroll progress (0–1) across the page.
 *
 * @example
 * const progress = useScrollProgress(); // 0.5 = halfway down
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setProgress(Math.min(1, Math.max(0, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
