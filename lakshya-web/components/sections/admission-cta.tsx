"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

export function AdmissionCta() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-emerald-600 to-green-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 2px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-semibold text-white mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-white" />
              </span>
              Admissions Open 2026–27
            </div>

            <h2 className="font-heading text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              Ready to Begin Your
              <br />
              <span className="text-accent">IIT Journey?</span>
            </h2>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Join 1,200+ students who trusted Lakshya Academy to guide them to IITs.
              Book a free counselling session today — no strings attached.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-50",
                  "font-bold text-base px-8 py-4 rounded-2xl",
                  "shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 group"
                )}
              >
                Book Free Counselling
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hi! I want to know more about admissions at Lakshya Academy.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>

            {/* Trust line */}
            <p className="text-white/50 text-sm mt-8">
              No registration fees for counselling. 100% free.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
