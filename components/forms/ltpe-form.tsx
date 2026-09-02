"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, CheckCircle, AlertCircle, Loader2, Award, Calendar, Check, Download, BookOpen, ExternalLink } from "lucide-react";
import Image from "next/image";

const schema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  parentName: z.string().min(2, "Parent/Guardian name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  currentClass: z.enum(["Class 8", "Class 9", "Class 10"], { message: "Select Class 8, 9, or 10" }),
  examDate: z.string(),
  schoolName: z.string().min(2, "School name is required"),
  city: z.string().min(2, "City / Town is required"),
});

type FormData = z.infer<typeof schema>;

import { createClient } from "@/lib/supabase/client";

export function LtpeForm() {
  const [registeredRegNo, setRegisteredRegNo] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      examDate: "11 October 2026",
    },
  });

  async function onSubmit(data: FormData) {
    setErrorMsg("");
    try {
      const res = await fetch("/api/ltpe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, examDate: "11 October 2026" }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Registration failed");

      const regNo = result.registrationNo || result.regNo || `LTPE26${Math.floor(1000 + Math.random() * 9000)}`;

      // Dual-layer insurance: Direct client write to Supabase
      try {
        const supabase = createClient();
        await supabase.from("ltpe_registrations").insert([
          {
            registration_no: regNo,
            student_name: data.studentName,
            parent_name: data.parentName,
            parent_phone: data.phone,
            current_class: data.currentClass,
            school: data.schoolName,
            city: data.city || "Mathura",
            exam_date: "11 October 2026",
            status: "CONFIRMED",
          },
        ]);
      } catch (clientErr) {
        console.warn("[LtpeForm] Client Supabase sync handled:", clientErr);
      }

      setRegisteredRegNo(regNo);
      reset();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to register. Please call +91 9319098141.";
      setErrorMsg(message);
    }
  }

  if (registeredRegNo) {
    return (
      <div className="bg-[#F4FAF6] border border-emerald-200 rounded-3xl p-6 md:p-8 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-[#0F7A3C] text-white flex items-center justify-center mx-auto shadow-lg">
          <Award className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black font-heading text-emerald-950">Registration Confirmed!</h3>
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mt-1">LTPE 2026 Registration Number</p>
          <p className="text-3xl md:text-4xl font-black font-mono text-[#0F7A3C] tracking-wider mt-1">{registeredRegNo}</p>
        </div>

        <div className="bg-white border border-emerald-200 rounded-2xl p-4 text-xs font-medium text-emerald-900 space-y-1">
          <p className="font-bold flex items-center justify-center gap-1.5 text-[#0F7A3C]">
            <Calendar className="h-4 w-4" /> Official Exam Date: 11 October 2026 (Sunday)
          </p>
          <p>Location: Lakshya Academy Campus, Krishna Nagar, Mathura</p>
        </div>

        {/* Syllabus Download Box for the student */}
        <div className="bg-white border-2 border-emerald-200/90 rounded-2xl p-4 text-left shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F7A3C] flex items-center justify-center font-bold">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-black font-heading text-emerald-950">Official LTPE 2026 Syllabus</p>
              <p className="text-[11px] font-semibold text-emerald-800">Classes 8, 9 & 10 (Physics, Chemistry, Maths)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/images/ltpe/ltpe-2026-syllabus.jpg"
              download="Lakshya_LTPE_2026_Syllabus.jpg"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Syllabus Image</span>
            </a>
            <a
              href="/images/ltpe/ltpe-2026-syllabus.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2.5 rounded-xl border border-emerald-200 text-[#0F7A3C] hover:bg-emerald-50 transition-colors"
              title="View in full screen"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <p className="text-xs text-emerald-900/80 font-medium">
          A digital hall ticket and WhatsApp confirmation will be sent to your registered phone number.
        </p>

        <button
          onClick={() => setRegisteredRegNo(null)}
          className="inline-flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-[#0F7A3C] font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer"
        >
          Register Another Student
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-700 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Student & Parent Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            Student Full Name *
          </label>
          <input
            {...register("studentName")}
            placeholder="Student's name"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
          {errors.studentName && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.studentName.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            Parent / Guardian Name *
          </label>
          <input
            {...register("parentName")}
            placeholder="Father's or Mother's name"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
          {errors.parentName && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.parentName.message}</p>}
        </div>
      </div>

      {/* Mobile & Class */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            Mobile Number (WhatsApp) *
          </label>
          <input
            {...register("phone")}
            placeholder="10-digit mobile number"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
          {errors.phone && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1 flex items-center justify-between">
            <span>Current Class *</span>
            <a href="#syllabus" className="text-[11px] text-[#0F7A3C] hover:underline font-bold normal-case">
              View Syllabus ⬇
            </a>
          </label>
          <select
            {...register("currentClass")}
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          >
            <option value="">Select Eligible Class</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>
          {errors.currentClass && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.currentClass.message}</p>}
        </div>
      </div>

      {/* ── OFFICIAL EXAM DATE (11 OCTOBER 2026 ONLY) ──────────────────── */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-[#0F7A3C]" /> Official Exam Date
          </span>
          <span className="text-[10px] text-[#0F7A3C] font-extrabold uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Fixed Schedule
          </span>
        </label>
        
        <div className="bg-[#0F7A3C] text-white p-4 rounded-2xl border border-[#0F7A3C] flex items-center justify-between shadow-md shadow-emerald-700/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 text-white font-bold">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-black text-base font-heading leading-tight">11 October 2026 (Sunday)</p>
              <p className="text-xs text-emerald-100 font-semibold mt-0.5">Lakshya Academy Campus, Krishna Nagar, Mathura</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex text-[10px] font-bold uppercase bg-amber-400 text-gray-950 px-2.5 py-1 rounded-full shadow-sm">
            Confirmed
          </span>
        </div>
        <input type="hidden" value="11 October 2026" {...register("examDate")} />
      </div>

      {/* School & City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            School Name *
          </label>
          <input
            {...register("schoolName")}
            placeholder="Current school name"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
          {errors.schoolName && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.schoolName.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            City / Town *
          </label>
          <input
            {...register("city")}
            placeholder="e.g. Mathura, Vrindavan, Kosi"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
          {errors.city && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-700/20 transition-all text-sm disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing LTPE Registration...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            <span>Complete Free LTPE Registration</span>
          </>
        )}
      </button>
    </form>
  );
}
