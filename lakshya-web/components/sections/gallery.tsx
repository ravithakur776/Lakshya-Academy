"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { galleryItems } from "@/data/homepage-data";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";

export function GallerySection() {
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section className="py-20 md:py-28 bg-white" id="gallery">
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">Campus & Celebrations</span>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mt-3">
            Experience Lakshya Academy Life
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Glimpses of JEE toppers celebrations, interactive classrooms, and grand victory rallies in Mathura.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => setLightbox(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`} />
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-300 flex flex-col justify-end p-5">
                <div className="translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-2 w-9 h-9 flex items-center justify-center mb-2 text-white">
                    <ZoomIn className="h-4 w-4" />
                  </div>
                  <p className="text-white font-bold text-base leading-tight">{item.title}</p>
                  <p className="text-amber-300 text-xs font-semibold mt-1">{item.category} • {item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10"
              >
                {lightbox.image ? (
                  <Image
                    src={lightbox.image}
                    alt={lightbox.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${lightbox.gradient} flex items-center justify-center`}>
                    <span className="text-9xl">{lightbox.icon}</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white">
                  <p className="font-heading font-bold text-xl sm:text-2xl">{lightbox.title}</p>
                  <p className="text-amber-400 text-sm font-semibold mt-1">{lightbox.category} • {lightbox.date}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
