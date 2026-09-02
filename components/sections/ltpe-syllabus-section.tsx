"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import {
  BookOpen,
  Download,
  Calendar,
  Sparkles,
  CheckCircle,
  Atom,
  FlaskConical,
  Calculator,
  ExternalLink,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const syllabusData = {
  "Class 8": {
    physics: [
      "Electricity: Magnetic and Heating Effects",
      "Exploring Forces",
      "Pressure",
      "Winds, Storms, and Cyclones",
      "Light: Mirrors and Lenses",
    ],
    chemistry: [
      "Particulate Nature of Matter",
      "Nature of Matter: Elements, Compounds and Mixtures",
    ],
    maths: [
      "A Square and A Cube",
      "Power Play",
      "A Story of Numbers",
      "Quadrilaterals",
      "Number Play",
      "We Distribute",
      "Yet Things Multiply",
      "Proportional Reasoning-1",
    ],
  },
  "Class 9": {
    physics: [
      "Describing Motion Around Us",
      "How Forces Affect Motion",
      "Work, Energy, and Simple Machines",
    ],
    chemistry: [
      "Exploring Mixtures and their Separation",
      "Journey Inside Atom",
    ],
    maths: [
      "Orienting Yourself: The Use of Coordinates",
      "Introduction to Linear Polynomials",
      "The World of Numbers",
      "Exploring Algebraic Identities",
      "I'm Up and Down, and Round and Round",
      "Measuring Space: Perimeter and Area",
      "The Mathematics of Maybe: Introduction to Probability",
    ],
  },
  "Class 10": {
    physics: [
      "Light - Reflection and Refraction",
      "Human Eye and Colourful World",
      "Electricity",
    ],
    chemistry: [
      "Chemical Reactions & Equations",
      "Acids, Bases and Salts",
      "Metals and Non-Metals",
    ],
    maths: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Coordinate Geometry",
      "Triangles",
      "Introduction to Trigonometry",
      "Some Applications of Trigonometry",
      "Quadrilaterals, Lines and Angles",
    ],
  },
};

export function LtpeSyllabusSection() {
  const [selectedClass, setSelectedClass] = useState<"Class 8" | "Class 9" | "Class 10">("Class 10");

  const currentSyllabus = syllabusData[selectedClass];

  return (
    <section id="syllabus" className="py-20 bg-gradient-to-b from-white via-[#F4FAF6] to-white border-t border-emerald-100">
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 uppercase tracking-widest mb-3">
            <BookOpen className="h-4 w-4" /> Exam Curriculum
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-emerald-950 leading-tight">
            Official <span className="text-[#0F7A3C]">LTPE 2026 Syllabus</span>
          </h2>
          <p className="text-emerald-800 text-sm md:text-base font-semibold mt-2">
            Based on the latest CBSE & ICSE pattern. Designed for concept building, analytical problem solving, and Foundation excellence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-bold text-emerald-900">
            <span className="bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
              📅 Exam Date: 11 October 2026
            </span>
            <span className="bg-amber-100 text-amber-950 px-3 py-1 rounded-full border border-amber-300">
              🎯 Classes 8, 9 & 10
            </span>
          </div>
        </div>

        {/* Main Grid: Poster on Left, Interactive Class Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Poster Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border-2 border-emerald-200 rounded-3xl p-3 shadow-xl overflow-hidden group">
              <div className="relative aspect-[853/1280] w-full rounded-2xl overflow-hidden bg-emerald-50">
                <Image
                  src="/images/ltpe/ltpe-2026-syllabus.jpg"
                  alt="Official LTPE 2026 Exam Syllabus Poster — Lakshya Academy"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Action Buttons Below Poster */}
              <div className="p-3 pt-4 flex items-center gap-3">
                <a
                  href="/images/ltpe/ltpe-2026-syllabus.jpg"
                  download="Lakshya_LTPE_2026_Syllabus.jpg"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Syllabus Poster</span>
                </a>
                <a
                  href="/images/ltpe/ltpe-2026-syllabus.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-3 rounded-xl border border-emerald-200 text-[#0F7A3C] hover:bg-emerald-50 transition-colors"
                  title="View Full Size"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Class-wise Interactive Topics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Class Selector Tabs */}
            <div className="bg-white border border-emerald-200/90 rounded-2xl p-1.5 shadow-sm flex items-center gap-2">
              {(["Class 8", "Class 9", "Class 10"] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black font-heading transition-all duration-200 cursor-pointer text-center",
                    selectedClass === cls
                      ? "bg-[#0F7A3C] text-white shadow-md shadow-emerald-700/20"
                      : "text-emerald-950 hover:bg-emerald-50"
                  )}
                >
                  {cls} Syllabus
                </button>
              ))}
            </div>

            {/* Subject Cards */}
            <div className="space-y-4">
              {/* Physics */}
              <div className="bg-white border border-emerald-100/90 rounded-3xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Atom className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-gray-900">Physics</h3>
                    <p className="text-[11px] font-semibold text-emerald-800">{selectedClass} Curriculum</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSyllabus.physics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-800 bg-[#F4FAF6] p-2.5 rounded-xl border border-emerald-100/70">
                      <CheckCircle className="h-4 w-4 text-[#0F7A3C] flex-shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemistry */}
              <div className="bg-white border border-emerald-100/90 rounded-3xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-50">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-gray-900">Chemistry</h3>
                    <p className="text-[11px] font-semibold text-emerald-800">{selectedClass} Curriculum</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSyllabus.chemistry.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-800 bg-[#F4FAF6] p-2.5 rounded-xl border border-emerald-100/70">
                      <CheckCircle className="h-4 w-4 text-[#0F7A3C] flex-shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mathematics */}
              <div className="bg-white border border-emerald-100/90 rounded-3xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-50">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-gray-900">Mathematics</h3>
                    <p className="text-[11px] font-semibold text-emerald-800">{selectedClass} Curriculum</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSyllabus.maths.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-800 bg-[#F4FAF6] p-2.5 rounded-xl border border-emerald-100/70">
                      <CheckCircle className="h-4 w-4 text-[#0F7A3C] flex-shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Note */}
            <div className="bg-gradient-to-r from-[#0F7A3C] to-[#0B5C2D] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-700/20">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-amber-300 flex-shrink-0" />
                <div>
                  <p className="font-bold text-xs font-heading">Concept Building & Application Focused</p>
                  <p className="text-[11px] text-emerald-100">Prepare Smart, Score High, Achieve More with IIT (BHU) Faculty.</p>
                </div>
              </div>
              <a
                href="#register"
                className="bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex-shrink-0"
              >
                Register for Free Exam
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
