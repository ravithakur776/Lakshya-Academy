"use client";

import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface UIStore {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Sidebar
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  // Loading
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;

  // Global modal
  activeModal: string | null;
  modalData: unknown;
  openModal: (modalId: string, data?: unknown) => void;
  closeModal: () => void;

  // Scroll
  scrollY: number;
  isScrolled: boolean;
  setScrollY: (y: number) => void;
}

/**
 * Global UI state store (Zustand)
 *
 * Manages theme, sidebar, modal, loading, and scroll state.
 * Not persisted — resets on page refresh.
 */
export const useUIStore = create<UIStore>()((set) => ({
  // Theme
  theme: "light",
  setTheme: (theme) => set({ theme }),

  // Sidebar
  isSidebarOpen: true,
  isSidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setSidebarCollapsed: (isSidebarCollapsed) => set({ isSidebarCollapsed }),

  // Mobile menu
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Loading
  isPageLoading: false,
  setPageLoading: (isPageLoading) => set({ isPageLoading }),

  // Global modal
  activeModal: null,
  modalData: null,
  openModal: (modalId, data = null) =>
    set({ activeModal: modalId, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  // Scroll
  scrollY: 0,
  isScrolled: false,
  setScrollY: (scrollY) => set({ scrollY, isScrolled: scrollY > 80 }),
}));
