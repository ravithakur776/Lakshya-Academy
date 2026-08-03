"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface FloatingWhatsAppProps {
  className?: string;
}

/**
 * Floating WhatsApp Button
 *
 * A fixed floating action button that opens WhatsApp with a pre-filled message.
 * Positioned at the bottom-right corner for easy thumb access.
 *
 * Features:
 * - Opens in new tab
 * - Pre-filled message
 * - Pulse animation to draw attention
 * - Accessible with aria-label
 */
export function FloatingWhatsApp({ className }: FloatingWhatsAppProps) {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi! I'm interested in Lakshya Academy courses. Please share details."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex items-center justify-center",
        "w-14 h-14 rounded-full",
        "bg-[#25D366] hover:bg-[#22c55e]",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "hover:scale-110 active:scale-95",
        // Pulse ring
        "before:absolute before:inset-0 before:rounded-full",
        "before:bg-[#25D366] before:opacity-30",
        "before:animate-ping",
        className
      )}
    >
      <MessageCircle className="h-7 w-7 text-white fill-white" aria-hidden />
    </a>
  );
}
