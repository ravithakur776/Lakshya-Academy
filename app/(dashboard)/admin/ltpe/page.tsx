"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Plus, Search, Filter, Award, Download, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";

import { exportToCsv } from "@/lib/csv-exporter";
import { createClient } from "@/lib/supabase/client";

export default function LtpeAdminPage() {
  const [search, setSearch] = useState("");
  const [ltpeList, setLtpeList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLtpeRegistrations() {
      try {
        // 1. Direct Supabase query
        try {
          const supabase = createClient();
          const { data: sbData, error: sbErr } = await supabase
            .from("ltpe_registrations")
            .select("*")
            .order("created_at", { ascending: false });

          if (!sbErr && sbData && sbData.length > 0) {
            const formatted = sbData.map((row: any) => ({
              id: row.id,
              registrationNo: row.registration_no,
              studentName: row.student_name,
              parentName: row.parent_name,
              parentPhone: row.parent_phone,
              phone: row.parent_phone,
              currentClass: row.current_class,
              class: row.current_class,
              city: row.city || "Mathura",
              school: row.school || "",
              status: row.status || "CONFIRMED",
              createdAt: row.created_at,
            }));
            setLtpeList(formatted);
            setIsLoading(false);
            return;
          }
        } catch (sbError) {
          console.warn("Direct Supabase fetch skipped:", sbError);
        }

        // 2. Fallback to API
        const res = await fetch("/api/ltpe");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data)) {
            setLtpeList(data.data);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadLtpeRegistrations();
  }, []);

  const filtered = ltpeList.filter((l) =>
    (l.studentName || "").toLowerCase().includes(search.toLowerCase()) ||
    (l.registrationNo || l.regNo || "").toLowerCase().includes(search.toLowerCase()) ||
    (l.parentPhone || l.phone || "").includes(search)
  );

  function handleExportCsv() {
    const csvData = filtered.map((item) => ({
      "Registration No": item.registrationNo || item.regNo || "",
      "Student Name": item.studentName || "",
      "Class": item.currentClass || item.class || "",
      "Parent Name": item.parentName || "",
      "Parent Phone": item.parentPhone || item.phone || "",
      "City": item.city || "Mathura",
      "School": item.school || "",
      "Status": item.status || "CONFIRMED",
      "Registration Date": item.createdAt ? new Date(item.createdAt).toLocaleString() : "",
    }));
    exportToCsv("Lakshya_LTPE_2026_Registrations", csvData);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="LTPE 2026 Registrations"
        description="Manage Lakshya Talent Promotional Exam 2026 (11 October 2026) registrations & hall tickets"
        icon={ClipboardList}
        breadcrumbs={[{ label: "Admin" }, { label: "LTPE 2026" }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        }
      />

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm text-center">
          <p className="text-3xl font-black text-gray-900 font-heading">{ltpeList.length}</p>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Total Registered Candidates</p>
        </div>
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm text-center">
          <p className="text-3xl font-black text-[#0F7A3C] font-heading">11 October 2026</p>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Exam Date</p>
        </div>
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm text-center">
          <p className="text-3xl font-black text-amber-500 font-heading">Up to 100%</p>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Max Scholarship Waiver</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, reg no..."
            className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <span className="text-xs font-bold text-gray-500">
          Showing: <span className="text-[#0F7A3C]">{filtered.length}</span> registrations
        </span>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
        {filtered.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50/60 border-b border-emerald-100 text-[11px] font-bold text-emerald-900 uppercase">
                <th className="px-5 py-3.5">Registration No</th>
                <th className="px-4 py-3.5">Student Name</th>
                <th className="px-4 py-3.5">Class & City</th>
                <th className="px-4 py-3.5">Parent & Phone</th>
                <th className="px-4 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100/60 text-xs font-medium text-gray-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-5 py-3.5 font-bold font-mono text-[#0F7A3C]">
                    {item.registrationNo || item.regNo}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-gray-900">{item.studentName}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-gray-900">{item.currentClass || item.class}</span>
                    <span className="block text-[10px] text-gray-500">{item.city || "Mathura"}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-gray-800">{item.parentName}</p>
                    <p className="text-[10px] text-gray-500">{item.parentPhone || item.phone}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                      {item.status || "CONFIRMED"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16 text-gray-500 text-sm font-medium">
            No registrations found. Submissions on the LTPE registration form will appear here automatically.
          </div>
        )}
      </div>
    </div>
  );
}
