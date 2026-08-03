"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { buttonVariants } from "@/components/ui/button";
import { navLinks } from "@/data/homepage-data";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Premium Sticky Navbar — Pure Green & White Theme
 *
 * - Sticky top bar below announcement banner
 * - High-contrast deep emerald text on solid white background
 * - Mobile: slide-in drawer
 * - Active link highlighting
 */
export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-40 transition-all duration-300",
          "bg-white/95 backdrop-blur-md border-b border-emerald-100/90 shadow-sm"
        )}
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* ── Logo ─────────────────────────────────────── */}
            <Link href="/" aria-label="Lakshya Academy Home">
              <Logo size="md" />
            </Link>

            {/* ── Desktop Navigation ──────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-2 text-xs md:text-sm font-bold rounded-xl transition-all duration-200",
                      active
                        ? "text-[#0F7A3C] bg-emerald-50/80 font-extrabold"
                        : "text-emerald-950 hover:text-[#0F7A3C] hover:bg-emerald-50/50"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0F7A3C] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── CTA ─────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 hover:text-[#0F7A3C] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#0F7A3C]" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <Link
                href="/ltpe-registration#register"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "bg-[#0F7A3C] hover:bg-[#0D6B34] text-white rounded-full px-5 py-2 font-bold shadow-md shadow-emerald-700/20 hover:shadow-emerald-700/30 transition-all duration-300"
                )}
              >
                Free LTPE Test
              </Link>
            </div>

            {/* ── Mobile Hamburger ─────────────────────────── */}
            <button
              className="lg:hidden p-2 rounded-xl text-emerald-950 hover:bg-emerald-50 transition-colors"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-50 bg-emerald-950/40 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col border-l border-emerald-100"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-emerald-100 bg-emerald-50/30">
                <Logo size="md" />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-emerald-950 hover:bg-emerald-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl text-xs font-bold transition-all",
                          active
                            ? "bg-[#0F7A3C] text-white shadow-md shadow-emerald-700/20"
                            : "text-emerald-950 hover:bg-emerald-50 hover:text-[#0F7A3C]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-emerald-100 bg-emerald-50/40 space-y-3">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-950 py-3 rounded-xl bg-white border border-emerald-200"
                >
                  <Phone className="h-4 w-4 text-[#0F7A3C]" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
                <Link
                  href="/ltpe-registration#register"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "w-full justify-center bg-[#0F7A3C] hover:bg-[#0D6B34] text-white rounded-xl font-bold py-3 text-xs shadow-md shadow-emerald-700/20"
                  )}
                >
                  Free LTPE Test
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
