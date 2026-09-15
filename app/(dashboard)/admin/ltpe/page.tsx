"use client";

import { useState, useEffect } from "react";
import {
  ClipboardList,
  Search,
  Download,
  Eye,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  AlertTriangle,
  Phone,
  MessageCircle,
  Printer,
  Calendar,
  Building,
  User,
  GraduationCap,
  MapPin,
  RefreshCw,
  Award,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import { exportToCsv } from "@/lib/csv-exporter";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface LtpeRegistration {
  id: string;
  registrationNo: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  phone?: string;
  parentEmail?: string;
  currentClass: string;
  class?: string;
  school?: string;
  city?: string;
  status: string;
  examDate?: string;
  examCenter?: string;
  createdAt?: string;
}

export default function LtpeAdminPage() {
  const [ltpeList, setLtpeList] = useState<LtpeRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");

  // Modal States
  const [viewingItem, setViewingItem] = useState<LtpeRegistration | null>(null);
  const [editingItem, setEditingItem] = useState<LtpeRegistration | null>(null);
  const [deletingItem, setDeletingItem] = useState<LtpeRegistration | null>(null);

  // Action Loading & Toast States
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [copiedRegNo, setCopiedRegNo] = useState(false);

  function showToast(text: string, type: "success" | "error" = "success") {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  }

  async function loadLtpeRegistrations(silent = false) {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      // 1. Direct Supabase query
      try {
        const supabase = createClient();
        const { data: sbData, error: sbErr } = await supabase
          .from("ltpe_registrations")
          .select("*")
          .order("created_at", { ascending: false });

        if (!sbErr && sbData && sbData.length > 0) {
          const formatted: LtpeRegistration[] = sbData.map((row: any) => ({
            id: row.id,
            registrationNo: row.registration_no,
            studentName: row.student_name,
            parentName: row.parent_name,
            parentPhone: row.parent_phone,
            phone: row.parent_phone,
            parentEmail: row.parent_email || "",
            currentClass: row.current_class,
            class: row.current_class,
            city: row.city || "Mathura",
            school: row.school || "",
            status: row.status || "CONFIRMED",
            examDate: row.exam_date || "11 October 2026",
            examCenter: row.exam_center || "Lakshya Academy Campus, Krishna Nagar, Mathura",
            createdAt: row.created_at,
          }));
          setLtpeList(formatted);
          setIsLoading(false);
          setIsRefreshing(false);
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
      showToast("Failed to fetch registrations", "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadLtpeRegistrations();
  }, []);

  // Filter logic
  const filtered = ltpeList.filter((item) => {
    const student = (item.studentName || "").toLowerCase();
    const regNo = (item.registrationNo || "").toLowerCase();
    const phone = (item.parentPhone || item.phone || "").toLowerCase();
    const city = (item.city || "").toLowerCase();
    const school = (item.school || "").toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch =
      student.includes(q) ||
      regNo.includes(q) ||
      phone.includes(q) ||
      city.includes(q) ||
      school.includes(q);

    const matchesClass =
      selectedClassFilter === "ALL" ||
      (item.currentClass || item.class || "").toLowerCase().includes(selectedClassFilter.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "ALL" ||
      (item.status || "CONFIRMED").toUpperCase() === selectedStatusFilter.toUpperCase();

    return matchesSearch && matchesClass && matchesStatus;
  });

  // Export CSV
  function handleExportCsv() {
    const csvData = filtered.map((item) => ({
      "Registration No": item.registrationNo || "",
      "Student Name": item.studentName || "",
      "Class": item.currentClass || item.class || "",
      "Parent Name": item.parentName || "",
      "Parent Phone": item.parentPhone || item.phone || "",
      "Email": item.parentEmail || "",
      "School": item.school || "",
      "City": item.city || "Mathura",
      "Exam Date": item.examDate || "11 October 2026",
      "Status": item.status || "CONFIRMED",
      "Registration Date": item.createdAt ? new Date(item.createdAt).toLocaleString() : "",
    }));
    exportToCsv("Lakshya_LTPE_2026_Registrations", csvData);
    showToast(`Exported ${filtered.length} registrations to CSV`);
  }

  // Handle Save Edit
  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    try {
      // 1. Direct Supabase update
      try {
        const supabase = createClient();
        await supabase
          .from("ltpe_registrations")
          .update({
            student_name: editingItem.studentName,
            parent_name: editingItem.parentName,
            parent_phone: editingItem.parentPhone || editingItem.phone,
            parent_email: editingItem.parentEmail || null,
            current_class: editingItem.currentClass || editingItem.class,
            school: editingItem.school || null,
            city: editingItem.city || "Mathura",
            status: editingItem.status || "CONFIRMED",
            updated_at: new Date().toISOString(),
          })
          .eq("registration_no", editingItem.registrationNo);
      } catch (sbErr) {
        console.warn("Client Supabase update handled:", sbErr);
      }

      // 2. Call API PUT
      const res = await fetch("/api/ltpe", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update registration");
      }

      // Update local state
      setLtpeList((prev) =>
        prev.map((item) =>
          item.registrationNo === editingItem.registrationNo ? { ...editingItem } : item
        )
      );

      // If viewing modal is also open, update it
      if (viewingItem && viewingItem.registrationNo === editingItem.registrationNo) {
        setViewingItem({ ...editingItem });
      }

      setEditingItem(null);
      showToast("Student registration updated successfully!");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Could not save changes. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  // Handle Delete Confirmation
  async function handleDelete() {
    if (!deletingItem) return;

    setIsDeleting(true);
    try {
      // 1. Direct Supabase delete
      try {
        const supabase = createClient();
        await supabase
          .from("ltpe_registrations")
          .delete()
          .eq("registration_no", deletingItem.registrationNo);
      } catch (sbErr) {
        console.warn("Client Supabase delete handled:", sbErr);
      }

      // 2. Call API DELETE
      const res = await fetch(
        `/api/ltpe?registrationNo=${encodeURIComponent(deletingItem.registrationNo)}&id=${encodeURIComponent(
          deletingItem.id
        )}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete registration");
      }

      // Remove from local state
      setLtpeList((prev) =>
        prev.filter((item) => item.registrationNo !== deletingItem.registrationNo)
      );

      if (viewingItem?.registrationNo === deletingItem.registrationNo) {
        setViewingItem(null);
      }

      const deletedName = deletingItem.studentName;
      setDeletingItem(null);
      showToast(`Registration for "${deletedName}" deleted successfully.`);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to delete registration.", "error");
    } finally {
      setIsDeleting(false);
    }
  }

  // Copy Reg No to Clipboard
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedRegNo(true);
    setTimeout(() => setCopiedRegNo(false), 2000);
    showToast("Registration number copied to clipboard!");
  }

  // Send WhatsApp Hall Ticket / Reminder
  function sendWhatsAppNotification(item: LtpeRegistration) {
    const phone = (item.parentPhone || item.phone || "").replace(/\D/g, "");
    const formattedPhone = phone.length === 10 ? `91${phone}` : phone;
    const msg = encodeURIComponent(
      `*LAKSHYA ACADEMY — LTPE 2026 ADMIT CARD*\n\nDear ${item.parentName || "Parent"},\n\n` +
        `This is to confirm that *${item.studentName}* is successfully registered for the *Lakshya Talent Promotional Exam (LTPE 2026)*.\n\n` +
        `📋 *Registration No:* ${item.registrationNo}\n` +
        `🎯 *Class:* ${item.currentClass || item.class}\n` +
        `📅 *Exam Date:* ${item.examDate || "11 October 2026 (Sunday)"}\n` +
        `🏢 *Exam Venue:* Lakshya Academy Campus, 190/2, Krishna Nagar, Mathura\n\n` +
        `Please reach the examination center 30 minutes before the scheduled time along with this Registration Number.\n\n` +
        `For any queries, call us at +91 9319098141.\n` +
        `*Lakshya Academy — Your Dream, Our Mission!*`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${msg}`, "_blank");
  }

  function escapeHtml(str: string) {
    return (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Print Hall Ticket Dialog
  function handlePrintAdmitCard(item: LtpeRegistration) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>LTPE 2026 Admit Card - ${escapeHtml(item.studentName)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #111; }
          .ticket-card { border: 2px solid #0F7A3C; border-radius: 16px; padding: 32px; max-width: 700px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 24px; }
          .logo-title { font-size: 26px; font-weight: 900; color: #0F7A3C; margin: 0; text-transform: uppercase; }
          .subtitle { font-size: 13px; font-weight: 700; color: #374151; margin-top: 4px; }
          .badge { display: inline-block; background: #E8F5EE; color: #0F7A3C; font-weight: 800; font-size: 12px; padding: 4px 14px; border-radius: 20px; margin-top: 10px; }
          .reg-box { background: #F4FAF6; border: 1px dashed #0F7A3C; border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 24px; }
          .reg-no { font-family: monospace; font-size: 24px; font-weight: 900; color: #0F7A3C; letter-spacing: 2px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
          .field { font-size: 12px; }
          .label { font-weight: 700; color: #6b7280; text-transform: uppercase; font-size: 10px; }
          .value { font-weight: 800; color: #111827; font-size: 14px; margin-top: 2px; }
          .footer-note { background: #f9fafb; border-radius: 8px; padding: 12px; font-size: 11px; color: #4b5563; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="ticket-card">
          <div class="header">
            <h1 class="logo-title">LAKSHYA ACADEMY</h1>
            <p class="subtitle">A Dedicated Team of IITians | Krishna Nagar, Mathura</p>
            <span class="badge">OFFICIAL LTPE 2026 HALL TICKET</span>
          </div>

          <div class="reg-box">
            <div class="label">Registration Number</div>
            <div class="reg-no">${escapeHtml(item.registrationNo)}</div>
          </div>

          <div class="grid">
            <div class="field"><div class="label">Candidate Name</div><div class="value">${escapeHtml(item.studentName)}</div></div>
            <div class="field"><div class="label">Class</div><div class="value">${escapeHtml(item.currentClass || item.class || "")}</div></div>
            <div class="field"><div class="label">Parent / Guardian</div><div class="value">${escapeHtml(item.parentName)}</div></div>
            <div class="field"><div class="label">Mobile Number</div><div class="value">${escapeHtml(item.parentPhone || item.phone || "")}</div></div>
            <div class="field"><div class="label">School</div><div class="value">${escapeHtml(item.school || "Not specified")}</div></div>
            <div class="field"><div class="label">City / Town</div><div class="value">${escapeHtml(item.city || "Mathura")}</div></div>
            <div class="field"><div class="label">Official Exam Date</div><div class="value">${escapeHtml(item.examDate || "11 October 2026 (Sunday)")}</div></div>
            <div class="field"><div class="label">Exam Fee Status</div><div class="value">₹100 (Registration Confirmed)</div></div>
          </div>

          <div class="field" style="margin-bottom: 20px;">
            <div class="label">Examination Venue</div>
            <div class="value">${escapeHtml(item.examCenter || "Lakshya Academy Campus, 190/2, Krishna Nagar, Mathura")}</div>
          </div>

          <div class="footer-note">
            <strong>Instructions for Candidate:</strong><br/>
            1. Please report to the examination center at least 30 minutes before the exam time.<br/>
            2. Carry a valid student ID card or school badge along with this hall ticket copy.<br/>
            3. For helpline / enquiries, contact <strong>+91 9319098141 / +91 7895060239</strong>.
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  // Count by Class
  const class8Count = ltpeList.filter((i) => (i.currentClass || i.class || "").includes("8")).length;
  const class9Count = ltpeList.filter((i) => (i.currentClass || i.class || "").includes("9")).length;
  const class10Count = ltpeList.filter((i) => (i.currentClass || i.class || "").includes("10")).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl border text-xs font-bold transition-all animate-in fade-in slide-in-from-bottom-5",
            toastMessage.type === "success"
              ? "bg-[#0F7A3C] text-white border-emerald-600"
              : "bg-red-600 text-white border-red-700"
          )}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-emerald-200" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-red-200" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <PageHeader
        title="LTPE 2026 Registrations"
        description="Manage Lakshya Talent Promotional Exam 2026 (11 October 2026) candidates, edit details & issue hall tickets"
        icon={ClipboardList}
        breadcrumbs={[{ label: "Admin" }, { label: "LTPE 2026" }]}
        actions={
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => loadLtpeRegistrations(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              title="Refresh registration data"
            >
              <RefreshCw className={cn("h-3.5 w-3.5 text-[#0F7A3C]", isRefreshing && "animate-spin")} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        }
      />

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-black text-gray-900 font-heading">{ltpeList.length}</p>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F7A3C] flex items-center justify-center font-bold">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-gray-500 font-semibold mt-1">Total Registered Candidates</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-black text-blue-600 font-heading">{class8Count}</p>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
              Class 8
            </span>
          </div>
          <p className="text-xs text-gray-500 font-semibold mt-1">Class 8 Candidates</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-black text-purple-600 font-heading">{class9Count}</p>
            <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md">
              Class 9
            </span>
          </div>
          <p className="text-xs text-gray-500 font-semibold mt-1">Class 9 Candidates</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-black text-[#0F7A3C] font-heading">{class10Count}</p>
            <span className="text-[10px] font-bold bg-emerald-50 text-[#0F7A3C] px-2 py-0.5 rounded-md">
              Class 10
            </span>
          </div>
          <p className="text-xs text-gray-500 font-semibold mt-1">Class 10 Candidates</p>
        </div>
      </div>

      {/* Filter and Class Tabs Bar */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-xs space-y-3">
        {/* Class Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-50/70 p-1 rounded-xl border border-emerald-100">
            {[
              { id: "ALL", label: `All (${ltpeList.length})` },
              { id: "Class 8", label: `Class 8 (${class8Count})` },
              { id: "Class 9", label: `Class 9 (${class9Count})` },
              { id: "Class 10", label: `Class 10 (${class10Count})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedClassFilter(tab.id)}
                className={cn(
                  "text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedClassFilter === tab.id
                    ? "bg-[#0F7A3C] text-white shadow-xs"
                    : "text-emerald-950 hover:bg-emerald-100/60"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-gray-500">
            Showing <span className="text-[#0F7A3C] font-black">{filtered.length}</span> of {ltpeList.length} candidates
          </div>
        </div>

        {/* Search & Status Filter Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-700" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, reg no, mobile, city, school..."
              className="w-full bg-[#F4FAF6] border border-emerald-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-[#F4FAF6] border border-emerald-100 rounded-xl px-3 py-2.5 text-xs font-bold text-emerald-950 focus:outline-none focus:border-[#0F7A3C] focus:bg-white w-full sm:w-auto"
            >
              <option value="ALL">All Statuses</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="PENDING">PENDING</option>
              <option value="ATTENDED">ATTENDED</option>
              <option value="ABSENT">ABSENT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="text-center py-20 text-emerald-900 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#0F7A3C]" />
            <p className="text-xs font-bold">Loading registrations from Supabase...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-emerald-50/70 border-b border-emerald-100 text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                  <th className="px-5 py-4">Reg No</th>
                  <th className="px-4 py-4">Student Name</th>
                  <th className="px-4 py-4">Class & City</th>
                  <th className="px-4 py-4">Parent & Contact</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/60 text-xs font-medium text-gray-700">
                {filtered.map((item) => (
                  <tr key={item.id || item.registrationNo} className="hover:bg-emerald-50/30 transition-colors">
                    {/* Reg No */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold font-mono text-[#0F7A3C] bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100">
                          {item.registrationNo}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.registrationNo)}
                          className="text-gray-400 hover:text-emerald-700 p-1"
                          title="Copy Reg No"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </td>

                    {/* Student Name */}
                    <td className="px-4 py-4">
                      <p className="font-bold text-gray-900 text-sm">{item.studentName}</p>
                      {item.school && (
                        <p className="text-[11px] text-gray-500 truncate max-w-[200px]" title={item.school}>
                          {item.school}
                        </p>
                      )}
                    </td>

                    {/* Class & City */}
                    <td className="px-4 py-4">
                      <span className="font-bold text-emerald-950 bg-emerald-100/70 text-emerald-900 px-2 py-0.5 rounded-md text-[11px]">
                        {item.currentClass || item.class}
                      </span>
                      <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-600" />
                        <span>{item.city || "Mathura"}</span>
                      </p>
                    </td>

                    {/* Parent & Phone */}
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">{item.parentName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`tel:${item.parentPhone || item.phone}`}
                          className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" />
                          <span>{item.parentPhone || item.phone}</span>
                        </a>
                        <button
                          onClick={() => sendWhatsAppNotification(item)}
                          className="text-emerald-600 hover:text-emerald-800 p-0.5 rounded bg-emerald-50 border border-emerald-200"
                          title="WhatsApp Hall Ticket to Parent"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                        </button>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border",
                          (item.status || "CONFIRMED") === "CONFIRMED"
                            ? "bg-emerald-50 text-[#0F7A3C] border-emerald-200"
                            : item.status === "ATTENDED"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : item.status === "ABSENT"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        )}
                      >
                        {item.status || "CONFIRMED"}
                      </span>
                    </td>

                    {/* Action Buttons: View, Edit, Delete */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* 1. View Button */}
                        <button
                          onClick={() => setViewingItem(item)}
                          className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-[#0F7A3C] text-[#0F7A3C] hover:text-white border border-emerald-200 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                          title="View Complete Details & Hall Ticket"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="hidden md:inline">View</span>
                        </button>

                        {/* 2. Edit Button */}
                        <button
                          onClick={() => setEditingItem({ ...item })}
                          className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-white border border-amber-200 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                          title="Edit Student Details"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          <span className="hidden md:inline">Edit</span>
                        </button>

                        {/* 3. Delete Button */}
                        <button
                          onClick={() => setDeletingItem(item)}
                          className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                          title="Delete Registration"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden md:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-sm font-medium space-y-2">
            <p className="font-bold text-gray-700">No matching registrations found.</p>
            <p className="text-xs text-gray-400">Try changing your search query or class filter.</p>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. VIEW DETAILS MODAL                                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white border border-emerald-100 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0F7A3C] to-[#0B5C2D] text-white p-6 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                  Candidate Registration Details
                </span>
                <h3 className="text-2xl font-black font-heading mt-2">{viewingItem.studentName}</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Class: <strong>{viewingItem.currentClass || viewingItem.class}</strong> • City: {viewingItem.city || "Mathura"}
                </p>
              </div>
              <button
                onClick={() => setViewingItem(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Reg No & Status Banner */}
              <div className="bg-[#F4FAF6] border-2 border-emerald-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Registration Number</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-2xl font-black font-mono text-[#0F7A3C]">{viewingItem.registrationNo}</p>
                    <button
                      onClick={() => copyToClipboard(viewingItem.registrationNo)}
                      className="p-1 text-emerald-700 hover:text-emerald-900"
                      title="Copy"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black bg-emerald-100 text-[#0F7A3C] px-3.5 py-1.5 rounded-full border border-emerald-300 uppercase">
                    Status: {viewingItem.status || "CONFIRMED"}
                  </span>
                </div>
              </div>

              {/* Detail Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Candidate Name</p>
                  <p className="font-black text-gray-900 text-sm mt-0.5 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#0F7A3C]" />
                    {viewingItem.studentName}
                  </p>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Parent / Guardian</p>
                  <p className="font-black text-gray-900 text-sm mt-0.5">{viewingItem.parentName}</p>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Mobile Number (WhatsApp)</p>
                  <p className="font-black text-gray-900 text-sm mt-0.5 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#0F7A3C]" />
                    {viewingItem.parentPhone || viewingItem.phone}
                  </p>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Eligible Class</p>
                  <p className="font-black text-[#0F7A3C] text-sm mt-0.5 flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {viewingItem.currentClass || viewingItem.class}
                  </p>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Current School</p>
                  <p className="font-black text-gray-900 text-sm mt-0.5">{viewingItem.school || "Not specified"}</p>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">City / Town</p>
                  <p className="font-black text-gray-900 text-sm mt-0.5">{viewingItem.city || "Mathura"}</p>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Official Exam Date</p>
                  <p className="font-black text-emerald-950 text-sm mt-0.5 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#0F7A3C]" />
                    {viewingItem.examDate || "11 October 2026"}
                  </p>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Exam Fee</p>
                  <p className="font-black text-[#0F7A3C] text-sm mt-0.5">₹100 (Registration Confirmed)</p>
                </div>
              </div>

              {/* Exam Venue Box */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950 flex items-start gap-2.5">
                <Building className="h-4 w-4 text-[#0F7A3C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Examination Venue:</p>
                  <p className="text-gray-700 mt-0.5">
                    {viewingItem.examCenter || "Lakshya Academy Campus, 190/2, Krishna Nagar, Mathura"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => sendWhatsAppNotification(viewingItem)}
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Hall Ticket</span>
                  </button>

                  <button
                    onClick={() => handlePrintAdmitCard(viewingItem)}
                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Hall Ticket</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const item = { ...viewingItem };
                      setViewingItem(null);
                      setEditingItem(item);
                    }}
                    className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit Details</span>
                  </button>
                  <button
                    onClick={() => setViewingItem(null)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2. EDIT DETAILS MODAL                                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white border border-emerald-100 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden my-8">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                  Edit Candidate Record
                </span>
                <h3 className="text-xl font-black font-heading mt-2">Edit {editingItem.studentName}</h3>
                <p className="text-xs text-amber-100 font-mono mt-0.5">Reg No: {editingItem.registrationNo}</p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.studentName}
                    onChange={(e) => setEditingItem({ ...editingItem, studentName: e.target.value })}
                    className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
                  />
                </div>

                {/* Parent Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.parentName}
                    onChange={(e) => setEditingItem({ ...editingItem, parentName: e.target.value })}
                    className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.parentPhone || editingItem.phone}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        parentPhone: e.target.value,
                        phone: e.target.value,
                      })
                    }
                    className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Current Class *
                  </label>
                  <select
                    value={editingItem.currentClass || editingItem.class}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        currentClass: e.target.value,
                        class: e.target.value,
                      })
                    }
                    className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                {/* School */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.school || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, school: e.target.value })}
                    placeholder="e.g. St. Paul's, DPS"
                    className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={editingItem.city || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value })}
                    placeholder="e.g. Mathura, Vrindavan"
                    className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Registration Status
                  </label>
                  <select
                    value={editingItem.status || "CONFIRMED"}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="ATTENDED">ATTENDED</option>
                    <option value="ABSENT">ABSENT</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                {/* Exam Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Exam Date
                  </label>
                  <input
                    type="text"
                    value={editingItem.examDate || "11 October 2026"}
                    onChange={(e) => setEditingItem({ ...editingItem, examDate: e.target.value })}
                    className="w-full bg-[#F4FAF6] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#0F7A3C] focus:bg-white"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. DELETE CONFIRMATION MODAL                                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white border border-rose-100 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden p-6 space-y-5 my-8">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
              <Trash2 className="h-7 w-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black font-heading text-gray-900">Delete Registration?</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Are you sure you want to permanently delete the registration record for{" "}
                <strong className="text-gray-900 font-bold">{deletingItem.studentName}</strong>?
              </p>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs font-mono font-bold text-rose-900">
                Reg No: {deletingItem.registrationNo} • Class: {deletingItem.currentClass || deletingItem.class}
              </div>
              <p className="text-[11px] text-gray-400">This action will remove the candidate from Supabase database.</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                disabled={isDeleting}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-rose-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
