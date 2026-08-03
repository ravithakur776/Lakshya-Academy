import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, ArrowRight, CheckCircle, Clock, Users, BookOpen, ShieldCheck } from "lucide-react";
import { coursesData } from "@/data/courses-data";
import { facultyMembersData } from "@/data/faculty-data";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { AdmissionCta } from "@/components/sections/admission-cta";
import { SITE_CONFIG } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return coursesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = coursesData.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.courseName} (${course.name}) | Lakshya Academy Mathura`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = coursesData.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${course.targetClass} · Maximum ${course.batchSize} Students`}
        title={course.courseName}
        titleHighlight={`(${course.name})`}
        description={course.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Courses", href: "/courses" }, { label: course.courseName }]}
        ctaPrimary={{ label: "Apply for Course", href: "/contact" }}
        ctaSecondary={{ label: "Register for LTPE 2026", href: "/ltpe-registration" }}
        size="md"
      />

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Course Highlights & Overview</h2>
                <p className="text-gray-600 leading-relaxed text-sm">{course.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                  <Clock className="h-6 w-6 text-primary mb-2" />
                  <p className="font-bold text-gray-900 text-sm">Duration</p>
                  <p className="text-gray-500 text-xs mt-0.5">{course.duration}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <p className="font-bold text-gray-900 text-sm">Batch Size</p>
                  <p className="text-gray-500 text-xs mt-0.5">Strictly {course.batchSize} Students</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Subjects Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {course.subjects.map((subj) => (
                    <span key={subj} className="bg-primary/10 text-primary border border-primary/20 font-bold px-4 py-2 rounded-xl text-sm">
                      {subj}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Key Benefits</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Taught directly by IIT (BHU) alumni directors.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Daily Practice Problems (DPPs) and weekly computer-based tests.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Personal 1-on-1 daily doubt resolution slots.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Up to 100% scholarship available through LTPE 2026.</li>
                </ul>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-3xl p-6 h-fit space-y-6">
              <h3 className="text-xl font-bold font-heading text-gray-900">Batch Details</h3>
              <div className="space-y-4 text-xs font-semibold text-gray-700">
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500">Target Exam</span>
                  <span className="text-gray-900 font-bold">JEE Main & Advanced</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500">Batch Timings</span>
                  <span className="text-gray-900 font-bold">{course.timings.join(" / ")}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200/60">
                  <span className="text-gray-500">Fee Structure</span>
                  <span className="text-primary font-bold">{course.fee}</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
              >
                <span>Enroll in {course.courseName}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <AdmissionCta />
    </>
  );
}
