"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/common/container";
import { CountUp } from "@/components/common/count-up";

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 5000, suffix: "+", label: "Students Coached" },
  { value: 80, suffix: "+", label: "IIT/NIT Selections" },
  { value: 15, suffix: "+", label: "Expert Faculty" },
  { value: 82, suffix: "%", label: "Success Rate" },
];

export function AboutStats() {
  return (
    <div className="bg-white border-b border-gray-100 py-12">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-black text-primary">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
