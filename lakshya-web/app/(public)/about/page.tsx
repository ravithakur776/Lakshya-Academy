import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { AboutDirector } from "@/components/sections/about-director";
import { WhyLakshyaSection } from "@/components/sections/why-lakshya";
import { FacilitiesGrid } from "@/components/sections/facilities-grid";
import { AdmissionCta } from "@/components/sections/admission-cta";

export const metadata: Metadata = {
  title: "About Us | Best IIT JEE Coaching in Mathura — Lakshya Academy",
  description: "Learn about Lakshya Academy — Mathura's #1 Best IIT JEE Coaching Institute founded in 2017 by IIT (BHU) alumni directors Mr. Vikas Shandilya & Mr. Pushpendra Sharma.",
  openGraph: {
    title: "About Lakshya Academy | Best IIT JEE Coaching in Mathura",
    description: "Led by IIT (BHU) alumni directors with 17+ years experience. Small 50-student batches, concept-based learning, and proven top ranks.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story & Vision"
        title="Built on Trust."
        titleHighlight="Led by IITians."
        description="Founded in 2017 in Mathura by IIT (BHU) alumni, Lakshya Academy was established to deliver world-class IIT-JEE preparation through concept-based learning and personal mentoring."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        ctaPrimary={{ label: "Explore Courses", href: "/courses" }}
        ctaSecondary={{ label: "Meet Our Faculty", href: "/faculty" }}
        size="lg"
      />

      {/* IIT BHU Directors Spotlight */}
      <AboutDirector />

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <SectionHeading
                eyebrow="Established 2017"
                title="Our Journey &"
                titleHighlight="Philosophy"
                align="left"
                className="mb-8"
              />
              <div className="space-y-5 text-gray-600 leading-relaxed text-sm">
                <p>
                  Founded in 2017, Lakshya Academy was established with the vision of providing quality IIT-JEE education in Mathura.
                </p>
                <p>
                  Led by IIT (BHU) alumni, the academy focuses on concept-based learning, disciplined preparation, personal mentoring, and continuous performance analysis.
                </p>
                <p>
                  Over the years Lakshya Academy has helped hundreds of students strengthen their fundamentals and successfully qualify competitive examinations.
                </p>
                <p>
                  The institute believes that every student deserves personalized guidance and an environment where potential is transformed into performance.
                </p>
              </div>
            </FadeIn>

            {/* Key stats */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Established", value: "2017", sub: "Founded in Mathura" },
                  { title: "Leadership", value: "IIT (BHU)", sub: "Alumni Directors" },
                  { title: "Experience", value: "17+ Yrs", sub: "Teaching Expertise" },
                  { title: "Top Rank", value: "AIR 272", sub: "Sabal Agrawal (JEE Adv 2025)" },
                ].map((card) => (
                  <div key={card.title} className="bg-gray-50/80 rounded-2xl p-5 text-center border border-gray-200/80">
                    <p className="font-heading font-black text-2xl text-primary">{card.value}</p>
                    <p className="font-bold text-gray-900 text-sm mt-1">{card.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{card.sub}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 10 Pillars of Trust */}
      <WhyLakshyaSection />

      {/* 12 Facilities */}
      <FacilitiesGrid />

      <AdmissionCta />
    </>
  );
}
