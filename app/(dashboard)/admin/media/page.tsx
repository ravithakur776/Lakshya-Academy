"use client";

import { useState } from "react";
import { FileText, Plus, Folder, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";

export default function MediaAdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Library"
        description="Upload and organize images, brochures, and document assets"
        icon={FileText}
        breadcrumbs={[{ label: "Admin" }, { label: "Media" }]}
        actions={
          <label className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 cursor-pointer transition-all">
            <Plus className="h-4 w-4" /> Upload Files
            <input type="file" className="hidden" multiple />
          </label>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Folders */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm space-y-2">
          <p className="text-xs font-bold uppercase text-emerald-800 tracking-wider mb-2">Folders</p>
          {["All Media", "Brochures & PDFs", "Faculty Photos", "Toppers Highlights", "Campus Banners"].map((f, i) => (
            <button key={f} className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-colors ${i === 0 ? "bg-emerald-50 text-[#0F7A3C] border border-emerald-200" : "text-gray-600 hover:bg-emerald-50/50"}`}>
              <span className="flex items-center gap-2"><Folder className="h-4 w-4 text-emerald-600" /> {f}</span>
            </button>
          ))}
        </div>

        {/* Media Zone */}
        <div className="md:col-span-3 bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center border-dashed min-h-[300px]">
          <FileText className="h-12 w-12 text-emerald-400 mb-3" />
          <h3 className="font-bold text-gray-900 text-sm font-heading">Drag and drop files here</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs">Supports JPG, PNG, WebP, and PDF up to 10MB each</p>
        </div>
      </div>
    </div>
  );
}
