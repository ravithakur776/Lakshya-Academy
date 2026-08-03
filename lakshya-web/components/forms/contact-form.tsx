"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address").or(z.literal("")),
  targetClass: z.string().min(1, "Select a class"),
  courseInterest: z.string().min(1, "Select a course interest"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      reset();
    } catch {
      setErrorMsg("Failed to send message. Please call +91 9319098141 directly.");
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#F4FAF6] border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0F7A3C] text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-black font-heading text-emerald-950">Message Sent Successfully!</h3>
        <p className="text-sm font-medium text-emerald-900/80 max-w-md mx-auto">
          Thank you for contacting Lakshya Academy. Our admissions team will reach out to you within 2 working hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 inline-flex items-center gap-2 bg-[#0F7A3C] text-white font-bold text-xs px-6 py-2.5 rounded-xl"
        >
          Send Another Message
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

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
          Full Name *
        </label>
        <input
          {...register("fullName")}
          placeholder="Student or Parent Full Name"
          className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
        />
        {errors.fullName && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.fullName.message}</p>}
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
            Email Address (Optional)
          </label>
          <input
            {...register("email")}
            placeholder="you@example.com"
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            Current Class *
          </label>
          <select
            {...register("targetClass")}
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          >
            <option value="">Select Class</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
            <option value="Dropper">12th Pass / Dropper</option>
          </select>
          {errors.targetClass && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.targetClass.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
            Course Interest *
          </label>
          <select
            {...register("courseInterest")}
            className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
          >
            <option value="">Select Program</option>
            <option value="Aspire (Class 11)">Aspire Program (Class 11)</option>
            <option value="Zenith (Class 12)">Zenith Program (Class 12)</option>
            <option value="Excel (Dropper)">Excel Program (Dropper)</option>
            <option value="LTPE 2026">LTPE 2026 Scholarship Exam</option>
          </select>
          {errors.courseInterest && <p className="text-[11px] font-bold text-red-600 mt-1">{errors.courseInterest.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
          Your Message / Query
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="How can we help you with JEE preparation?"
          className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-700/50 font-medium focus:outline-none focus:border-[#0F7A3C] focus:bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-700/20 transition-all text-sm disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Submit Enquiry</span>
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
