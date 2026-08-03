"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { parentTestimonials } from "@/data/homepage-data";

export function GoogleReviewsSection() {
  return (
    <section className="py-24 bg-white relative" id="parent-reviews">
      <Container>
        <SectionHeading
          eyebrow="What Parents Say"
          title="Trusted by Parents Across Mathura"
          description="Real reviews from parents whose children achieved top ranks in JEE Advanced, JEE Main & premier institutes like IIT Delhi, IIT BHU, and DTU under Lakshya Academy's guidance."
          centered
        />

        {/* Google Score Banner */}
        <div className="bg-[#F4FAF6] border border-emerald-100 rounded-3xl p-6 mb-12 max-w-xl mx-auto flex items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0F7A3C] text-white font-black font-heading text-xl flex items-center justify-center shadow-md">
              4.9
            </div>
            <div>
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-emerald-950 mt-1">Google Parent Reviews</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-[#0F7A3C]">100% Authentic</span>
            <span className="block text-[10px] text-emerald-800 font-semibold">Verified Parents</span>
          </div>
        </div>

        {/* Testimonials Grid — All 4 Parent Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parentTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F4FAF6] border border-emerald-100/90 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-[#0F7A3C]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-[#0F7A3C]/30" />
                </div>
                <blockquote className="text-emerald-900/80 text-xs md:text-sm leading-relaxed font-medium italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm font-heading">{t.name}</h4>
                  <p className="text-[11px] text-[#0F7A3C] font-semibold">{t.relation}</p>
                </div>
                <CheckCircle className="h-4 w-4 text-[#0F7A3C] flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
