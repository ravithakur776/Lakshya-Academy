"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/layout/sidebar";
import { DashboardHeader } from "@/components/dashboard/layout/header";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAdminAuth() {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace(`/login?redirect=${encodeURIComponent(pathname || "/admin")}`);
          return;
        }
      } catch (err) {
        console.warn("Auth check error, allowing access in offline/demo mode", err);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAdminAuth();
  }, [router, pathname]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#F4FAF6] flex flex-col items-center justify-center p-4 text-emerald-950">
        <div className="w-12 h-12 rounded-2xl bg-[#0F7A3C] text-white flex items-center justify-center shadow-lg shadow-emerald-700/20 mb-4 animate-pulse">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="text-xs font-bold font-heading uppercase tracking-wider text-emerald-800">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex font-sans antialiased selection:bg-[#0F7A3C] selection:text-white">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
