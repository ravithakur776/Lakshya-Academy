"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ── Lead / Inquiry Cart ───────────────────────────────────────
// Stores which courses a prospective student is interested in
// before they submit a lead form.

interface CartItem {
  courseId: string;
  courseName: string;
  courseType: string;
  fee?: number;
}

interface CartStore {
  items: CartItem[];

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  totalItems: () => number;
}

/**
 * Course interest cart store (Zustand)
 *
 * Persists selected courses so users don't lose their selection
 * if they navigate away before submitting an inquiry.
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.courseId === item.courseId)) {
            return state; // Already in cart
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (courseId) =>
        set((state) => ({
          items: state.items.filter((i) => i.courseId !== courseId),
        })),

      clearCart: () => set({ items: [] }),

      isInCart: (courseId) =>
        get().items.some((i) => i.courseId === courseId),

      totalItems: () => get().items.length,
    }),
    {
      name: "lakshya-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
