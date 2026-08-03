import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Users, BookOpen } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { coursesData } from "@/data/courses-data";
import { AdmissionCta } from "@/components/sections/admission-cta";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Courses | Aspire, Zenith & Excel — Lakshya Academy Mathura",
  description: "Explore Aspire (Class 11), Zenith (Class 12), and Excel (Droppers) courses at Lakshya Academy, Mathura. 50 students per batch, Morning & Evening timings.",
  openGraph: {
    title: "Classroom Courses | Lakshya Academy Mathura",
    description: "Targeted IIT-JEE & NEET preparation led by IIT (BHU) alumni directors.",
  },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Targeted Classroom Courses"
        title="Courses Designed"
        titleHighlight="for Top Ranks"
        description="Every program at Lakshya Academy is structured around small batches (50 students), concept-based learning, weekly DPPs, and continuous performance analysis."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Courses" }]}
        ctaPrimary={{ label: "Register for LTPE 2026", href: "/ltpe-registration" }}
        ctaSecondary={{ label: "Contact Us", href: "/contact" }}
      />

      {/* Courses Cards */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Our Batches"
            title="Classroom Programs"
            description="Physics • Chemistry • Mathematics"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {coursesData.map((course, i) => (
              <FadeIn key={course.id} delay={i * 0.15}>
                <div className="bg-gray-50/80 border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                        {course.targetClass}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-200/60 px-2.5 py-1 rounded-full">
                        Batch Size: {course.batchSize}
                      </span>
                    </div>

                    <h3 className="text-3xl font-black font-heading text-gray-900">{course.courseName}</h3>
                    <p className="text-xs font-bold text-primary mt-1">{course.name}</p>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">{course.description}</p>

                    <div className="mt-6 pt-6 border-t border-gray-200/60 space-y-2 text-xs font-semibold text-gray-700">
                      <div className="flex items-center justify-between">
                        <span>Duration:</span>
                        <span className="text-gray-900 font-bold">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Subjects:</span>
                        <span className="text-gray-900 font-bold">{course.subjects.join(", ")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Batch Timings:</span>
                        <span className="text-gray-900 font-bold">{course.timings.join(" / ")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Fee Structure:</span>
                        <span className="text-primary font-bold">{course.fee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200/60">
                    <Link
                      href={ROUTES.contact}
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md"
                    >
                      <span>Apply for {course.courseName}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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
