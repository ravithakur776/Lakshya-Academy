"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FACILITIES } from "@/lib/constants";
import { Building, Shield, Users, BookOpen, Clock, Award, CheckCircle, Video, PlayCircle, ParkingSquare, Wifi, Droplets } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building,
  Shield,
  Users,
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  Video,
  PlayCircle,
  ParkingSquare,
  Wifi,
  Droplets,
};

export function FacilitiesGridSection() {
  return (
    <section className="py-24 bg-[#F4FAF6] relative border-t border-b border-emerald-100/60">
      <Container>
        <SectionHeading
          eyebrow="12 World-Class Amenities"
          title="Campus Infrastructure & Student Support"
          description="Designed to maintain focus, health, and academic consistency throughout the demanding JEE preparation journey."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {FACILITIES.map((facility, i) => {
            const IconComponent = ICON_MAP[facility.icon] || CheckCircle;
            return (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-emerald-100/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#0F7A3C]/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F7A3C]/10 border border-[#0F7A3C]/20 flex items-center justify-center text-[#0F7A3C] mb-4 group-hover:bg-[#0F7A3C] group-hover:text-white transition-colors">
                  <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-emerald-950 text-lg font-heading mb-1.5">{facility.title}</h3>
                <p className="text-emerald-900/80 text-xs leading-relaxed font-medium">{facility.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export const FacilitiesGrid = FacilitiesGridSection;
