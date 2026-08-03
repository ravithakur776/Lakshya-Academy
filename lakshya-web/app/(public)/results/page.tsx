import type { Metadata } from "next";
import { Trophy, Award, Star, CheckCircle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { ResultsSection } from "@/components/sections/results";
import { AdmissionCta } from "@/components/sections/admission-cta";
import { RESULTS_STATS } from "@/data/results-data";

export const metadata: Metadata = {
  title: "Results & Rankers | Sabal Agrawal AIR 272 — Lakshya Academy Mathura",
  description: "Explore Lakshya Academy Mathura results: Sabal Agrawal (AIR 272, JEE Advanced 2025), 70+ JEE Main Qualified, 40+ JEE Advanced Qualified.",
  openGraph: {
    title: "Proven Results & Toppers | Lakshya Academy Mathura",
    description: "Sabal Agrawal AIR 272 JEE Advanced 2025. 70+ JEE Main & 40+ JEE Advanced selections.",
  },
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Hall of Fame"
        title="Proven Track Record of"
        titleHighlight="Top Ranks"
        description="Our students consistently achieve top ranks in JEE Main & Advanced through concept-based learning and disciplined mentorship in Mathura."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Results" }]}
        ctaPrimary={{ label: "Register for LTPE 2026", href: "/ltpe-registration" }}
        size="md"
      />

      {/* Main Results Showcase */}
      <ResultsSection />

      {/* Overview Stats */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Selections Breakdown"
            title="Consistent Results Year After Year"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            <FadeIn delay={0.1} className="bg-gray-50 border border-gray-200/80 rounded-3xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-600 flex items-center justify-center text-2xl font-black mx-auto mb-4">
                🏆
              </div>
              <p className="text-5xl font-black text-gray-900 font-heading">{RESULTS_STATS.topRanker.rank}</p>
              <p className="font-bold text-primary text-base mt-2">{RESULTS_STATS.topRanker.name}</p>
              <p className="text-gray-500 text-xs mt-1">{RESULTS_STATS.topRanker.exam}</p>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-gray-50 border border-gray-200/80 rounded-3xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-black mx-auto mb-4">
                🎓
              </div>
              <p className="text-5xl font-black text-gray-900 font-heading">{RESULTS_STATS.jeeMainQualified}</p>
              <p className="font-bold text-gray-800 text-base mt-2">JEE Main Qualified</p>
              <p className="text-gray-500 text-xs mt-1">High Percentiles across all batches</p>
            </FadeIn>

            <FadeIn delay={0.3} className="bg-gray-50 border border-gray-200/80 rounded-3xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-2xl font-black mx-auto mb-4">
                ⭐
              </div>
              <p className="text-5xl font-black text-gray-900 font-heading">{RESULTS_STATS.jeeAdvancedQualified}</p>
              <p className="font-bold text-gray-800 text-base mt-2">JEE Advanced Qualified</p>
              <p className="text-gray-500 text-xs mt-1">IIT Admissions from Lakshya Mathura</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <AdmissionCta />
    </>
  );
}
