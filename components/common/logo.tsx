import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

/**
 * Official Lakshya Academy Logo Component
 * Combines the official 1:1 archer logo image with brand typography
 */
export function Logo({ className, showText = true, size = "md", dark = false }: LogoProps) {
  const iconSizeMap = {
    sm: 36,
    md: 46,
    lg: 60,
  };

  return (
    <div
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
      aria-label={SITE_CONFIG.name}
    >
      <div className="relative flex-shrink-0 bg-white rounded-xl p-1 shadow-sm border border-emerald-100/80">
        <Image
          src="/logo.png"
          alt="Lakshya Academy — A Dedicated Team Of IITians"
          width={iconSizeMap[size]}
          height={iconSizeMap[size]}
          className="object-contain rounded-lg"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-black font-heading tracking-tight",
              dark ? "text-white" : "text-emerald-950",
              {
                "text-base": size === "sm",
                "text-lg": size === "md",
                "text-2xl": size === "lg",
              }
            )}
          >
            Lakshya <span className="text-[#0F7A3C]">Academy</span>
          </span>
          <span
            className={cn(
              "font-bold tracking-tight uppercase",
              dark ? "text-amber-300" : "text-[#0F7A3C]",
              {
                "text-[9px]": size === "sm",
                "text-[10px]": size === "md",
                "text-xs": size === "lg",
              }
            )}
          >
            A Dedicated Team Of IITians
          </span>
        </div>
      )}
    </div>
  );
}
