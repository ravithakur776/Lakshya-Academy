"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/homepage-data";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-20 md:py-28 bg-white" id="faq">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Left — Header */}
          <FadeIn className="lg:sticky lg:top-24">
            <span className="eyebrow">FAQs</span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-5">
              Got Questions?
              <br />
              <span className="text-primary">We&apos;ve Got Answers.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Everything parents and students need to know before joining
              Lakshya Academy. Still have questions?
            </p>

            {/* Contact CTA */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5">
              <p className="text-gray-700 font-semibold mb-1">Still have questions?</p>
              <p className="text-gray-500 text-sm mb-4">
                Talk directly with our counselling team. We&apos;re available 7 days a week.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  📞 Call Now
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#22c55e] transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right — Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  openId === faq.id
                    ? "border-primary/30 bg-primary/2 shadow-sm shadow-primary/10"
                    : "border-gray-100 bg-white"
                )}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={openId === faq.id}
                >
                  <span className={cn(
                    "font-heading font-semibold text-[0.95rem] leading-snug transition-colors",
                    openId === faq.id ? "text-primary" : "text-gray-900"
                  )}>
                    {faq.question}
                  </span>
                  <span className={cn(
                    "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
                    openId === faq.id ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                  )}>
                    {openId === faq.id
                      ? <Minus className="h-3.5 w-3.5" />
                      : <Plus className="h-3.5 w-3.5" />
                    }
                  </span>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-primary/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
