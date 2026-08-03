"use client";

import { useState } from "react";
import { Users, Plus, Search, Filter, Download, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";

const REAL_STUDENTS = [
  { id: "s1", regNo: "LA2025001", name: "Sabal Agrawal", class: "Zenith (Class 12)", course: "IIT Advanced AIR 272", phone: "+91 9319098141", parentName: "Mr. Manish Agrawal", status: "ACTIVE", admissionDate: "2025-04-10" },
  { id: "s2", regNo: "LA2025002", name: "Rutvik Kelkar", class: "Excel (Dropper)", course: "JEE Main AIR 2072 | IIT BHU", phone: "+91 9319098141", parentName: "Mrs. Rajeshri Kelkar", status: "ACTIVE", admissionDate: "2025-04-12" },
  { id: "s3", regNo: "LA2025003", name: "Manvendra Singh", class: "Classroom Program", course: "JEE Advanced AIR 6824", phone: "+91 9319098141", parentName: "Parents Seated with Ranker", status: "ACTIVE", admissionDate: "2024-05-01" },
  { id: "s4", regNo: "LA2022004", name: "Mohak Kalra", class: "Zenith (Class 12)", course: "JEE Main AIR 185", phone: "+91 9319098141", parentName: "Kalra Family", status: "PASSED_OUT", admissionDate: "2022-04-05" },
  { id: "s5", regNo: "LA2022005", name: "Aayush Singh", class: "Zenith (Class 12)", course: "JEE Main AIR 279", phone: "+91 9319098141", parentName: "Singh Family", status: "PASSED_OUT", admissionDate: "2022-04-05" },
  { id: "s6", regNo: "LA2023006", name: "Sanjhi Priya", class: "Zenith (Class 12)", course: "IIT Bombay Selection", phone: "+91 9319098141", parentName: "Priya Family", status: "PASSED_OUT", admissionDate: "2023-04-10" },
  { id: "s7", regNo: "LA2024007", name: "Devanshi Garg", class: "Zenith (Class 12)", course: "IIT Guwahati Selection", phone: "+91 9319098141", parentName: "Garg Family", status: "PASSED_OUT", admissionDate: "2024-04-10" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = REAL_STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.regNo.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students Management"
        description="Search, view, and manage all enrolled classroom students"
        icon={Users}
        breadcrumbs={[{ label: "Admin" }, { label: "Students" }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
            >
              <Plus className="h-4 w-4" /> Add Student
            </button>
          </div>
        }
      />

      {/* Filter & Search Bar */}
      <div className="bg-white border border-emerald-100/90 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, reg no, or phone..."
            className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select className="bg-emerald-50/40 border border-emerald-100 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700">
            <option value="">All Batches</option>
            <option value="aspire">Aspire (Class 11)</option>
            <option value="zenith">Zenith (Class 12)</option>
            <option value="excel">Excel (Dropper)</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white border border-emerald-100/90 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50/60 border-b border-emerald-100 text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                <th className="px-5 py-3.5">Reg No & Student</th>
                <th className="px-4 py-3.5">Class / Batch</th>
                <th className="px-4 py-3.5">Parent & Contact</th>
                <th className="px-4 py-3.5">Admission Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100/60 text-xs font-medium text-gray-700">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-gray-900 text-sm">{student.name}</p>
                    <p className="text-[10px] text-emerald-800 font-mono font-semibold">{student.regNo}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-gray-900">{student.course}</span>
                    <span className="block text-[10px] text-gray-500">{student.class}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-gray-800">{student.parentName}</p>
                    <p className="text-[10px] text-gray-500">{student.phone}</p>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 font-semibold">{student.admissionDate}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors"><Edit className="h-3.5 w-3.5" /></button>
                      <button className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-100 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-emerald-100 bg-emerald-50/40">
              <h2 className="font-heading font-bold text-gray-900 text-lg">Add New Student</h2>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900">✕</button>
            </div>
            <div className="p-6 space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Student Name *</label>
                <input className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" placeholder="Full name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 uppercase tracking-wider mb-1">Class *</label>
                  <select className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500">
                    <option value="class-11">Class 11</option>
                    <option value="class-12">Class 12</option>
                    <option value="dropper">Dropper</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 uppercase tracking-wider mb-1">Course Batch *</label>
                  <select className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500">
                    <option value="aspire">Aspire</option>
                    <option value="zenith">Zenith</option>
                    <option value="excel">Excel</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Parent Phone *</label>
                <input className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" placeholder="10-digit mobile" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-emerald-100 bg-gray-50/50">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200/60">Cancel</button>
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20">Save Student</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
