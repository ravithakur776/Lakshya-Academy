"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/ui/section-heading";

const events = [
  { year: "2010", title: "Lakshya Founded", desc: "Started with 12 students in a single room near Railway Station, Mathura. 3 IIT alumni, one big dream." },
  { year: "2013", title: "First Batch Results", desc: "First batch of JEE students — 4 out of 12 qualified JEE Advanced. 33% success rate in Year 1." },
  { year: "2015", title: "Campus Expansion", desc: "Moved to our current dedicated building with 5 classrooms, a library, and a science lab." },
  { year: "2017", title: "Foundation Program Launch", desc: "Launched Foundation Programs for Classes 8, 9, and 10. Began early-start strategy." },
  { year: "2019", title: "LTPE Scholarship Exam", desc: "Launched LTPE — Lakshya Talent & Potential Examination — making quality coaching accessible to all." },
  { year: "2021", title: "First AIR Top-100", desc: "Arjun Mehta secured AIR 87 in JEE Advanced 2021 — Lakshya's first AIR Top-100 student." },
  { year: "2023", title: "Digital Campus", desc: "Launched digital learning platform with recorded sessions, live doubt portals, and online mock tests." },
  { year: "2025", title: "1200+ Students Milestone", desc: "Lakshya Academy now serves 1,200+ active students with 15+ faculty and modern infrastructure." },
];

export function AboutTimeline() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionHeading eyebrow="Our Journey" title="15 Years of" titleHighlight="Excellence" />
        <div className="relative">
          {/* Centre line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-emerald-400 to-accent hidden md:block" />
          <div className="space-y-8">
            {events.map((event, i) => (
              <motion.div key={event.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Content */}
                <div className="flex-1 md:px-8">
                  <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full mb-2">{event.year}</span>
                    <h3 className="font-heading font-bold text-gray-900">{event.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{event.desc}</p>
                  </div>
                </div>
                {/* Dot */}
                <div className="hidden md:flex flex-shrink-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-lg z-10" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
