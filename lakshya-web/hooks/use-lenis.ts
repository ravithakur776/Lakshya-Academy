"use client";

import { useEffect, useRef, useCallback } from "react";
import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/**
 * Hook to access and control the global Lenis smooth scroll instance.
 *
 * @example
 * const { lenis, scrollTo } = useLenis();
 * scrollTo("#hero"); // Smooth scroll to element
 * scrollTo(0); // Scroll to top
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = lenisInstance;
  }, []);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
      }
    ) => {
      lenisRef.current?.scrollTo(target, {
        offset: options?.offset ?? -80, // Account for navbar height
        duration: options?.duration ?? 1.2,
        immediate: options?.immediate ?? false,
      });
    },
    []
  );

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const getLenis = useCallback(() => lenisRef.current || lenisInstance, []);

  return {
    getLenis,
    scrollTo,
    stop,
    start,
  };
}

/**
 * Sets the global Lenis instance — called by the LenisProvider
 * @internal
 */
export function _setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}
