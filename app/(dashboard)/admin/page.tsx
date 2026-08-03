"use client";

import { useState, useEffect } from "react";
import {
  Users, PhoneCall, GraduationCap, ClipboardList, TrendingUp, Plus, ArrowUpRight, Clock, Star
} from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard/ui/stat-card";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import {
  MonthlyChart, AdmissionsBarChart, EnquiryStatusPie, LeadSourceChart
} from "@/components/dashboard/charts/dashboard-charts";
import { studentTestimonials } from "@/data/homepage-data";
import { topResultsData } from "@/data/results-data";
import { blogPosts, galleryItems } from "@/data/extended-data";

export default function AdminDashboardPage() {
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [admissionsCount, setAdmissionsCount] = useState(0);
  const [ltpeCount, setLtpeCount] = useState(0);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLiveMetrics() {
      try {
        const [enqRes, ltpeRes] = await Promise.all([
          fetch("/api/admin/enquiries"),
          fetch("/api/ltpe")
        ]);

        if (enqRes.ok) {
          const enqData = await enqRes.json();
          if (enqData.total !== undefined) {
            setEnquiriesCount(enqData.total);
          }
          if (Array.isArray(enqData.data)) {
            setRecentLeads(enqData.data);
            const admitted = enqData.data.filter((e: any) => e.status === "ADMITTED").length;
            setAdmissionsCount(admitted);
          }
        }

        if (ltpeRes.ok) {
          const ltpeData = await ltpeRes.json();
          if (ltpeData.total !== undefined) {
            setLtpeCount(ltpeData.total);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchLiveMetrics();
  }, []);

  const monthlyEnquiriesData = [
    { month: "Aug 24", count: 0 }, { month: "Sep 24", count: 0 }, { month: "Oct 24", count: 0 },
    { month: "Nov 24", count: 0 }, { month: "Dec 24", count: 0 }, { month: "Jan 25", count: 0 },
    { month: "Feb 25", count: 0 }, { month: "Mar 25", count: 0 }, { month: "Apr 25", count: 0 },
    { month: "May 25", count: 0 }, { month: "Jun 25", count: 0 }, { month: "Jul 25", count: enquiriesCount },
  ];

  const monthlyAdmissionsData = [
    { month: "Aug 24", count: 0 }, { month: "Sep 24", count: 0 }, { month: "Oct 24", count: 0 },
    { month: "Nov 24", count: 0 }, { month: "Dec 24", count: 0 }, { month: "Jan 25", count: 0 },
    { month: "Feb 25", count: 0 }, { month: "Mar 25", count: 0 }, { month: "Apr 25", count: 0 },
    { month: "May 25", count: 0 }, { month: "Jun 25", count: 0 }, { month: "Jul 25", count: admissionsCount },
  ];

  const enquiryStatusData = [
    { label: "New", value: enquiriesCount, color: "#0F7A3C" },
    { label: "Interested", value: 0, color: "#10b981" },
    { label: "Callback", value: 0, color: "#D4AF37" },
    { label: "Admitted", value: admissionsCount, color: "#059669" },
    { label: "Lost", value: 0, color: "#ef4444" },
  ];

  const leadSourcesData = [
    { label: "Website Form", value: enquiriesCount },
    { label: "WhatsApp", value: 0 },
    { label: "LTPE Exam", value: ltpeCount },
    { label: "Direct Call", value: 0 },
  ];

  return (
    <div className="space-y-6 bg-white">
      <PageHeader
        title="Admin Overview"
        description="Real-time live metrics, student enquiries, admissions, and quick management"
        icon={TrendingUp}
        breadcrumbs={[{ label: "Admin" }, { label: "Overview" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/enquiries" className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all">
              <Plus className="h-4 w-4" /> Add Lead
            </Link>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Enquiries" value={`${enquiriesCount}`} change="Live" changeType="positive" subtitle="Form Submissions" icon={PhoneCall} />
        <StatCard title="Total Admissions" value={`${admissionsCount}`} change="Live" changeType="positive" subtitle="Active Enrolled" icon={Users} />
        <StatCard title="LTPE 2026 Registrations" value={`${ltpeCount}`} change="Live" changeType="positive" subtitle="Exam: 23 Aug 2026" icon={ClipboardList} />
        <StatCard title="Active Toppers" value={`${topResultsData.length}`} change="Real Roster" changeType="positive" subtitle="IIT-JEE Rankers" icon={Star} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-emerald-100/90 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm font-heading">Real-Time Enquiry Volume</h3>
              <p className="text-xs text-gray-500">Live web form submissions</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full uppercase">Updated Live</span>
          </div>
          <MonthlyChart data={monthlyEnquiriesData} />
        </div>

        <div className="bg-white border border-emerald-100/90 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm font-heading">Monthly Admissions</h3>
              <p className="text-xs text-gray-500">Enrolled classroom students</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full uppercase">Active Session</span>
          </div>
          <AdmissionsBarChart data={monthlyAdmissionsData} />
        </div>

        <div className="bg-white border border-emerald-100/90 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm font-heading mb-1">Enquiry Pipeline Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Current lead status breakdown</p>
          <EnquiryStatusPie data={enquiryStatusData} />
        </div>

        <div className="bg-white border border-emerald-100/90 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm font-heading mb-1">Lead Source Performance</h3>
          <p className="text-xs text-gray-500 mb-4">Channels generating student enquiries</p>
          <LeadSourceChart data={leadSourcesData} />
        </div>
      </div>

      {/* Live Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Incoming Leads */}
        <div className="lg:col-span-2 bg-white border border-emerald-100/90 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm font-heading flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#0F7A3C]" /> Live Incoming Enquiries & LTPE Submissions
            </h3>
            <Link href="/admin/enquiries" className="text-xs font-bold text-[#0F7A3C] hover:underline flex items-center gap-1">
              <span>View All CRM Pipeline</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {recentLeads.length > 0 ? (
            <div className="space-y-3">
              {recentLeads.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-3.5 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{f.studentName || f.name}</p>
                    <p className="text-xs text-gray-500">{f.phone} · <span className="font-semibold text-emerald-800">{f.interestedCourse || f.course || "General"}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold bg-[#0F7A3C]/10 text-[#0F7A3C] border border-[#0F7A3C]/20 px-2 py-0.5 rounded-full uppercase">
                      {f.status || "NEW"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-emerald-50/30 rounded-2xl border border-dashed border-emerald-200 p-6">
              <p className="text-sm font-bold text-gray-700 mb-1">No enquiries submitted yet</p>
              <p className="text-xs text-gray-500 mb-3">When students fill the contact or admission form on the website, their live details will appear here immediately.</p>
              <Link href="/contact" target="_blank" className="text-xs font-bold text-[#0F7A3C] hover:underline">
                Test Contact Form on Website →
              </Link>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-[#0F7A3C]/5 border border-[#0F7A3C]/15 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm font-heading mb-3">Quick Management Actions</h3>
            <div className="space-y-2">
              <Link href="/admin/students" className="block p-3 bg-white hover:bg-emerald-50 border border-emerald-200/60 rounded-xl text-xs font-bold text-emerald-900 transition-all">
                🎓 Manage Enrolled Students
              </Link>
              <Link href="/admin/ltpe" className="block p-3 bg-white hover:bg-emerald-50 border border-emerald-200/60 rounded-xl text-xs font-bold text-emerald-900 transition-all">
                📝 LTPE 2026 Exam Registrations ({ltpeCount} Registered)
              </Link>
              <Link href="/admin/blog" className="block p-3 bg-white hover:bg-emerald-50 border border-emerald-200/60 rounded-xl text-xs font-bold text-emerald-900 transition-all">
                🤖 Blog & AI Studio ({blogPosts.length} Articles)
              </Link>
              <Link href="/admin/gallery" className="block p-3 bg-white hover:bg-emerald-50 border border-emerald-200/60 rounded-xl text-xs font-bold text-emerald-900 transition-all">
                🖼️ Gallery Manager ({galleryItems.length} Real Photos)
              </Link>
              <Link href="/admin/settings" className="block p-3 bg-white hover:bg-emerald-50 border border-emerald-200/60 rounded-xl text-xs font-bold text-emerald-900 transition-all">
                ⚙️ Institute Site Settings
              </Link>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white border border-emerald-200 rounded-xl text-center">
            <p className="text-xs font-bold text-[#0F7A3C]">Lakshya Academy Live Data Sync</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Real-Time Forms Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
