"use client";

import { Trophy, Plus, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import { topResultsData } from "@/data/results-data";

export default function ResultsAdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Results & Rankers"
        description="Manage Sabal Agrawal AIR 272, Manvendra Singh AIR 6824, Rutvik Kelkar and top JEE Advanced & Main rankers"
        icon={Trophy}
        breadcrumbs={[{ label: "Admin" }, { label: "Results" }]}
        actions={
          <button className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all">
            <Plus className="h-4 w-4" /> Add New Result
          </button>
        }
      />

      <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-50/60 border-b border-emerald-100 text-[11px] font-bold text-emerald-900 uppercase">
              <th className="px-5 py-3.5">Student Name</th>
              <th className="px-4 py-3.5">All India Rank / Score</th>
              <th className="px-4 py-3.5">College / Institution</th>
              <th className="px-4 py-3.5">Exam Year</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100/60 text-xs font-medium text-gray-700">
            {topResultsData.map((r) => (
              <tr key={r.id} className="hover:bg-emerald-50/30 transition-colors">
                <td className="px-5 py-3.5 font-bold text-gray-900 text-sm">{r.name}</td>
                <td className="px-4 py-3.5 font-black text-emerald-800 text-sm">{r.rank}</td>
                <td className="px-4 py-3.5 font-bold text-[#0F7A3C]">
                  <span className="bg-emerald-50 text-[#0F7A3C] border border-emerald-200 px-2.5 py-1 rounded-full">
                    {r.exam}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-gray-600 font-semibold">{r.year}</td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100"><Edit className="h-3.5 w-3.5" /></button>
                    <button className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
