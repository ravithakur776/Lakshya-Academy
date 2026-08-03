import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import FaqClientPage from "./faq-client";
import { AdmissionCta } from "@/components/sections/admission-cta";

export const metadata: Metadata = {
  title: "FAQ | Lakshya Academy — Admissions, Courses & Scholarship Questions",
  description: "Find answers to all your questions about Lakshya Academy — admissions, courses, fees, LTPE scholarship, faculty, and results.",
  openGraph: { title: "FAQ | Lakshya Academy", description: "All your questions about IIT-JEE coaching at Lakshya Academy answered." },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked"
        titleHighlight="Questions"
        description="Search through 30+ questions from parents and students. Can't find your answer? Call us directly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        size="sm"
      />
      <FaqClientPage />
      <AdmissionCta />
    </>
  );
}
