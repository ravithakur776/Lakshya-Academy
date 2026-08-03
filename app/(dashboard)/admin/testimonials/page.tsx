"use client";

import { MessageSquare, Plus, Star, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import { studentTestimonials, parentTestimonials } from "@/data/homepage-data";

export default function TestimonialsAdminPage() {
  const allReviews = [
    ...studentTestimonials.map((s) => ({
      id: s.id,
      name: s.name,
      achievement: s.role,
      course: s.batch,
      rating: 5,
      type: "Student Review",
      content: s.quote,
    })),
    ...parentTestimonials.map((p) => ({
      id: p.id,
      name: p.name,
      achievement: p.relation,
      course: p.location,
      rating: p.rating,
      type: "Parent Review",
      content: p.quote,
    })),
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student & Parent Reviews"
        description="Manage authentic student stories and parent reviews displayed on the website"
        icon={MessageSquare}
        breadcrumbs={[{ label: "Admin" }, { label: "Testimonials" }]}
        actions={
          <button className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all">
            <Plus className="h-4 w-4" /> Add Testimonial
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allReviews.map((t) => (
          <div key={t.id} className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-[#0F7A3C] border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                  {t.type}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-base font-heading">{t.name}</h3>
              <p className="text-xs font-bold text-[#0F7A3C]">{t.achievement}</p>
              <p className="text-gray-600 text-xs mt-3 italic leading-relaxed">&ldquo;{t.content}&rdquo;</p>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-emerald-100 text-xs">
              <span className="text-gray-500 font-semibold">{t.course}</span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-800 hover:bg-emerald-50"><Edit className="h-4 w-4" /></button>
                <button className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
