import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { TrustStats } from "@/components/sections/trust-stats";
import { AboutDirector } from "@/components/sections/about-director";
import { WhyLakshyaSection } from "@/components/sections/why-lakshya";
import { CoursesSection } from "@/components/sections/courses";
import { LtpeSection } from "@/components/sections/ltpe";
import { ResultsSection } from "@/components/sections/results";
import { FacilitiesGrid } from "@/components/sections/facilities-grid";
import { GoogleReviewsSection } from "@/components/sections/google-reviews";
import { StudentTestimonials } from "@/components/sections/testimonials";
import { ParentTestimonials } from "@/components/sections/parent-testimonials";
import { GallerySection } from "@/components/sections/gallery";
import { BlogSection } from "@/components/sections/blog";
import { FaqSection } from "@/components/sections/faq";
import { AdmissionCta } from "@/components/sections/admission-cta";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/common/back-to-top";
import { CursorGlow } from "@/components/common/cursor-glow";

// ── SEO ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Best IIT JEE Coaching in Mathura | Lakshya Academy (IIT BHU Alumni)",
  description:
    "Lakshya Academy is the #1 Best IIT JEE Coaching Institute in Mathura, led directly by IIT (BHU) alumni directors Mr. Vikas Shandilya & Mr. Pushpendra Sharma. Proven JEE Advanced AIR 272 (Sabal Agrawal). Admissions open for Class 11, Class 12 & Droppers in Krishna Nagar, Mathura.",
  keywords: [
    "Best IIT JEE Coaching in Mathura",
    "Top IIT JEE Coaching Institute Mathura",
    "Best Coaching in Mathura for JEE Main and Advanced",
    "IIT JEE Coaching Krishna Nagar Mathura",
    "Lakshya Academy Mathura",
    "Vikas Shandilya IIT BHU",
    "Pushpendra Sharma IIT BHU",
    "Sabal Agrawal AIR 272",
    "LTPE 2026 scholarship exam Mathura",
    "Best Coaching for Class 11 12 and Droppers Mathura",
  ],
  openGraph: {
    title: "Best IIT JEE Coaching in Mathura | Lakshya Academy (IIT BHU Alumni)",
    description: "Taught directly by IIT (BHU) alumni directors with 17+ years experience. Proven top ranker Sabal Agrawal AIR 272 (JEE Advanced 2025). Small 50-student batches.",
    type: "website",
    locale: "en_IN",
  },
};

// ── Homepage ──────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <CursorGlow />
      <AnnouncementBar />
      <Navbar />

      <main id="main-content">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Trust Counters */}
        <TrustStats />

        {/* 3. IIT (BHU) Directors Spotlight */}
        <AboutDirector />

        {/* 4. 10 Pillars of Trust */}
        <WhyLakshyaSection />

        {/* 5. Courses (Aspire 11th, Zenith 12th, Excel Dropper) */}
        <CoursesSection />

        {/* 6. Sabal Agrawal AIR 272 Results Spotlight */}
        <ResultsSection />

        {/* 7. LTPE 2026 Exam Highlight Banner */}
        <LtpeSection />

        {/* 8. 12 Official Facilities */}
        <FacilitiesGrid />

        {/* 10. Google Reviews 4.7★ (211 Reviews) */}
        <GoogleReviewsSection />

        {/* 11. Student Testimonials */}
        <StudentTestimonials />

        {/* 12. Parent Testimonials */}
        <ParentTestimonials />

        {/* 13. Gallery */}
        <GallerySection />

        {/* 14. Blog */}
        <BlogSection />

        {/* 15. FAQ */}
        <FaqSection />

        {/* 16. Final Admission CTA */}
        <AdmissionCta />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
