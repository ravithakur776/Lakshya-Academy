import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { facultyMembersData } from "@/data/faculty-data";
import { AdmissionCta } from "@/components/sections/admission-cta";

export const metadata: Metadata = {
  title: "Faculty & Directors | IIT (BHU) Alumni — Lakshya Academy Mathura",
  description: "Learn directly from IIT (BHU) alumni directors Mr. Vikas Shandilya (IIT BHU Mechanical) and Mr. Pushpendra Sharma (IIT BHU Mining) with 17+ years experience.",
  openGraph: {
    title: "Faculty & Directors | Lakshya Academy Mathura",
    description: "17+ years of experience mentoring top AIR rankers in Physics, Chemistry, and Mathematics.",
  },
};

export default function FacultyPage() {
  const directors = facultyMembersData.filter((f) => f.isDirector);

  return (
    <>
      <PageHero
        eyebrow="IIT (BHU) Directors"
        title="Taught Directly by"
        titleHighlight="IITians"
        description="At Lakshya Academy, you learn directly from our co-founders & directors who have 17+ years of dedicated teaching experience in competitive entrance coaching."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Faculty" }]}
        ctaPrimary={{ label: "Book Free Counselling", href: "/contact" }}
        size="md"
      />

      {/* Directors Section */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Core Leadership"
            title="Co-Founders & Directors"
            description="Leading from the front in classrooms every single day."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {directors.map((f, i) => (
              <FadeIn key={f.id} delay={i * 0.15}>
                <div className="bg-[#F4FAF6] border border-emerald-100/90 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-[#0F7A3C]/40 transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                      {/* Photo Avatar Container — Identical 1:1 Aspect Ratio Box */}
                      <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-[#0F7A3C]/30 shadow-md flex-shrink-0 bg-white p-1">
                        <Image
                          src={f.photoUrl}
                          alt={f.name}
                          fill
                          className="object-cover object-top rounded-xl"
                          sizes="144px"
                          priority
                        />
                      </div>

                      <div className="text-center sm:text-left flex-1">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5" /> IIT (BHU) Director
                          </span>
                          <span className="text-xs font-bold text-emerald-800 bg-white border border-emerald-100 px-3 py-1 rounded-full">
                            {f.experience} Experience
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black font-heading text-emerald-950">{f.name}</h3>
                        <p className="text-sm font-bold text-[#0F7A3C] mt-0.5">{f.title}</p>
                        <p className="text-xs font-semibold text-emerald-800 mt-0.5">{f.qualification}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-emerald-100">
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Teaching Subjects</p>
                      <p className="text-sm font-bold text-emerald-950 mt-0.5">{f.subjects.join(" • ")}</p>
                    </div>

                    <p className="text-emerald-900/80 text-sm mt-4 leading-relaxed font-medium">{f.bio}</p>

                    <div className="mt-4 bg-white border border-emerald-100 rounded-2xl p-4 text-xs italic text-emerald-950">
                      &ldquo;{f.philosophy}&rdquo;
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-emerald-100 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white rounded-xl p-3 border border-emerald-100">
                      <p className="text-lg font-black text-[#0F7A3C] font-heading">{f.experience}</p>
                      <p className="text-[10px] font-bold text-emerald-800 uppercase">Teaching Experience</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-emerald-100">
                      <p className="text-lg font-black text-amber-500 font-heading">{f.topRankers}</p>
                      <p className="text-[10px] font-bold text-emerald-800 uppercase">Top Rankers Mentored</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <AdmissionCta />
    </>
  );
}
