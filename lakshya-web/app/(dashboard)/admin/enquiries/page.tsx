"use client";

import { useState, useEffect } from "react";
import { PhoneCall, Plus, LayoutGrid, List, Search, Filter, Clock, CheckCircle, Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import { cn } from "@/lib/utils";
import { exportToCsv } from "@/lib/csv-exporter";

const STAGES = [
  { id: "NEW", label: "New Lead", color: "border-emerald-300 bg-emerald-50/50" },
  { id: "INTERESTED", label: "Interested", color: "border-emerald-400 bg-emerald-100/50" },
  { id: "CALLBACK", label: "Callback Scheduled", color: "border-amber-300 bg-amber-50/50" },
  { id: "ADMITTED", label: "Admitted", color: "border-green-500 bg-green-50/50" },
  { id: "LOST", label: "Lost / Closed", color: "border-red-300 bg-red-50/50" },
];

export default function EnquiriesPage() {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");
  const [search, setSearch] = useState("");
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEnquiries() {
      try {
        const res = await fetch("/api/admin/enquiries");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data)) {
            setEnquiries(data.data);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadEnquiries();
  }, []);

  const filtered = enquiries.filter((e) =>
    (e.studentName || e.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (e.phone || "").includes(search)
  );

  function handleExportCsv() {
    const csvData = filtered.map((item) => ({
      "Student Name": item.studentName || item.name || "",
      "Phone": item.phone || "",
      "Email": item.email || "",
      "Course": item.interestedCourse || item.course || "General",
      "Lead Source": item.leadSource || "WEBSITE",
      "Stage": item.status || "NEW",
      "Date": item.createdAt ? new Date(item.createdAt).toLocaleString() : "",
    }));
    exportToCsv("Lakshya_CRM_Enquiries", csvData);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM & Enquiry Pipeline"
        description="Track live incoming leads, schedule follow-ups, and manage admissions pipeline"
        icon={PhoneCall}
        breadcrumbs={[{ label: "Admin" }, { label: "Enquiries" }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-[#0F7A3C] text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-200 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <div className="bg-white border border-emerald-100 rounded-xl p-1 flex items-center shadow-sm">
              <button
                onClick={() => setViewMode("kanban")}
                className={cn("p-1.5 rounded-lg text-xs font-bold transition-all", viewMode === "kanban" ? "bg-[#0F7A3C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-1.5 rounded-lg text-xs font-bold transition-all", viewMode === "list" ? "bg-[#0F7A3C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all">
              <Plus className="h-4 w-4" /> Add Lead
            </button>
          </div>
        }
      />

      {/* Filter & Search */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name or phone..."
            className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <span className="text-xs font-bold text-gray-500">
          Total Leads: <span className="text-[#0F7A3C]">{enquiries.length}</span>
        </span>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STAGES.map((stage) => {
            const items = filtered.filter((e) => e.status === stage.id);
            return (
              <div key={stage.id} className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-100">
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider font-heading">{stage.label}</h3>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">{items.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div key={item.id} className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3.5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded uppercase">{item.leadSource || "WEBSITE"}</span>
                          <span className="text-[10px] text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="font-bold text-gray-900 text-sm mt-1">{item.studentName || item.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{item.phone}</p>
                        <div className="mt-3 pt-2 border-t border-emerald-100 flex items-center justify-between text-[10px] text-gray-500 font-semibold">
                          <span>{item.interestedCourse || "General"}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-400 text-xs">
                      No leads in {stage.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
          {filtered.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 border-b border-emerald-100 text-[11px] font-bold text-emerald-900 uppercase">
                  <th className="px-5 py-3.5">Lead Name</th>
                  <th className="px-4 py-3.5">Contact Details</th>
                  <th className="px-4 py-3.5">Interested Course</th>
                  <th className="px-4 py-3.5">Lead Source</th>
                  <th className="px-4 py-3.5">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/60 text-xs font-medium text-gray-700">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-gray-900">{e.studentName || e.name}</td>
                    <td className="px-4 py-3.5">{e.phone}</td>
                    <td className="px-4 py-3.5 font-semibold text-emerald-900">{e.interestedCourse || "General"}</td>
                    <td className="px-4 py-3.5 text-gray-500 uppercase text-[10px] font-bold">{e.leadSource || "WEBSITE"}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">{e.status || "NEW"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16 text-gray-500 text-sm font-medium">
              No enquiries recorded yet. Form submissions on the website will appear here in real-time.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
