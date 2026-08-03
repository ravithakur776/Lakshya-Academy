"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { parentTestimonials } from "@/data/homepage-data";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";

export function ParentTestimonials() {
  return (
    <section className="py-20 md:py-28 bg-gray-50" id="parent-testimonials">
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">Parent Reviews</span>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mt-3">
            What Parents Say
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            The trust of parents is our greatest achievement. Here&apos;s what families
            across Mathura and Agra say about us.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parentTestimonials.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, si) => (
                    <Star key={si} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-5">
                  <Quote className="absolute -top-2 -left-1 h-8 w-8 text-primary/10 fill-primary/10" />
                  <p className="text-gray-600 leading-relaxed text-sm pl-4">
                    {review.quote}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-emerald-200 flex items-center justify-center font-bold text-primary text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.relation}</p>
                    <p className="text-xs text-primary font-medium mt-0.5">{review.city}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
