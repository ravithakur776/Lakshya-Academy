"use client";

import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * FadeIn animation wrapper
 *
 * Wraps children in a fade-in-from-bottom animation that triggers
 * when the element enters the viewport.
 *
 * @example
 * <FadeIn delay={0.2}>
 *   <h2>Our Courses</h2>
 * </FadeIn>
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.0, 0.0, 0.2, 1.0], // ease-out
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
