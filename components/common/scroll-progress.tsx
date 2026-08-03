"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll";

/**
 * Scroll Progress Bar
 *
 * A thin progress indicator at the top of the page showing
 * how far the user has scrolled through the content.
 *
 * Uses a spring animation for a natural, iOS-like feel.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  const springProgress = useSpring(progress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleX = useTransform(springProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-primary via-emerald-500 to-accent"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
