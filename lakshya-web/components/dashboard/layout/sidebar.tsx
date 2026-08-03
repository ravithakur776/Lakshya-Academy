"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/logo";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  BookOpen,
  GraduationCap,
  Image as ImageIcon,
  BarChart3,
  Settings,
  Bell,
  FileText,
  Trophy,
  MessageSquare,
  X,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  badge?: string;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "CRM & Admissions",
    items: [
      { href: "/admin/enquiries", label: "Enquiries", icon: PhoneCall, badge: "CRM" },
      { href: "/admin/ltpe", label: "LTPE 2026", icon: ClipboardList, badge: "Exam" },
      { href: "/admin/notices", label: "Notices", icon: Bell },
    ],
  },
  {
    label: "Academic",
    items: [
      { href: "/admin/students", label: "Students", icon: Users },
      { href: "/admin/faculty", label: "Faculty", icon: GraduationCap },
      { href: "/admin/results", label: "Results", icon: Trophy },
    ],
  },
  {
    label: "Content Management",
    items: [
      { href: "/admin/blog", label: "Blog + AI", icon: BookOpen, badge: "AI" },
      { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
      { href: "/admin/media", label: "Media Library", icon: FileText },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Site Settings", icon: Settings },
    ],
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function DashboardSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-emerald-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-white border-r border-emerald-100/80 z-50 flex flex-col shadow-sm transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-100/80 flex-shrink-0 bg-gradient-to-r from-emerald-50/40 via-white to-white">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo size="sm" />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-emerald-50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest px-3 mb-1.5">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group",
                        active
                          ? "bg-[#0F7A3C] text-white shadow-md shadow-emerald-700/20"
                          : "text-gray-600 hover:text-emerald-900 hover:bg-emerald-50/80"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 flex-shrink-0 transition-colors",
                          active ? "text-white" : "text-emerald-700 group-hover:text-emerald-900"
                        )}
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                            active
                              ? "bg-white/20 text-white"
                              : "bg-emerald-100/80 text-emerald-800 border border-emerald-200"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {active && <ChevronRight className="h-3.5 w-3.5 text-white/80" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom — Public Site Link */}
        <div className="px-3 py-3 border-t border-emerald-100/80 bg-emerald-50/30 flex-shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-emerald-800 hover:bg-emerald-100/80 transition-all border border-emerald-200/60"
          >
            <span className="flex items-center gap-2">🌐 View Live Website</span>
            <ChevronRight className="h-3.5 w-3.5 text-emerald-600" />
          </Link>
        </div>
      </aside>
    </>
  );
}
