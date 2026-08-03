"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { studentTestimonials } from "@/data/homepage-data";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";

export function StudentTestimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + studentTestimonials.length) % studentTestimonials.length);
  const next = () => setCurrent((c) => (c + 1) % studentTestimonials.length);

  const testimonial = studentTestimonials[current];

  return (
    <section className="py-20 md:py-28 bg-white" id="testimonials">
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">Student Stories</span>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mt-3">
            Straight from Our Toppers
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            These are real stories from real students who transformed their lives with Lakshya Academy.
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-gradient-to-br from-primary/5 via-white to-emerald-50/30 rounded-3xl border border-primary/10 p-8 md:p-12 text-center relative"
            >
              {/* Large quote icon */}
              <div className="absolute -top-5 left-10 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <Quote className="h-5 w-5 text-white fill-white" />
              </div>

              {/* Avatar */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-black text-2xl shadow-xl mx-auto mb-6`}>
                {testimonial.avatar}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 font-medium italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div>
                <p className="font-heading font-bold text-gray-900 text-lg">{testimonial.name}</p>
                <p className={`text-sm font-semibold bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent mt-1`}>
                  {testimonial.achievement}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {studentTestimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300",
                    i === current
                      ? `bg-gradient-to-br ${t.color} text-white shadow-lg scale-110`
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  )}
                >
                  {t.avatar}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
