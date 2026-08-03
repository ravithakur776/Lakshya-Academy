"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

type Breadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  size?: "sm" | "md" | "lg";
  variant?: string;
};

export function PageHero({
  eyebrow,
  title,
  titleHighlight,
  description,
  breadcrumbs,
  ctaPrimary,
  ctaSecondary,
  size = "md",
  variant,
}: Props) {
  const sizeClasses = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-32",
  };

  return (
    <section className={cn("bg-gradient-to-br from-white via-[#F4FAF6] to-white border-b border-emerald-100/80 relative overflow-hidden", sizeClasses[size])}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#0F7A3C]/5 blur-3xl" />
      </div>

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-1.5 text-xs text-emerald-800 font-semibold mb-6">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-[#0F7A3C]" />}
                {b.href ? (
                  <Link href={b.href} className="hover:text-[#0F7A3C] transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-emerald-950 font-bold">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 uppercase tracking-widest mb-4">
            {eyebrow}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-emerald-950 tracking-tight leading-tight">
          {title}
          {titleHighlight && (
            <>
              {" "}<span className="text-[#0F7A3C]">{titleHighlight}</span>
            </>
          )}
        </h1>

        {description && (
          <p className="mt-6 text-base md:text-lg text-emerald-900/80 max-w-2xl mx-auto leading-relaxed font-medium">
            {description}
          </p>
        )}

        {(ctaPrimary || ctaSecondary) && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="bg-[#0F7A3C] hover:bg-[#0D6B34] text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-700/20 transition-all"
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="bg-emerald-50 hover:bg-emerald-100 text-[#0F7A3C] border border-emerald-200/80 font-bold text-sm px-7 py-3.5 rounded-xl transition-all"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
