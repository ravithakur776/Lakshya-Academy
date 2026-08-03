"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, Star, Users, Award, BookOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Floating stat card displayed over the hero image
function FloatingCard({
  icon: Icon,
  value,
  label,
  className,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "absolute flex items-center gap-3 bg-white/95 backdrop-blur-md",
        "rounded-2xl px-4 py-3 shadow-xl border border-emerald-100",
        className
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-[#0F7A3C]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-[#0F7A3C]" />
      </div>
      <div>
        <p className="text-lg font-black text-emerald-950 font-heading leading-none">{value}</p>
        <p className="text-xs text-emerald-800 font-semibold mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

// Floating equation badges
const equations = [
  { text: "E = mc²", delay: 0.5, x: "10%", y: "15%" },
  { text: "F = ma", delay: 0.7, x: "75%", y: "10%" },
  { text: "∫f(x)dx", delay: 0.9, x: "5%", y: "70%" },
  { text: "PV = nRT", delay: 1.1, x: "70%", y: "78%" },
  { text: "v = u + at", delay: 1.3, x: "40%", y: "5%" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative min-h-[calc(100vh-108px)] flex items-center overflow-hidden bg-gradient-to-br from-white via-[#F4FAF6] to-white"
      aria-label="Hero"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#0F7A3C]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: Content ──────────────────────────────────── */}
          <div className="flex flex-col gap-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F7A3C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F7A3C]" />
              </span>
              Admissions Open 2026-2027
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl xl:text-[3.6rem] font-black text-emerald-950 leading-[1.1] tracking-tight">
                Building Future{" "}
                <span className="relative">
                  <span className="text-[#0F7A3C]">IITians</span>
                </span>{" "}
                Through{" "}
                <span className="text-[#0F7A3C]">Concept-Based</span>{" "}
                Learning.
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-emerald-900/80 text-lg leading-relaxed max-w-xl font-medium"
            >
              Prepare students of Classes 11th, 12th & Dropper batches with expert IIT (BHU) faculty, structured learning, regular assessments, and a strong academic foundation for <strong className="text-emerald-950 font-bold">IIT-JEE</strong>. Mathura&apos;s most trusted coaching institute.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-[#0F7A3C] hover:bg-[#0D6B34] text-white rounded-2xl px-7 py-3 font-bold",
                  "shadow-xl shadow-emerald-700/25 hover:shadow-emerald-700/35",
                  "transition-all duration-300 hover:-translate-y-0.5 group gap-2"
                )}
              >
                Book Free Counselling
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/courses"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-2xl px-7 py-3 font-bold border-2 border-emerald-300 text-black bg-emerald-50/80 hover:bg-emerald-100 hover:border-[#0F7A3C] hover:text-black focus:text-black active:text-black",
                  "transition-all duration-300 hover:-translate-y-0.5"
                )}
              >
                Explore Courses
              </Link>

              <button className="flex items-center gap-2 text-sm font-bold text-emerald-900 hover:text-[#0F7A3C] transition-colors group">
                <span className="w-10 h-10 rounded-full bg-[#0F7A3C]/10 flex items-center justify-center group-hover:bg-[#0F7A3C]/20 transition-colors">
                  <Play className="h-4 w-4 text-[#0F7A3C] fill-[#0F7A3C] ml-0.5" />
                </span>
                Campus Tour
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-2"
            >
              {[
                { icon: "👨‍🎓", label: "1200+ Students Mentored" },
                { icon: "👨‍🏫", label: "IITians Faculty" },
                { icon: "🏆", label: "Scholarships Available" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-sm font-bold text-emerald-950">{badge.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Stars + Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {["SA", "RV", "PG", "SK", "AK"].map((initials) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full bg-[#0F7A3C] flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">Trusted by 1200+ students & parents</p>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Visual ──────────────────────────────────── */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center items-center"
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-[520px] aspect-square"
            >
              {/* Background glow blob */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#0F7A3C]/20 to-emerald-400/10 blur-2xl" />

              {/* Main illustration container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 border border-emerald-100 shadow-2xl shadow-[#0F7A3C]/10">
                <Image
                  src="/hero-illustration.png"
                  alt="Student preparing for IIT-JEE at Lakshya Academy"
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 768px) 100vw, 520px"
                />

                {/* Floating equation chips */}
                {equations.map((eq) => (
                  <motion.div
                    key={eq.text}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: eq.delay, type: "spring" }}
                    className="absolute px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-emerald-100 text-xs font-mono font-bold text-[#0F7A3C]"
                    style={{ left: eq.x, top: eq.y }}
                  >
                    {eq.text}
                  </motion.div>
                ))}
              </div>

              {/* Floating Stat Cards */}
              <FloatingCard
                icon={Users}
                value="1,200+"
                label="Students Mentored"
                className="-left-8 top-16 shadow-lg"
              />
              <FloatingCard
                icon={Award}
                value="80+ Selections"
                label="IIT / NIT 2024"
                className="-right-4 top-28"
              />
              <FloatingCard
                icon={BookOpen}
                value="100%"
                label="Scholarship Available"
                className="-left-4 bottom-20"
              />
              <FloatingCard
                icon={Star}
                value="4.9 / 5.0"
                label="Parent Rating"
                className="-right-6 bottom-16"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-emerald-800 font-semibold">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-emerald-300 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[#0F7A3C] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
