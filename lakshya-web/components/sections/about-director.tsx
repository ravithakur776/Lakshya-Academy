"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { facultyMembersData } from "@/data/faculty-data";

export function AboutDirectorSection() {
  const directors = facultyMembersData.filter((f) => f.isDirector);

  return (
    <section className="py-24 bg-white relative">
      <Container>
        <SectionHeading
          eyebrow="IIT (BHU) Alumni Leadership"
          title="Guided Directly by IITians, Not Hired Tutors"
          description="At Lakshya Academy, both co-founders are IIT (BHU) graduates with 17+ years of personal teaching commitment in Mathura."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {directors.map((director, i) => (
            <motion.div
              key={director.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#F4FAF6] border border-emerald-100/90 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-[#0F7A3C]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  {/* Photo Avatar Container — Identical 1:1 Aspect Ratio Box */}
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-[#0F7A3C]/30 shadow-md flex-shrink-0 bg-white p-1">
                    <Image
                      src={director.photoUrl}
                      alt={director.name}
                      fill
                      className="object-cover object-top rounded-xl"
                      sizes="144px"
                      priority
                    />
                  </div>

                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 mb-2">
                      <GraduationCap className="h-4 w-4" /> IIT (BHU) Alumnus Director
                    </div>

                    <h3 className="text-2xl font-black font-heading text-emerald-950">{director.name}</h3>
                    <p className="text-xs font-bold text-[#0F7A3C] mt-0.5">{director.title}</p>
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">{director.qualification}</p>
                  </div>
                </div>

                <p className="text-emerald-900/80 text-sm leading-relaxed font-medium">{director.bio}</p>

                <div className="mt-4 bg-white border border-emerald-100 rounded-2xl p-4 text-xs italic text-emerald-950">
                  &ldquo;{director.philosophy}&rdquo;
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-100 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-xl p-3 border border-emerald-100">
                  <p className="text-lg font-black text-[#0F7A3C] font-heading">{director.experience}</p>
                  <p className="text-[10px] font-bold text-emerald-800 uppercase">Teaching Exp.</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-emerald-100">
                  <p className="text-lg font-black text-amber-500 font-heading">{director.topRankers}</p>
                  <p className="text-[10px] font-bold text-emerald-800 uppercase">Top JEE Ranks</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export const AboutDirector = AboutDirectorSection;
