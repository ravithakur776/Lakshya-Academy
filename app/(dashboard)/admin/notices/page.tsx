"use client";

import { useState } from "react";
import { Bell, Plus, Pin, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";

const MOCK_NOTICES = [
  { id: "1", title: "LTPE 2026 Registration Open", content: "Lakshya Talent Promotional Exam 2026 registrations are now open. Exam will be held on 11 October 2026.", type: "URGENT", isPinned: true, createdAt: "2025-07-30" },
  { id: "2", title: "Mid-Term Exam Schedule Released", content: "The mid-term examinations for Aspire and Zenith batches will be held from August 10-15, 2025.", type: "EXAM", isPinned: false, createdAt: "2025-07-28" },
];

export default function NoticesAdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notice Board"
        description="Publish announcements, exam schedules, and holiday notices"
        icon={Bell}
        breadcrumbs={[{ label: "Admin" }, { label: "Notices" }]}
        actions={
          <button className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all">
            <Plus className="h-4 w-4" /> Add Notice
          </button>
        }
      />

      <div className="space-y-3">
        {MOCK_NOTICES.map((n) => (
          <div key={n.id} className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-all flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-sm">{n.title}</h3>
                {n.isPinned && <span className="text-[9px] font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 px-2 py-0.5 rounded-full uppercase">Pinned</span>}
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">{n.type}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{n.content}</p>
              <p className="text-[10px] text-gray-400 font-semibold mt-2">{n.createdAt}</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-800 hover:bg-emerald-50"><Pin className="h-4 w-4" /></button>
              <button className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
