import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { ContactForm } from "@/components/forms/contact-form";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Lakshya Academy — Krishna Nagar Mathura",
  description: "Contact Lakshya Academy Mathura. Address: 190/2, Above PC Jewellers, Krishna Nagar, Mathura. Phone: +91 9319098141, +91 7895060239. Email: 2017lakshya@gmail.com",
  openGraph: {
    title: "Contact Lakshya Academy | IIT-JEE & NEET Coaching Mathura",
    description: "Get in touch with our IIT (BHU) alumni directors for free academic counselling and admission guidance.",
  },
};

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    details: [SITE_CONFIG.phone, SITE_CONFIG.phoneAlternate],
    sub: "Mon–Sun, 8:00 AM – 8:00 PM",
    href: `tel:${SITE_CONFIG.phone}`,
    color: "from-blue-500 to-indigo-600",
    cta: "Call Now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Us",
    details: [SITE_CONFIG.phone],
    sub: "Instant assistance on WhatsApp",
    href: `https://wa.me/${SITE_CONFIG.whatsapp}`,
    color: "from-emerald-500 to-green-600",
    cta: "Message Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [SITE_CONFIG.email],
    sub: "Response within 24 hours",
    href: `mailto:${SITE_CONFIG.email}`,
    color: "from-rose-500 to-pink-600",
    cta: "Send Email",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: [SITE_CONFIG.address.building, `${SITE_CONFIG.address.area}, ${SITE_CONFIG.address.city}`],
    sub: "Mon–Sat 8:00 AM – 7:30 PM",
    href: SITE_CONFIG.address.googleMapsUrl,
    color: "from-amber-500 to-orange-600",
    cta: "Get Directions",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to"
        titleHighlight="Hear from You"
        description="Whether you have questions about Aspire, Zenith, or Excel courses, admissions, or LTPE 2026 — our team is here to guide you."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        ctaPrimary={{ label: "WhatsApp Us", href: `https://wa.me/${SITE_CONFIG.whatsapp}` }}
        size="sm"
      />

      {/* Contact cards */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                  <div className="p-5">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-gray-900 mb-2">{card.title}</h3>
                    {card.details.map(d => <p key={d} className="text-gray-700 text-sm font-medium">{d}</p>)}
                    <p className="text-gray-400 text-xs mt-1 mb-4">{card.sub}</p>
                    <span className={`text-xs font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent group-hover:underline`}>{card.cta} →</span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Form + Map */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <FadeIn>
              <SectionHeading eyebrow="Send a Message" title="Write to" titleHighlight="Our Team" align="left" className="mb-6" />
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
                <ContactForm />
              </div>
            </FadeIn>

            {/* Map + Working Hours */}
            <FadeIn delay={0.2} className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                <h3 className="font-heading font-bold text-gray-900 text-lg">Lakshya Academy Mathura</h3>
                <p className="text-gray-600 text-sm mt-1">{SITE_CONFIG.address.building}, {SITE_CONFIG.address.area}</p>
                <p className="text-gray-500 text-xs mt-0.5">{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.pincode}</p>
                <a
                  href={SITE_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                >
                  View Location on Google Maps
                </a>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-heading font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Office & Counselling Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday – Saturday", hours: "8:00 AM – 7:30 PM", open: true },
                    { day: "Sunday", hours: "9:00 AM – 2:00 PM", open: true },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 font-medium">{day}</span>
                      <span className="font-bold text-primary">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hi! I want to know more about Lakshya Academy courses.")}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#22c55e] text-white font-bold p-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg">
                <MessageCircle className="h-6 w-6" />
                <div>
                  <p>Chat on WhatsApp</p>
                  <p className="text-white/80 text-xs font-normal">+91 9319098141</p>
                </div>
              </a>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
