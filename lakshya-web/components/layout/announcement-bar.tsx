"use client";

import Link from "next/link";
import { Sparkles, Phone, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#0B5C2D] via-[#0F7A3C] to-[#0B5C2D] text-white text-xs font-semibold py-2 px-4 border-b border-emerald-600/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left message */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="hidden sm:inline-flex items-center gap-1 text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30 text-[10px] uppercase">
            <Sparkles className="h-3 w-3" /> LTPE 2026
          </span>
          <p className="truncate">
            Registrations Open for LTPE 2026 Exam (23 August 2026) — Win Up to 100% Scholarship!
          </p>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="hidden lg:flex items-center gap-1.5 hover:text-amber-200 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
          <Link
            href="/ltpe-registration#register"
            className="inline-flex items-center gap-1 bg-amber-400 text-gray-950 hover:bg-amber-300 font-bold text-[11px] px-3 py-1 rounded-full transition-all shadow-sm"
          >
            <span>Register Free</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
