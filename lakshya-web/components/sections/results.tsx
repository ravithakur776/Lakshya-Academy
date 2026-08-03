"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Star, ArrowRight, Award } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { topResultsData, RESULTS_STATS } from "@/data/results-data";

export function ResultsSection() {
  const topTopper = topResultsData.find((r) => r.isTopTopper) || topResultsData[0];

  return (
    <section className="py-24 bg-gradient-to-br from-[#0B5C2D] via-[#0F7A3C] to-[#07401F] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-black bg-amber-400 text-gray-950 border-2 border-amber-300 shadow-xl shadow-amber-400/30 uppercase tracking-widest mb-4"
          >
            <Trophy className="h-4 w-4 text-gray-950" />
            <span>Consistent Excellence Since 2017</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black font-heading text-white leading-tight mt-2">
            Our Results Speak for <span className="text-amber-300">Our Dedication</span>
          </h2>

          <p className="mt-4 text-base md:text-lg font-medium text-emerald-100/90 leading-relaxed">
            Transforming hard work into top ranks through rigorous problem-solving, weekly test series, and direct director supervision.
          </p>
        </div>

        {/* Featured Topper Highlight — Sabal Agrawal AIR 272 */}
        {topTopper && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-16 shadow-2xl max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Rank badge */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 text-gray-950 flex flex-col items-center justify-center p-4 shadow-xl border-4 border-amber-300/60 flex-shrink-0">
                <Trophy className="h-7 w-7 text-gray-950 mb-1" />
                <span className="text-2xl md:text-3xl font-black font-heading leading-none">{topTopper.rank}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest mt-1">JEE ADVANCED</span>
              </div>

              {/* Topper details */}
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                  <Star className="h-3.5 w-3.5 fill-amber-300" /> Star Student of Lakshya Academy
                </div>
                <h3 className="text-3xl md:text-4xl font-black font-heading text-white">{topTopper.name}</h3>
                <p className="text-amber-300 text-sm font-bold mt-1">{topTopper.exam} · {topTopper.year}</p>

                <blockquote className="mt-4 text-emerald-100/90 text-sm italic leading-relaxed font-medium">
                  &ldquo;Lakshya Academy&apos;s IIT BHU directors provided the exact conceptual rigor and personalized mentoring I needed to achieve AIR 272.&rdquo;
                </blockquote>
              </div>
            </div>
          </motion.div>
        )}

        {/* Result Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-sm">
            <p className="text-3xl md:text-4xl font-black font-heading text-amber-300">{RESULTS_STATS.topRanker.rank}</p>
            <p className="text-xs font-bold text-white uppercase tracking-wider mt-2">Highest AIR Rank</p>
            <p className="text-[11px] text-emerald-200/80 font-medium mt-1">JEE Advanced 2025</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-sm">
            <p className="text-3xl md:text-4xl font-black font-heading text-amber-300">{RESULTS_STATS.jeeMainQualified}</p>
            <p className="text-xs font-bold text-white uppercase tracking-wider mt-2">JEE Main Qualifiers</p>
            <p className="text-[11px] text-emerald-200/80 font-medium mt-1">Classroom Students</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-sm">
            <p className="text-3xl md:text-4xl font-black font-heading text-amber-300">{RESULTS_STATS.jeeAdvancedQualified}</p>
            <p className="text-xs font-bold text-white uppercase tracking-wider mt-2">JEE Advanced Qualifiers</p>
            <p className="text-[11px] text-emerald-200/80 font-medium mt-1">Classroom Students</p>
          </div>
        </div>

        {/* View all results link */}
        <div className="text-center mt-12">
          <Link
            href="/results"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-sm px-7 py-3.5 rounded-full transition-all shadow-xl shadow-amber-400/20 hover:scale-105"
          >
            <span>Explore Complete Results Gallery</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
