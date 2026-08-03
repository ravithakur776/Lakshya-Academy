"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Users, BookOpen } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { coursesData } from "@/data/courses-data";
import { ROUTES } from "@/lib/constants";

export function CoursesSection() {
  return (
    <section className="py-24 bg-[#F4FAF6] relative border-t border-b border-emerald-100/60">
      <Container>
        <SectionHeading
          eyebrow="Targeted Classroom Batches"
          title="Courses Architected for Top Ranks"
          description="Every batch has a maximum of 50 students to guarantee direct faculty interaction, weekly performance analysis, and regular DPPs."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {coursesData.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white border border-emerald-100/90 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#0F7A3C]/40 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20">
                  {course.targetClass}
                </span>
                <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Batch: {course.batchSize} Students
                </span>
              </div>

              {/* Header */}
              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black font-heading text-emerald-950">{course.courseName}</h3>
                  <span className="text-sm font-semibold text-emerald-800">({course.name})</span>
                </div>
                <p className="text-emerald-900/80 text-sm mt-3 leading-relaxed font-medium">{course.description}</p>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-emerald-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                    <Clock className="h-4 w-4 text-[#0F7A3C]" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                    <Users className="h-4 w-4 text-[#0F7A3C]" />
                    <span>Max {course.batchSize} Intake</span>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mt-4 pt-4 border-t border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-2">Covered Subjects</p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.subjects.map((subj) => (
                      <span key={subj} className="text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-100 px-2.5 py-1 rounded-lg">
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Fee Structure */}
                <div className="mt-4 bg-[#0F7A3C]/5 border border-[#0F7A3C]/15 rounded-xl p-3 text-xs text-[#0F7A3C] font-bold">
                  💰 Fee: {course.fee}
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-emerald-100">
                <Link
                  href={ROUTES.contact}
                  className="w-full flex items-center justify-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-emerald-700/20 group-hover:shadow-emerald-700/30"
                >
                  <span>Apply for {course.courseName}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
