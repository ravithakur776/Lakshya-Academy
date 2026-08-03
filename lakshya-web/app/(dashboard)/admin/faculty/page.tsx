"use client";

import { useState } from "react";
import { GraduationCap, Plus, Edit, Trash2, Star, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import { facultyMembersData } from "@/data/faculty-data";

export default function FacultyAdminPage() {
  const [faculty, setFaculty] = useState(facultyMembersData);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty & Directors"
        description="Manage IIT (BHU) alumni directors and teaching faculty profiles"
        icon={GraduationCap}
        breadcrumbs={[{ label: "Admin" }, { label: "Faculty" }]}
        actions={
          <button className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all">
            <Plus className="h-4 w-4" /> Add Faculty Profile
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faculty.map((member) => (
          <div key={member.id} className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold bg-emerald-50 text-[#0F7A3C] border border-emerald-200 px-2.5 py-1 rounded-full uppercase">
                  {member.isDirector ? "IIT (BHU) Director" : "Senior Faculty"}
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"><Edit className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>

              <h3 className="text-2xl font-black font-heading text-gray-900">{member.name}</h3>
              <p className="text-xs font-bold text-[#0F7A3C] mt-0.5">{member.title}</p>
              <p className="text-xs font-semibold text-gray-600">{member.qualification}</p>

              <div className="mt-4 pt-4 border-t border-emerald-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subjects</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">{member.subjects.join(" • ")}</p>
              </div>

              <p className="text-gray-600 text-xs mt-3 leading-relaxed">{member.bio}</p>

              <div className="mt-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 text-xs italic text-gray-700">
                &ldquo;{member.philosophy}&rdquo;
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-emerald-100 text-center">
              <div className="bg-emerald-50/60 rounded-xl p-2">
                <p className="text-base font-black text-[#0F7A3C] font-heading">{member.experience}</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase">Experience</p>
              </div>
              <div className="bg-amber-400/10 rounded-xl p-2">
                <p className="text-base font-black text-gray-900 font-heading">{member.topRankers}</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase">Top Rankers</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
