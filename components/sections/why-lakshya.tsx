"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Target, BookOpenCheck, ShieldCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/ui/section-heading";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Taught by IIT (BHU) Alumni Directors",
    desc: "Direct mentorship from directors Vikas Shandilya Sir & Pushpendra Sharma Sir with 17+ years of proven JEE coaching experience.",
  },
  {
    icon: Users,
    title: "Strict 50-Student Batch Size",
    desc: "Unlike giant corporate coaching batches of 200+ students, every Lakshya student receives personalized focus and daily feedback.",
  },
  {
    icon: Target,
    title: "Daily Practice Problems & Doubt Resolution",
    desc: "Rigorous daily problem sets (DPPs), weekly CBT mock tests, and 1-on-1 daily doubt resolution slots.",
  },
  {
    icon: BookOpenCheck,
    title: "Integrated Schooling & Board Support",
    desc: "Seamless synchronization between Class 11/12 board curriculum and JEE Main/Advanced rank-building topics.",
  },
  {
    icon: ShieldCheck,
    title: "Air-Conditioned & CCTV Campus",
    desc: "Modern campus at Krishna Nagar, Mathura, equipped with AC classrooms, study library, WiFi, and 24/7 CCTV safety.",
  },
  {
    icon: HeartHandshake,
    title: "Up to 100% LTPE Scholarship",
    desc: "Empowering meritorious students through Lakshya Talent Promotional Exam with full tuition fee waivers.",
  },
];

export function WhyLakshyaSection() {
  return (
    <section className="py-24 bg-white relative">
      <Container>
        <SectionHeading
          eyebrow="The Lakshya Advantage"
          title="Why Mathura's Top JEE Aspirants Choose Lakshya"
          description="Since 2017, we have built Mathura's most trusted environment for IIT-JEE preparation through concept clarity and disciplined execution."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F4FAF6] border border-emerald-100/90 rounded-3xl p-7 shadow-sm hover:shadow-md hover:border-[#0F7A3C]/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200/80 flex items-center justify-center text-[#0F7A3C] shadow-sm mb-5 group-hover:bg-[#0F7A3C] group-hover:text-white transition-colors duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-emerald-950 text-xl font-heading mb-3">{feature.title}</h3>
              <p className="text-emerald-900/80 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
