"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap, Clock } from "lucide-react";
import { faculty } from "@/data/homepage-data";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FacultySection() {
  return (
    <section className="py-20 md:py-28 bg-white" id="faculty">
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">Our Team</span>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mt-3">
            Learn from the Best
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Our faculty are IIT/NIT alumni with proven track records of producing
            top rankers in JEE Advanced, JEE Mains, and NEET.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Top gradient */}
              <div className={`h-28 bg-gradient-to-br ${member.avatarColor} relative flex items-end justify-center pb-0`}>
                {/* Decorative circles */}
                <div className="absolute top-2 right-2 w-20 h-20 rounded-full bg-white/10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/5" />

                {/* Avatar */}
                <div className="relative z-10 translate-y-1/2 w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center border-2 border-white">
                  <span className={`text-lg font-black bg-gradient-to-br ${member.avatarColor} bg-clip-text text-transparent`}>
                    {member.avatar}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 pb-6 px-5 text-center">
                {/* Subject badge */}
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${member.avatarColor} text-white mb-3`}>
                  {member.subject}
                </span>

                <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">{member.name}</h3>

                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-1">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {member.qualification}
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-4">
                  <Clock className="h-3.5 w-3.5" />
                  {member.experience} Experience
                </div>

                <p className="text-gray-500 text-xs leading-relaxed mb-5">
                  {member.description}
                </p>

                <Link
                  href={`/faculty/${member.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                >
                  View Profile <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <Link
            href="/faculty"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-2xl px-8 gap-2 border-gray-200 hover:border-primary hover:text-primary font-semibold group"
            )}
          >
            Meet All Faculty <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
