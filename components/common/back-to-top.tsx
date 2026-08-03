"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/hooks/use-lenis";

/**
 * Back To Top Button
 *
 * Appears after the user scrolls past 500px.
 * Uses Lenis smooth scroll to animate to the top.
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => scrollTo(0, { duration: 1.5 })}
          aria-label="Back to top"
          className={cn(
            "fixed bottom-24 right-6 z-50",
            "w-11 h-11 rounded-full",
            "bg-white border border-gray-200",
            "shadow-lg hover:shadow-xl",
            "flex items-center justify-center",
            "text-gray-600 hover:text-primary hover:border-primary",
            "transition-all duration-300",
            "hover:scale-110 active:scale-95"
          )}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
