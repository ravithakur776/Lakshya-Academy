"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Calendar, Award, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/common/container";
import { LTPE_2026_CONFIG, ROUTES } from "@/lib/constants";

export function LtpeSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#0B5C2D] via-[#0F7A3C] to-[#07401F] text-white relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest">
              <Sparkles className="h-4 w-4" /> Official Scholarship Exam
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-heading leading-tight">
              Lakshya Talent Promotional Exam <span className="text-amber-300">2026</span>
            </h2>

            <p className="text-emerald-100/90 text-base md:text-lg leading-relaxed font-medium">
              Win <strong className="text-white">Up to 100% Scholarship</strong> for Class 8, 9, and 10 students aiming for IIT-JEE & Foundation excellence. Registration fee ₹100 only!
            </p>

            {/* Quick highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                <Calendar className="h-5 w-5 text-amber-300 mb-1" />
                <p className="font-bold text-white text-sm">11 October 2026</p>
                <p className="text-xs text-emerald-200/80 font-medium">Exam Date</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                <Award className="h-5 w-5 text-amber-300 mb-1" />
                <p className="font-bold text-white text-sm">Up to 100% Waiver</p>
                <p className="text-xs text-emerald-200/80 font-medium">Tuition Scholarship</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={ROUTES.ltpeRegistration}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-base px-8 py-4 rounded-full transition-all shadow-xl shadow-amber-400/20"
              >
                <span>Register for LTPE 2026 (₹100)</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl space-y-6"
          >
            <h3 className="text-xl font-bold font-heading text-white border-b border-white/15 pb-4">
              LTPE 2026 Highlights & Benefits
            </h3>

            <ul className="space-y-4 text-sm font-medium text-emerald-100">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span><strong>Nominal ₹100 Registration Fee</strong> for all students of Classes 8, 9 & 10 in Mathura & nearby regions.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span><strong>Detailed Performance Diagnostic Report</strong> highlighting subject-wise strengths and conceptual improvement areas.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span><strong>Direct Counselling Slot</strong> with IIT (BHU) alumni directors Mr. Vikas Shandilya & Mr. Pushpendra Sharma.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span><strong>Instant WhatsApp Confirmation</strong> and digital admit card generated upon registration.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
