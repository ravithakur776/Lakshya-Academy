import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Clock, Star, Users, ArrowRight } from "lucide-react";
import { facultyMembersData } from "@/data/faculty-data";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { AdmissionCta } from "@/components/sections/admission-cta";
import { SITE_CONFIG } from "@/lib/constants";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return facultyMembersData.map((f) => ({ id: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const member = facultyMembersData.find((f) => f.slug === id);
  if (!member) return {};
  return {
    title: `${member.name} — ${member.title} | Lakshya Academy Mathura`,
    description: `${member.name} (${member.qualification}) — ${member.experience} experience. Co-founder & Director at Lakshya Academy Mathura.`,
  };
}

export default async function FacultyProfilePage({ params }: Props) {
  const { id } = await params;
  const member = facultyMembersData.find((f) => f.slug === id);
  if (!member) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-white via-emerald-50/20 to-white py-20 relative overflow-hidden">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>›</span>
            <Link href="/faculty" className="hover:text-primary">Faculty</Link>
            <span>›</span>
            <span className="text-gray-900 font-semibold">{member.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                <GraduationCap className="h-4 w-4" /> IIT (BHU) Alumnus Director
              </div>

              <h1 className="text-4xl font-black font-heading text-gray-900">{member.name}</h1>
              <p className="text-lg font-bold text-primary">{member.title}</p>
              <p className="text-sm font-semibold text-gray-600">{member.qualification}</p>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Teaching Subjects</h3>
                <p className="text-base font-bold text-gray-900">{member.subjects.join(" • ")}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-2">About & Background</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-sm italic text-gray-800">
                &ldquo;{member.philosophy}&rdquo;
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-3xl p-6 space-y-6">
              <h3 className="text-xl font-bold font-heading text-gray-900">Mentor Metrics</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-black text-primary font-heading">{member.experience}</p>
                  <p className="text-xs text-gray-500 font-semibold">Teaching Experience</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-black text-gray-900 font-heading">{member.studentsCoached}</p>
                  <p className="text-xs text-gray-500 font-semibold">Students Mentored</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                  <p className="text-2xl font-black text-amber-500 font-heading">{member.topRankers}</p>
                  <p className="text-xs text-gray-500 font-semibold">Top JEE Rankers</p>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm"
              >
                <span>Book Counselling with {member.name.split(" ")[1]}</span>
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
