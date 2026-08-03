"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogs } from "@/data/homepage-data";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BlogSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50" id="blog">
      <Container>
        <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="eyebrow">Knowledge Hub</span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mt-3">
              Latest from Our Educators
            </h2>
          </div>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full gap-2 border-gray-300 hover:border-primary hover:text-primary group flex-shrink-0"
            )}
          >
            View All Posts <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  {/* Blog thumbnail header */}
                  <div className="h-52 bg-gradient-to-br from-gray-100 to-emerald-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <span className="text-7xl opacity-25">📚</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors duration-300" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {post.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-gray-900 leading-tight mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                    Read More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
