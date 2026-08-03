import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | Lakshya Academy",
  description: "Read Lakshya Academy's terms and conditions for enrollment, course policies, refund policy, and student conduct guidelines.",
};

const lastUpdated = "July 1, 2025";

export default function TermsPage() {
  return (
    <section className="py-20 bg-white">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-wider">Legal</span>
          <h1 className="font-heading font-black text-4xl text-gray-900 mt-4 mb-3">Terms &amp; Conditions</h1>
          <p className="text-gray-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10">
          <p className="text-amber-900 text-sm">
            <strong>Please read these Terms &amp; Conditions carefully</strong> before enrolling at Lakshya Academy. 
            By enrolling, you agree to be bound by these terms.
          </p>
        </div>

        <div className="space-y-10">
          {[
            {
              title: "1. Enrollment & Admission",
              content: `1.1 Admission to Lakshya Academy is subject to availability of seats in the requested batch.

1.2 The institute reserves the right to admit or deny admission to any applicant at its discretion.

1.3 A diagnostic assessment may be required before final batch placement.

1.4 Admission is confirmed only upon payment of the applicable fees and submission of all required documents.

1.5 Students must provide accurate and truthful information during the admission process. Misrepresentation may result in cancellation of admission.`,
            },
            {
              title: "2. Fee Policy",
              content: `2.1 Fees are due as per the schedule provided at the time of admission.

2.2 A late fee of ₹200 per week may be charged for payments delayed beyond the due date.

2.3 Fees once paid are non-refundable except in cases covered under the Refund Policy (Section 3).

2.4 The institute reserves the right to revise fees for subsequent academic years with 30 days prior notice.

2.5 Students on LTPE scholarships must maintain the required academic performance to retain their scholarship.`,
            },
            {
              title: "3. Refund Policy",
              content: `3.1 If a student withdraws before the commencement of classes: 80% of course fee refunded.

3.2 Within the first 7 days of class commencement: 60% of course fee refunded.

3.3 After 7 days from class commencement: No refund is applicable.

3.4 Registration fees, diagnostic test fees, and study material charges are non-refundable under any circumstances.

3.5 Refund requests must be submitted in writing and will be processed within 15 working days.`,
            },
            {
              title: "4. Attendance Policy",
              content: `4.1 Students are expected to maintain a minimum 80% attendance in their enrolled batch.

4.2 Students falling below 75% attendance may be denied access to examinations at the institute's discretion.

4.3 Leave applications must be submitted in advance except in medical emergencies.

4.4 Medical leaves of 7+ days must be supported by a doctor's certificate.`,
            },
            {
              title: "5. Student Conduct",
              content: `5.1 Students are expected to maintain respectful conduct toward faculty, staff, and fellow students at all times.

5.2 Ragging, bullying, discrimination, or harassment of any kind is strictly prohibited and grounds for immediate expulsion without refund.

5.3 Mobile phones must be on silent mode during classes. Repeated violations may result in confiscation.

5.4 Disciplinary action, including suspension or expulsion, may be taken for serious violations of institute rules.

5.5 The decision of the Director on disciplinary matters is final.`,
            },
            {
              title: "6. Academic Policies",
              content: `6.1 Switching between batches is permitted only once per academic year, subject to seat availability.

6.2 All study material provided is copyrighted and may not be reproduced or shared without written permission.

6.3 Test scores and performance data are shared only with the enrolled student and their parents/guardians.

6.4 The institute does not guarantee specific results, rank, or selection in any examination. Results depend on individual student effort.`,
            },
            {
              title: "7. LTPE Terms",
              content: `7.1 LTPE (Lakshya Talent & Potential Examination) is held annually on the advertised date and venue.

7.2 The hall ticket must be carried to the examination center. No entry without hall ticket.

7.3 Scholarships are awarded based on LTPE rank and are applicable only for the current academic year.

7.4 Scholarship students must renew scholarship eligibility each year through continued academic performance.

7.5 The institute's decision on LTPE results and scholarship allocation is final and binding.`,
            },
            {
              title: "8. Intellectual Property",
              content: `8.1 All course materials, study modules, practice papers, and digital content provided by Lakshya Academy are the intellectual property of the institute.

8.2 Recording, photographing, or reproducing any classroom content or study material is prohibited without prior written consent.

8.3 Unauthorized reproduction will be subject to appropriate legal action under Indian Copyright Law.`,
            },
            {
              title: "9. Limitation of Liability",
              content: `9.1 Lakshya Academy shall not be held liable for any indirect, consequential, or incidental damages arising from enrollment or use of our services.

9.2 The institute is not responsible for loss of personal belongings on campus.

9.3 In case of disputes, the courts of Mathura, Uttar Pradesh shall have exclusive jurisdiction.`,
            },
            {
              title: "10. Contact & Grievance Redressal",
              content: `For questions, grievances, or complaints, contact:

Director, Lakshya Academy
${SITE_CONFIG.address.building}, ${SITE_CONFIG.address.area}
${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state}
Email: ${SITE_CONFIG.email}
Phone: ${SITE_CONFIG.phone}

All grievances will be acknowledged within 3 working days and resolved within 15 working days.`,
            },
          ].map((section) => (
            <div key={section.title} className="border-b border-gray-100 pb-8">
              <h2 className="font-heading font-bold text-gray-900 text-xl mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">{section.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
