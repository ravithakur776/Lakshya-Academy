import type { Metadata } from "next";
import { Sparkles, Calendar, Award, CheckCircle, BookOpen, Download, ArrowDown } from "lucide-react";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { LtpeForm } from "@/components/forms/ltpe-form";
import { LtpeSyllabusSection } from "@/components/sections/ltpe-syllabus-section";
import { LTPE_2026_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "LTPE 2026 — Lakshya Talent Promotional Exam 2026 | Register FREE & View Syllabus",
  description: "Register FREE for LTPE 2026 — Lakshya Academy's scholarship exam for Class 8, 9 & 10 students. Win up to 100% scholarship. Exam Date: 11 October 2026. Download official syllabus.",
  openGraph: {
    title: "LTPE 2026 Scholarship Exam & Syllabus | Lakshya Academy Mathura",
    description: "Win up to 100% scholarship for Class 8, 9 & 10 students. Free registration. Exam Date: 11 October 2026.",
  },
};

const scholarshipTiers = [
  { rank: "Top 1%", scholarship: "100%", label: "Full Scholarship", color: "bg-[#0F7A3C] text-white", icon: "👑" },
  { rank: "Top 5%", scholarship: "75%", label: "Gold Scholarship", color: "bg-emerald-600 text-white", icon: "🥇" },
  { rank: "Top 10%", scholarship: "50%", label: "Silver Scholarship", color: "bg-[#0F7A3C]/80 text-white", icon: "🥈" },
  { rank: "Top 20%", scholarship: "25%", label: "Merit Scholarship", color: "bg-emerald-50 text-[#0F7A3C] border border-emerald-200", icon: "🥉" },
];

export default function LtpePage() {
  return (
    <>
      {/* Top Split Hero — Registration Form Featured Directly at Top */}
      <section id="register" className="py-12 md:py-20 bg-gradient-to-br from-white via-[#F4FAF6] to-white border-b border-emerald-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column — Exam Details & Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 uppercase tracking-widest">
                <Sparkles className="h-4 w-4" /> Official Scholarship Exam
              </div>

              <h1 className="text-3xl md:text-5xl font-black font-heading text-emerald-950 leading-tight">
                Lakshya Talent <span className="text-[#0F7A3C]">Promotional Exam 2026</span>
              </h1>

              <p className="text-emerald-900/80 text-base md:text-lg leading-relaxed font-medium">
                Register for FREE and win <strong className="text-emerald-950 font-bold">Up to 100% Scholarship</strong> for IIT-JEE & Foundation preparation at Lakshya Academy, Mathura. For students in Class 8, 9, or 10.
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
                  <Calendar className="h-5 w-5 text-[#0F7A3C] mb-1" />
                  <p className="font-bold text-emerald-950 text-sm">11 October 2026</p>
                  <p className="text-xs text-emerald-800 font-semibold">Exam Date</p>
                </div>
                <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
                  <Award className="h-5 w-5 text-[#0F7A3C] mb-1" />
                  <p className="font-bold text-emerald-950 text-sm">Up to 100% Waiver</p>
                  <p className="text-xs text-emerald-800 font-semibold">Tuition Scholarship</p>
                </div>
              </div>

              {/* Key Benefits List */}
              <div className="space-y-3 pt-2 text-xs md:text-sm font-semibold text-emerald-950">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-[#0F7A3C] flex-shrink-0" />
                  <span>100% Free Registration — No Exam Fee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-[#0F7A3C] flex-shrink-0" />
                  <span>Instant Hall Ticket Generation & WhatsApp Delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-[#0F7A3C] flex-shrink-0" />
                  <span>1-on-1 Counselling Slot with IIT (BHU) Directors</span>
                </div>
              </div>

              {/* Quick Jump to Syllabus */}
              <div className="pt-2">
                <a
                  href="#syllabus"
                  className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-[#0F7A3C] border border-emerald-200/90 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <BookOpen className="h-4 w-4 text-[#0F7A3C]" />
                  <span>View Official Exam Syllabus (Class 8, 9 & 10)</span>
                  <ArrowDown className="h-3.5 w-3.5 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Right Column — Prominent Registration Form Card */}
            <div className="lg:col-span-6 bg-white border border-emerald-200/90 rounded-3xl p-6 md:p-8 shadow-xl relative">
              <div className="mb-6 border-b border-emerald-100 pb-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-[#0F7A3C] border border-emerald-200 px-3 py-1 rounded-full">
                  FREE REGISTRATION FORM
                </span>
                <h2 className="font-heading font-black text-2xl text-emerald-950 mt-2">Fill Student Details</h2>
                <p className="text-xs text-emerald-800 font-semibold mt-1">Get instant admit card and hall ticket on mobile</p>
              </div>

              <LtpeForm />
            </div>

          </div>
        </Container>
      </section>

      {/* Official Syllabus Section */}
      <LtpeSyllabusSection />

      {/* Scholarship Tiers Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 px-3.5 py-1 rounded-full uppercase tracking-widest">
              Scholarship Tiers
            </span>
            <h2 className="font-heading text-3xl font-black text-emerald-950 mt-3">Up to 100% Fee Waiver</h2>
            <p className="text-sm font-semibold text-emerald-800 mt-2">Awarded based on merit performance in LTPE 2026 on 11 October 2026.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {scholarshipTiers.map((tier, i) => (
              <FadeIn key={tier.scholarship} delay={i * 0.1}>
                <div className="bg-[#F4FAF6] border border-emerald-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#0F7A3C]/40 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-2xl shadow-sm mx-auto mb-3">
                    {tier.icon}
                  </div>
                  <div className="text-3xl font-black font-heading text-[#0F7A3C]">{tier.scholarship}</div>
                  <p className="font-bold text-emerald-950 text-sm mt-1">{tier.label}</p>
                  <p className="text-emerald-800 text-xs font-semibold mt-0.5">{tier.rank}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-[#F4FAF6] border-t border-emerald-100">
        <Container className="max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-heading font-black text-3xl text-emerald-950">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {LTPE_2026_CONFIG.faqs.map((faq, i) => (
              <div key={i} className="border border-emerald-100 rounded-2xl p-5 bg-white shadow-sm">
                <h4 className="font-bold text-emerald-950 text-sm font-heading">{faq.q}</h4>
                <p className="text-emerald-900/80 text-xs mt-2 leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
