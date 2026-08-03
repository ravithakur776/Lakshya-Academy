"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { galleryItems as staticGalleryItems, galleryCategories, type GalleryItem } from "@/data/extended-data";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

export default function GalleryClientPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [allGalleryItems, setAllGalleryItems] = useState<GalleryItem[]>(staticGalleryItems);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lakshya_custom_gallery");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllGalleryItems([...parsed, ...staticGalleryItems]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const filtered = activeCategory === "All"
    ? allGalleryItems
    : allGalleryItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      {/* Category filter */}
      <div className="sticky top-[108px] z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <Container>
          <div className="flex flex-wrap gap-2 justify-center">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
                  activeCategory === cat
                    ? "bg-[#0F7A3C] text-white shadow-lg shadow-emerald-700/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Masonry grid */}
      <section className="py-12 bg-white">
        <Container>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  onClick={() => setLightbox(item)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-100"
                >
                  {item.image?.startsWith("data:") || item.image?.startsWith("/uploads/") ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-2 w-9 h-9 flex items-center justify-center mb-2 text-white">
                      <ZoomIn className="h-4 w-4" />
                    </div>
                    <p className="text-white font-bold text-base leading-tight">{item.title}</p>
                    <p className="text-amber-300 text-xs font-semibold mt-1">{item.category} · {item.date || "Lakshya Academy"}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 font-semibold">No photos in this category yet.</div>
          )}
        </Container>
      </section>

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
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10"
            >
              {lightbox.image?.startsWith("data:") || lightbox.image?.startsWith("/uploads/") ? (
                <img
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="w-full h-full object-contain"
                />
              ) : lightbox.image ? (
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
                  <span className="text-[120px]">{lightbox.icon}</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                <p className="font-heading font-bold text-white text-xl sm:text-2xl">{lightbox.title}</p>
                <p className="text-amber-400 text-sm font-semibold mt-1">{lightbox.category} · {lightbox.date || "Lakshya Academy"}</p>
              </div>
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/20 cursor-pointer">
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
