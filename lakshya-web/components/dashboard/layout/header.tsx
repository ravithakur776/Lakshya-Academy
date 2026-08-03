"use client";

import { useState } from "react";
import { Menu, Search, Bell, ExternalLink, LogOut, User } from "lucide-react";
import Link from "next/link";

type Props = {
  onMenuClick: () => void;
};

export function DashboardHeader({ onMenuClick }: Props) {
  const [showNotifications, setShowNotifications] = useState(false);

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
        <div className="flex items-center gap-3">
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
          <div className="relative">
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
                    <p className="text-gray-500 text-[11px] mt-0.5">Sabal Agrawal registered for LTPE 2026</p>
                  </div>
                  <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <p className="font-bold text-gray-900">New Contact Lead</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">Contact submission for Aspire Class 11</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User profile button */}
          <div className="flex items-center gap-3 pl-2 border-l border-emerald-100">
            <div className="w-8 h-8 rounded-xl bg-[#0F7A3C] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-700/20">
              LA
            </div>
            <div className="hidden lg:block text-left">
              <p className="font-bold text-gray-900 text-xs leading-none">Lakshya Admin</p>
              <p className="text-[10px] font-semibold text-emerald-700 mt-1">SUPER_ADMIN</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
