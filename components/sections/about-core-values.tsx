"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/ui/section-heading";

const values = [
  { icon: "💡", title: "Concept-First Learning", desc: "We never move forward without ensuring every student truly understands the 'why' behind every concept." },
  { icon: "🎯", title: "Student-Centric Approach", desc: "Every teaching method, every schedule, every resource is optimised for the student's success — not the institute's convenience." },
  { icon: "📊", title: "Data-Driven Results", desc: "We track every test, every DPP, every session. If a student struggles, we know it early and act immediately." },
  { icon: "🤝", title: "Integrity & Transparency", desc: "Honest performance reports, fair fees, no false promises. We build trust with parents through complete transparency." },
  { icon: "🏆", title: "Excellence Without Compromise", desc: "We set the bar at IIT — and we don't lower it for anyone. Our standards are non-negotiable." },
  { icon: "❤️", title: "Holistic Well-being", desc: "Academic excellence must come with mental wellness. We monitor student stress and offer counselling support year-round." },
];

export function AboutCoreValues() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading eyebrow="What We Stand For" title="Our Core" titleHighlight="Values" description="Six principles that guide every decision we make — from curriculum design to how we communicate with parents." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}
              className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <span className="text-3xl">{v.icon}</span>
              <h3 className="font-heading font-bold text-gray-900 mt-3 mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
