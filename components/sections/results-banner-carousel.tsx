"use client";

import { useState, useEffect, useCallback, useRef, TouchEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { resultSlides, type ResultSlide } from "@/data/results-banner-data";
import { cn } from "@/lib/utils";

interface ResultsBannerCarouselProps {
  slides?: ResultSlide[];
  autoPlayInterval?: number;
  className?: string;
}

export function ResultsBannerCarousel({
  slides = resultSlides,
  autoPlayInterval = 5000,
  className,
}: ResultsBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Touch handling for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 45;

  const totalSlides = slides.length;
  const hasMultipleSlides = totalSlides > 1;

  const paginate = useCallback(
    (newDirection: 1 | -1) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        if (newDirection === 1) {
          return (prev + 1) % totalSlides;
        }
        return (prev - 1 + totalSlides) % totalSlides;
      });
    },
    [totalSlides]
  );

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (!hasMultipleSlides || isPaused) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [hasMultipleSlides, isPaused, autoPlayInterval, paginate]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
  };

  // Touch swipe handlers
  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        // Swiped left -> Next slide
        paginate(1);
      } else {
        // Swiped right -> Previous slide
        paginate(-1);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slideVariants: import("framer-motion").Variants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.7, ease: "easeOut" },
        opacity: { duration: 0.7, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.7, ease: "easeIn" },
        opacity: { duration: 0.5, ease: "easeIn" },
      },
    }),
  };

  const currentSlide = slides[currentIndex];

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Lakshya Academy Results Carousel"
      className={cn(
        "relative w-full overflow-hidden bg-[#063b1e] select-none",
        "border-b border-emerald-950/10 shadow-sm",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      {/* ── Slide Container with exact 5:2 (2.5:1) aspect ratio to prevent CLS ── */}
      <div
        className="relative w-full aspect-[5/2] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.alt}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation Arrows ── */}
        {hasMultipleSlides && (
          <>
            {/* Left Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              aria-label="Previous result"
              className={cn(
                "absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20",
                "w-8 h-8 sm:w-11 sm:h-11 rounded-full",
                "bg-white/85 hover:bg-white text-emerald-950",
                "shadow-md sm:shadow-lg border border-emerald-100/60 backdrop-blur-sm",
                "flex items-center justify-center transition-all duration-200",
                "hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500",
                "opacity-80 hover:opacity-100"
              )}
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-950 stroke-[2.5]" />
            </button>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              aria-label="Next result"
              className={cn(
                "absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20",
                "w-8 h-8 sm:w-11 sm:h-11 rounded-full",
                "bg-white/85 hover:bg-white text-emerald-950",
                "shadow-md sm:shadow-lg border border-emerald-100/60 backdrop-blur-sm",
                "flex items-center justify-center transition-all duration-200",
                "hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500",
                "opacity-80 hover:opacity-100"
              )}
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-950 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* ── Pagination Dots ── */}
        {hasMultipleSlides && (
          <div
            className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-xs"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title || slide.alt}`}
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    "transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-white",
                    isActive
                      ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-[#EAB308] shadow-xs"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60 hover:bg-white/90"
                  )}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
