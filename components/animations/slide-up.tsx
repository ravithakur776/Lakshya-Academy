"use client";

import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideUpProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

/**
 * SlideUp animation wrapper
 *
 * Slides children up from a given distance with a fade.
 * More pronounced than FadeIn — use for hero headlines and CTAs.
 *
 * @example
 * <SlideUp delay={0.1} distance={40}>
 *   <h1>Your Gateway to IITs</h1>
 * </SlideUp>
 */
export function SlideUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
  ...props
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.0, 0.0, 0.2, 1.0],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
