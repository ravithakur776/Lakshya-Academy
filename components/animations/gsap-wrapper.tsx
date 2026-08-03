"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPWrapperProps {
  children: ReactNode;
  /** Called with the container element ref and gsap instance */
  onMount?: (
    container: HTMLDivElement,
    gsap: typeof import("gsap").default,
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger
  ) => gsap.core.Timeline | gsap.core.Tween | void;
  className?: string;
}

/**
 * GSAP Wrapper Component
 *
 * Provides a safe, SSR-compatible way to use GSAP animations.
 * Automatically cleans up animations on unmount.
 *
 * @example
 * <GSAPWrapper
 *   onMount={(container, gsap, ScrollTrigger) => {
 *     gsap.from(container.querySelectorAll(".title"), {
 *       y: 60,
 *       opacity: 0,
 *       stagger: 0.1,
 *       scrollTrigger: {
 *         trigger: container,
 *         start: "top 80%",
 *       },
 *     });
 *   }}
 * >
 *   <div className="title">Hello</div>
 * </GSAPWrapper>
 */
export function GSAPWrapper({
  children,
  onMount,
  className,
}: GSAPWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current || !onMount) return;

    // Small defer to ensure DOM is ready
    const ctx = gsap.context(() => {
      const result = onMount(containerRef.current!, gsap, ScrollTrigger);
      if (result) {
        tlRef.current = result;
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onMount]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
