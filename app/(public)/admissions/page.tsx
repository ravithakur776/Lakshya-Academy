import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, FileText, ArrowRight, Download, Gift } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { AdmissionForm } from "@/components/forms/admission-form";
import { AdmissionCta } from "@/components/sections/admission-cta";

export const metadata: Metadata = {
  title: "Admissions 2026-27 | Lakshya Academy — Apply Now",
  description: "Apply for admission to Lakshya Academy's IIT-JEE coaching programs for 2026-27. Classes 11-12 and Dropper batch available. Simple process, fast confirmation.",
  openGraph: {
    title: "Admissions | Lakshya Academy IIT-JEE Coaching",
    description: "Simple 4-step admission process. Apply online, get diagnostic test, attend counselling, join your batch.",
  },
};

const admissionSteps = [
  { icon: "📝", title: "Fill Application", desc: "Complete the online form with student and parent details. Takes 5 minutes." },
  { icon: "📊", title: "Diagnostic Assessment", desc: "Attend a 45-minute assessment to identify current level and best batch placement." },
  { icon: "🤝", title: "Counselling Session", desc: "Meet with our academic counsellor to discuss your goals and the right program." },
  { icon: "🎓", title: "Batch Confirmed", desc: "Fee payment and batch assignment. Orientation session within 3 days." },
];

const documents = [
  "Class 10 Marksheet (or latest marksheet)",
  "School Leaving Certificate (if applicable)",
  "4 Recent Passport-size Photographs",
  "Aadhar Card (Student)",
  "Aadhar Card (Parent/Guardian)",
  "Completed Admission Form",
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions 2026–27"
        title="Start Your"
        titleHighlight="IIT Journey Today"
        description="Admissions are now open for the 2026–27 academic year. Limited seats available per batch. Apply early to secure your place."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
        ctaPrimary={{ label: "Apply Now", href: "#apply-form" }}
        ctaSecondary={{ label: "Download Brochure", href: "#brochure" }}
      />

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionHeading eyebrow="How It Works" title="Simple" titleHighlight="4-Step Process" description="From application to your first class in just 3-5 days." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-emerald-400 to-accent" />
            {admissionSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-2xl shadow-xl mx-auto mb-4 relative z-10 border-4 border-white">
                    {step.icon}
                  </div>
                  <span className="absolute top-3 right-3 font-black text-5xl text-gray-50 leading-none">0{i + 1}</span>
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Eligibility + Documents */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FadeIn>
              <h3 className="font-heading font-bold text-gray-900 text-xl mb-5 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" /> Eligibility Criteria
              </h3>
              <ul className="space-y-3">
                {[
                  "Students currently in Class 7 to 12",
                  "Students who have passed Class 12 (Dropper batch)",
                  "Any education board (CBSE, ICSE, UP Board, etc.)",
                  "Minimum 55% in the previous class examination",
                  "Genuine interest in pursuing engineering (IIT/NIT)",
                ].map((e) => (
                  <li key={e} className="flex items-start gap-3 text-gray-700 text-sm">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /> {e}
                  </li>
                ))}
              </ul>
              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mt-6">
                <p className="font-semibold text-gray-900 flex items-center gap-2 mb-1"><Gift className="h-4 w-4 text-accent" /> Scholarship Available</p>
                <p className="text-gray-500 text-sm">Students with 90%+ in their previous class can get direct merit-based fee concessions of up to 20%. Appear for LTPE for up to 100% scholarship.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h3 className="font-heading font-bold text-gray-900 text-xl mb-5 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Required Documents
              </h3>
              <ul className="space-y-3 mb-6">
                {documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="text-primary text-base">→</span> {doc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="/brochures/lakshya-academy-2025.pdf" download
                  className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
                  <Download className="h-4 w-4" /> Download Full Brochure
                </a>
                <Link href="/ltpe-registration"
                  className="inline-flex items-center gap-2 bg-accent text-gray-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-colors">
                  <Gift className="h-4 w-4" /> Apply for Scholarship
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-20 bg-gray-50">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Apply Now" title="Submit Your" titleHighlight="Application" description="Fill in the form below. Our team will contact you within 24 hours to schedule the diagnostic test." />
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-10">
            <AdmissionForm />
          </div>
        </Container>
      </section>

      <AdmissionCta />
    </>
  );
}
