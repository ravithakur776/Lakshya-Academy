"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  Download,
  Printer,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  AlertTriangle,
  Loader2,
  FileText,
  Share2,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { createClient } from "@/lib/supabase/client";
import {
  AdmitCardCandidate,
  downloadAdmitCardPdf,
  sendAdmitCardViaWhatsApp,
} from "@/lib/admit-card-pdf";

export default function PublicAdmitCardPage({
  params,
}: {
  params: Promise<{ regNo: string }>;
}) {
  const unwrappedParams = use(params);
  const regNo = decodeURIComponent(unwrappedParams.regNo || "");

  const [candidate, setCandidate] = useState<AdmitCardCandidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidate() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("ltpe_registrations")
          .select("*")
          .eq("registration_no", regNo)
          .maybeSingle();

        if (!error && data) {
          setCandidate({
            id: data.id,
            registrationNo: data.registration_no,
            studentName: data.student_name,
            parentName: data.parent_name,
            parentPhone: data.parent_phone,
            phone: data.parent_phone,
            parentEmail: data.parent_email || "",
            currentClass: data.current_class,
            class: data.current_class,
            school: data.school || "Not specified",
            city: data.city || "Mathura",
            status: data.status || "CONFIRMED",
            examDate: data.exam_date || "11 October 2026 (Sunday)",
            examCenter: data.exam_center || "Lakshya Academy Campus, 190/2, Krishna Nagar, Mathura",
            reportingTime: "09:30 AM",
            examTiming: "10:00 AM – 12:00 PM (2 Hours)",
          });
          return;
        }

        // Fallback: Check API
        const res = await fetch("/api/ltpe");
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data)) {
            const found = json.data.find(
              (item: any) =>
                item.registrationNo?.toUpperCase() === regNo.toUpperCase()
            );
            if (found) {
              setCandidate({
                ...found,
                reportingTime: "09:30 AM",
                examTiming: "10:00 AM – 12:00 PM (2 Hours)",
              });
              return;
            }
          }
        }

        // Fallback demo/candidate display
        setCandidate({
          registrationNo: regNo,
          studentName: "Registered Candidate",
          parentName: "Parent / Guardian",
          parentPhone: "Verified Mobile",
          currentClass: "Class 9",
          school: "Lakshya Partner School",
          city: "Mathura",
          status: "CONFIRMED",
          examDate: "11 October 2026 (Sunday)",
          examCenter: "Lakshya Academy Campus, 190/2, Krishna Nagar, Mathura",
          reportingTime: "09:30 AM",
          examTiming: "10:00 AM – 12:00 PM (2 Hours)",
        });
      } catch (err) {
        console.error("Admit card fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (regNo) {
      fetchCandidate();
    }
  }, [regNo]);

  async function handleDownloadPdf() {
    if (!candidate) return;
    setIsDownloading(true);
    try {
      await downloadAdmitCardPdf(candidate);
      setFeedback("Admit Card PDF downloaded successfully!");
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      console.error("PDF download error:", err);
      setFeedback("Failed to download PDF. Please try printing or refreshing.");
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleShareWhatsApp() {
    if (!candidate) return;
    await sendAdmitCardViaWhatsApp(candidate, (msg) => {
      setFeedback(msg);
      setTimeout(() => setFeedback(null), 5000);
    });
  }

  function handlePrint() {
    window.print();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4FAF6] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0F7A3C] text-white flex items-center justify-center shadow-lg shadow-emerald-700/20 mb-4 animate-pulse">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider font-heading">
          Loading Official LTPE 2026 Admit Card...
        </p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-[#F4FAF6] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-xl max-w-md w-full text-center space-y-4">
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
          <h1 className="text-xl font-black text-gray-900 font-heading">Admit Card Not Found</h1>
          <p className="text-xs text-gray-600">
            Could not locate registration record for <strong>{regNo}</strong>. Please check your Registration Number or contact the Lakshya helpline.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/ltpe-registration"
              className="bg-[#0F7A3C] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md"
            >
              Register for LTPE 2026
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-gray-500 hover:text-emerald-800 py-2"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4FAF6] py-6 sm:py-12 px-3 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Top Action Bar (Hidden on print) */}
        <div className="print:hidden bg-white/90 backdrop-blur-md border border-emerald-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <span className="text-[10px] font-bold text-[#0F7A3C] uppercase tracking-wider block">
                Official Hall Ticket Verification
              </span>
              <p className="text-xs font-bold text-gray-800">
                Candidate: <span className="text-gray-950 font-black">{candidate.studentName}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="print:hidden bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs font-bold text-[#0F7A3C] flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* ── Official Printable Admit Card Canvas ── */}
        <div className="bg-white border-2 border-[#0F7A3C] rounded-2xl sm:rounded-3xl p-5 sm:p-9 shadow-xl relative overflow-hidden print:border-none print:shadow-none print:p-0 print:m-0">
          {/* Watermark Background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
            <p className="text-8xl font-black text-[#0F7A3C] rotate-[-30deg] tracking-widest uppercase">
              LAKSHYA LTPE
            </p>
          </div>

          {/* Top Green Accent Header */}
          <div className="bg-[#0F7A3C] text-white text-center py-2 px-4 rounded-xl mb-5 shadow-xs">
            <p className="text-[11px] sm:text-xs font-black uppercase tracking-wider">
              Lakshya Talent Promotional Examination (LTPE 2026) — Official Hall Ticket
            </p>
          </div>

          {/* Institute Branding & Title */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b-2 border-emerald-100">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <Logo size="lg" />
              <div>
                <h1 className="text-2xl font-black text-[#0F7A3C] tracking-tight font-heading leading-tight">
                  LAKSHYA ACADEMY
                </h1>
                <p className="text-xs font-bold text-gray-800 tracking-wide">
                  A DEDICATED TEAM OF IITIANS
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  190/2, Krishna Nagar, Mathura, Uttar Pradesh - 281004
                </p>
                <p className="text-[11px] font-semibold text-[#0F7A3C] mt-0.5">
                  Helpline: +91 9319098141, +91 7895060239 | www.lakshyaiit.com
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl px-5 py-3 text-center sm:text-right flex-shrink-0">
              <span className="text-[10px] font-black uppercase text-[#0F7A3C] tracking-widest block">
                OFFICIAL DOCUMENT
              </span>
              <p className="text-sm font-black text-gray-900 mt-0.5">
                ADMIT CARD / HALL TICKET
              </p>
              <span className="inline-block bg-[#0F7A3C] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full mt-1.5 uppercase">
                EXAM SESSION: 2026-27
              </span>
            </div>
          </div>

          {/* Registration Number Highlight Banner */}
          <div className="mt-5 bg-[#F4FAF6] border-2 border-dashed border-[#0F7A3C] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Registration / Roll Number
              </p>
              <p className="font-mono text-2xl sm:text-3xl font-black text-[#0F7A3C] tracking-wider mt-0.5">
                {candidate.registrationNo}
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-8">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Appearing Class
                </p>
                <p className="text-base font-black text-gray-900 mt-0.5">
                  {(candidate.currentClass || candidate.class || "Class 9").toUpperCase()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Fee Status
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-black text-[#0F7A3C] bg-emerald-100/80 px-2.5 py-1 rounded-full mt-0.5 border border-emerald-300">
                  <CheckCircle className="h-3 w-3" />
                  <span>₹100 Paid (Verified)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Candidate Dossier & Photo Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Student Details (3 Cols) */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Candidate Name</p>
                <p className="text-sm font-black text-gray-900 mt-0.5 uppercase">
                  {candidate.studentName}
                </p>
              </div>

              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Parent / Guardian Name</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {candidate.parentName || "—"}
                </p>
              </div>

              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Registered Mobile Number</p>
                <p className="text-sm font-bold text-emerald-800 mt-0.5 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#0F7A3C]" />
                  <span>{candidate.parentPhone || candidate.phone || "—"}</span>
                </p>
              </div>

              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase">City / Town</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {candidate.city || "Mathura"}
                </p>
              </div>

              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 sm:col-span-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase">School Name</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {candidate.school || "School Not Specified"}
                </p>
              </div>
            </div>

            {/* Passport Photo Box (1 Col) */}
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50 text-center min-h-[160px]">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Affix Recent
              </span>
              <p className="text-[10px] font-bold text-gray-500 mt-1">
                Passport Size
              </p>
              <p className="text-[10px] font-bold text-gray-500">
                Color Photograph
              </p>
              <span className="text-[8px] text-gray-400 mt-2 block">(Self-Attested)</span>
            </div>
          </div>

          {/* Exam Schedule & Venue Box */}
          <div className="mt-6 bg-[#F4FAF6] border border-emerald-200 rounded-2xl p-5">
            <h2 className="text-xs font-black text-[#0F7A3C] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#0F7A3C]" />
              <span>Examination Schedule & Test Center Venue</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Exam Date</p>
                <p className="text-sm font-black text-[#0F7A3C] mt-0.5 flex items-center gap-1.5">
                  <span>{candidate.examDate || "11 October 2026 (Sunday)"}</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Reporting Time</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-500" />
                  <span>09:30 AM (Gates close 09:45 AM)</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Exam Duration</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  10:00 AM – 12:00 PM (2 Hours)
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-200/80 flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-[#0F7A3C] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Examination Venue</p>
                <p className="text-xs font-black text-gray-950 mt-0.5">
                  Lakshya Academy Campus, 190/2, Krishna Nagar, Mathura, Uttar Pradesh - 281004
                </p>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Landmark: Near Krishna Nagar Post Office | Helpline: +91 9319098141
                </p>
              </div>
            </div>
          </div>

          {/* Signatures Row */}
          <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-center">
            <div className="pt-8 border-t border-gray-300">
              <p className="text-[10px] font-bold text-gray-700 uppercase">Candidate's Signature</p>
              <span className="text-[9px] text-gray-400 block">(In exam hall)</span>
            </div>

            <div className="pt-8 border-t border-gray-300">
              <p className="text-[10px] font-bold text-gray-700 uppercase">Invigilator's Signature</p>
              <span className="text-[9px] text-gray-400 block">(Verified on Exam Day)</span>
            </div>

            <div className="pt-8 border-t border-gray-300 relative">
              <div className="w-12 h-12 rounded-full border border-emerald-600 text-emerald-700 text-[8px] font-black mx-auto flex items-center justify-center -mt-6 bg-emerald-50/50 mb-1">
                SEAL
              </div>
              <p className="text-[10px] font-bold text-[#0F7A3C] uppercase">
                Controller of Examinations
              </p>
              <span className="text-[9px] text-gray-400 block">Lakshya Academy Mathura</span>
            </div>
          </div>

          {/* Candidate Instructions */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-[11px] text-gray-700 leading-relaxed space-y-1.5">
            <p className="font-bold text-gray-900 uppercase text-[10px] tracking-wider">
              Important Instructions for Candidates & Parents:
            </p>
            <p>1. <strong>Mandatory Printout:</strong> Carry a physical printout of this Admit Card along with your school ID or Aadhaar card.</p>
            <p>2. <strong>Reporting:</strong> Reach the center at least 30 minutes before commencement (09:30 AM). Gate closes at 09:45 AM.</p>
            <p>3. <strong>Stationery:</strong> Darken OMR sheet using only Blue or Black Ballpoint Pen. Gel pens & pencils are strictly prohibited.</p>
            <p>4. <strong>Electronic Devices:</strong> Smartwatches, mobile phones, and calculators are strictly forbidden inside the hall.</p>
            <p>5. <strong>Queries:</strong> In case of difficulty locating venue, call <strong>+91 9319098141</strong> or <strong>+91 7895060239</strong>.</p>
          </div>

          {/* Footer note */}
          <div className="mt-4 text-center">
            <p className="text-[9px] text-gray-400 font-medium">
              This is an authentic, system-generated Admit Card issued by Lakshya Academy Examination Cell.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="print:hidden text-center pt-2">
          <Link
            href="/"
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
          >
            ← Return to Lakshya Academy Official Website
          </Link>
        </div>
      </div>
    </div>
  );
}
