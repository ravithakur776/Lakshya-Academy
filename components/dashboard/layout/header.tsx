"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Props = {
  onMenuClick: () => void;
};

export function DashboardHeader({ onMenuClick }: Props) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 border-b border-emerald-100/80 backdrop-blur-md px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Global Search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-emerald-900 hover:bg-emerald-50 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search bar */}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700 pointer-events-none" />
            <input
              type="text"
              placeholder="Search students, enquiries, articles..."
              className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500/60 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Right: Quick CTAs & Admin User */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Live site link */}
          <Link
            href="/"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#0F7A3C] hover:text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl transition-all hover:bg-emerald-100/60"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          {/* Notification bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-gray-600 hover:text-emerald-900 hover:bg-emerald-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0F7A3C] rounded-full animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-emerald-100 rounded-2xl shadow-xl p-4 z-50 text-xs">
                <div className="flex items-center justify-between mb-3 border-b border-emerald-100 pb-2">
                  <span className="font-bold text-gray-900 text-sm font-heading">Notifications</span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    2 New
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <p className="font-bold text-gray-900">New LTPE 2026 Registration</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">Student registered for LTPE 2026</p>
                  </div>
                  <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <p className="font-bold text-gray-900">New Contact Lead</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">Contact submission for Aspire Class 11</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User profile dropdown + Logout */}
          <div className="relative pl-2 border-l border-emerald-100" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-emerald-50/80 transition-colors cursor-pointer focus:outline-none"
              aria-expanded={showUserMenu}
              aria-label="User account menu"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0F7A3C] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-700/20">
                LA
              </div>
              <div className="hidden lg:block text-left">
                <p className="font-bold text-gray-900 text-xs leading-none">Lakshya Admin</p>
                <p className="text-[10px] font-semibold text-emerald-700 mt-1">SUPER_ADMIN</p>
              </div>
              <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-gray-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-emerald-100 rounded-2xl shadow-xl py-2 z-50">
                <div className="px-4 py-2.5 border-b border-emerald-50">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#0F7A3C]" />
                    <p className="text-xs font-bold text-gray-900">Lakshya Academy</p>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">admin@lakshyaacademy.in</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/admin/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                  >
                    <Settings className="h-4 w-4 text-emerald-700" />
                    <span>Site Settings</span>
                  </Link>
                </div>

                <div className="border-t border-emerald-50 pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                    ) : (
                      <LogOut className="h-4 w-4 text-red-500" />
                    )}
                    <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Direct Logout Button (Header) */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            title="Log Out from Admin"
            className="flex items-center gap-1.5 p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200/60 transition-all cursor-pointer disabled:opacity-50"
            aria-label="Log out"
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin text-red-600" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span className="hidden sm:inline text-xs font-bold text-red-600">
              {isLoggingOut ? "..." : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
