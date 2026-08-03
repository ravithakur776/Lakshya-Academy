"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  titleHighlight,
  description,
  align,
  centered,
  dark,
  className,
}: SectionHeadingProps) {
  const isCentered = centered || align === "center" || (!align && centered !== false);
  const alignClass = isCentered ? "text-center mx-auto" : align === "right" ? "text-right ml-auto" : "text-left";

  return (
    <div className={cn("max-w-2xl mb-12", alignClass, className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3 shadow-md transition-transform hover:scale-105",
            dark
              ? "bg-amber-400 text-gray-950 border border-amber-300 shadow-amber-400/20"
              : "bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20"
          )}
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "font-heading text-3xl md:text-5xl font-black leading-tight",
          dark ? "text-white" : "text-emerald-950"
        )}
      >
        {title}
        {titleHighlight && (
          <>
            {" "}<span className={dark ? "text-amber-300" : "text-[#0F7A3C]"}>{titleHighlight}</span>
          </>
        )}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={cn("mt-4 text-base md:text-lg font-medium leading-relaxed", dark ? "text-emerald-100/90" : "text-emerald-900/80")}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
