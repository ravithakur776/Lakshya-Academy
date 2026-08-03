import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Lakshya Academy",
  description: "Read Lakshya Academy's privacy policy — how we collect, use, and protect your personal information.",
};

const lastUpdated = "July 1, 2025";

export default function PrivacyPage() {
  return (
    <section className="py-20 bg-white">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-wider">Legal</span>
          <h1 className="font-heading font-black text-4xl text-gray-900 mt-4 mb-3">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: {lastUpdated}</p>
        </div>

        {/* Intro */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mb-10">
          <p className="text-gray-700">
            {SITE_CONFIG.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website or interact with our services.
          </p>
        </div>

        {/* Sections */}
        <div className="prose prose-gray max-w-none space-y-10">
          {[
            {
              title: "1. Information We Collect",
              content: `We collect information you provide directly to us when you:
              
• Fill out an admission or enquiry form
• Register for LTPE (Lakshya Talent & Potential Examination)
• Contact us via phone, email, or WhatsApp
• Subscribe to our newsletter or blog updates

This information may include: Full name, date of birth, phone number, email address, home address, school name, class/grade, parent/guardian details, and academic performance data.`,
            },
            {
              title: "2. How We Use Your Information",
              content: `We use the information we collect to:

• Process admission applications and LTPE registrations
• Contact you regarding your enquiry or application
• Send you information about our courses, results, and events
• Provide personalized academic counselling
• Improve our services and website experience
• Comply with legal obligations

We do not sell or rent your personal information to third parties under any circumstances.`,
            },
            {
              title: "3. Information Sharing",
              content: `We may share your information with:

• Faculty members for academic purposes (student names, class, performance only)
• Service providers who assist in our operations (e.g., email platform, payment processor)
• Legal authorities when required by law

All third parties are bound by confidentiality agreements and may only use your data for the specified purpose.`,
            },
            {
              title: "4. Data Security",
              content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or destruction. This includes:

• Secure HTTPS connections on our website
• Password-protected internal systems
• Limited staff access on a need-to-know basis
• Regular security reviews

However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
            },
            {
              title: "5. Cookies",
              content: `Our website may use cookies to enhance your browsing experience. These are small text files stored on your device. You can configure your browser to refuse cookies, although this may limit some website functionality.

We use cookies for: Session management, analytics (via Google Analytics), and preference storage.`,
            },
            {
              title: "6. Your Rights",
              content: `You have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your information (subject to legal obligations)
• Opt out of marketing communications at any time
• Lodge a complaint with the relevant data protection authority

To exercise any of these rights, contact us at: ${SITE_CONFIG.email}`,
            },
            {
              title: "7. Children's Privacy",
              content: `Our services are intended for students and their parents/guardians. We take special care with data related to students under 18. Parental consent is required for processing information of students under 13 years of age.`,
            },
            {
              title: "8. Changes to This Policy",
              content: `We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page with an updated date. We encourage you to review this policy regularly.`,
            },
            {
              title: "9. Contact Us",
              content: `If you have questions about this Privacy Policy or our privacy practices, contact us at:

${SITE_CONFIG.name}
${SITE_CONFIG.address.building}, ${SITE_CONFIG.address.area}
${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} – ${SITE_CONFIG.address.pincode}
Email: ${SITE_CONFIG.email}
Phone: ${SITE_CONFIG.phone}`,
            },
          ].map((section) => (
            <div key={section.title} className="border-b border-gray-100 pb-8">
              <h2 className="font-heading font-bold text-gray-900 text-xl mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
