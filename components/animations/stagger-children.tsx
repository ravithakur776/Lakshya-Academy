"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; initialDelay: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.initialDelay,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

/**
 * StaggerChildren animation wrapper
 *
 * Animates children in sequence with a stagger delay.
 * Wrap the parent with StaggerChildren and each child with StaggerItem.
 *
 * @example
 * <StaggerChildren staggerDelay={0.1}>
 *   <StaggerItem><CourseCard /></StaggerItem>
 *   <StaggerItem><CourseCard /></StaggerItem>
 *   <StaggerItem><CourseCard /></StaggerItem>
 * </StaggerChildren>
 */
export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.08,
  initialDelay = 0,
  once = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      custom={{ staggerDelay, initialDelay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — must be a direct child of StaggerChildren
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
