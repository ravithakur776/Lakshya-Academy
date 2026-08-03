"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle, Loader2, Send } from "lucide-react";

const admissionSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  parentName: z.string().min(2, "Parent name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  targetClass: z.string().min(1, "Select target class"),
  courseBatch: z.string().min(1, "Select course batch"),
  city: z.string().min(2, "City is required"),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

export function AdmissionForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
  });

  async function onSubmit(data: AdmissionFormData) {
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.studentName,
          phone: data.phone,
          email: data.email,
          course: `${data.courseBatch} (${data.targetClass})`,
          notes: `Parent: ${data.parentName}, City: ${data.city}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit admission request");

      setIsSuccess(true);
      reset();
    } catch {
      setErrorMsg("Failed to submit form. Please call +91 9319098141 directly.");
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-[#F4FAF6] border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#0F7A3C] text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="h-7 w-7" />
        </div>
        <h3 className="text-2xl font-black font-heading text-emerald-950">Admission Application Received!</h3>
        <p className="text-sm font-medium text-emerald-900/80 max-w-md mx-auto">
          Thank you for applying to Lakshya Academy. Our counselor will contact you shortly to schedule your campus visit and document verification.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 inline-flex items-center gap-2 bg-[#0F7A3C] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-700">
          {errorMsg}
        </div>
      )}

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
            Parent Name *
          </label>
          <input
            {...register("parentName")}
            placeholder="Parent/Guardian name"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
          {errors.parentName && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.parentName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            Mobile Number *
          </label>
          <input
            {...register("phone")}
            placeholder="10-digit mobile number"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
          {errors.phone && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            City / Location *
          </label>
          <input
            {...register("city")}
            placeholder="e.g. Mathura, Vrindavan"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
          {errors.city && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            Target Class *
          </label>
          <select
            {...register("targetClass")}
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          >
            <option value="">Select Target Class</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
            <option value="Dropper">Dropper / 12th Pass</option>
          </select>
          {errors.targetClass && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.targetClass.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            Course Batch *
          </label>
          <select
            {...register("courseBatch")}
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          >
            <option value="">Select Batch</option>
            <option value="Aspire">Aspire (Class 11)</option>
            <option value="Zenith">Zenith (Class 12)</option>
            <option value="Excel">Excel (Droppers)</option>
          </select>
          {errors.courseBatch && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.courseBatch.message}</p>}
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
            <span>Submitting Admission Form...</span>
          </>
        ) : (
          <>
            <span>Submit Admission Application</span>
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
