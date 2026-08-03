"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus } from "lucide-react";
import { faqCategories } from "@/data/extended-data";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

export default function FaqClientPage() {
  const [activeCategory, setActiveCategory] = useState("admissions");
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = faqCategories.find(c => c.id === activeCategory);

  const filteredFaqs = searchQuery.trim()
    ? faqCategories.flatMap(cat => cat.faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    : (currentCategory?.faqs ?? []);

  return (
    <section className="py-12 bg-white min-h-[60vh]">
      <Container>
        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search your question..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm text-sm"
            />
          </div>
        </div>

        {!searchQuery && (
          /* Category tabs */
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {faqCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenId(null); }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length === 0 && (
            <p className="text-center text-gray-400 py-8">No questions found for &ldquo;{searchQuery}&rdquo;. Try a different keyword.</p>
          )}
          {filteredFaqs.map((faq, i) => {
            const id = `faq-${i}`;
            const isOpen = openId === id;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  isOpen ? "border-primary/30 shadow-sm shadow-primary/10" : "border-gray-100 bg-white"
                )}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : id)}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left"
                >
                  <span className={cn("font-semibold leading-snug", isOpen ? "text-primary" : "text-gray-900")}>{faq.q}</span>
                  <span className={cn("w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all", isOpen ? "bg-primary text-white" : "bg-gray-100 text-gray-500")}>
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-primary/10 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
