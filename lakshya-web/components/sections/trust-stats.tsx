"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/common/count-up";
import { trustStats } from "@/data/homepage-data";
import { Container } from "@/components/common/container";

export function TrustStats() {
  return (
    <section className="py-12 bg-gradient-to-r from-[#0B5C2D] via-[#0F7A3C] to-[#0D6B34] relative overflow-hidden shadow-lg border-y border-emerald-500/20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl xl:text-5xl font-black text-white font-heading tracking-tight">
                {typeof stat.value === "number" ? (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                ) : (
                  <span>{stat.value}{stat.suffix}</span>
                )}
              </div>
              <p className="text-emerald-100 text-xs md:text-sm font-bold mt-2 leading-tight uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
