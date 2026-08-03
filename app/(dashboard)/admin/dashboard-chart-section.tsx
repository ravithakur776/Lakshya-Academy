"use client";

import { MonthlyChart, AdmissionsBarChart, EnquiryStatusPie, LeadSourceChart } from "@/components/dashboard/charts/dashboard-charts";

// Mock chart data — will be replaced by API call
const MONTHLY_ENQUIRIES = [
  { month: "Aug 24", count: 34 },
  { month: "Sep 24", count: 28 },
  { month: "Oct 24", count: 42 },
  { month: "Nov 24", count: 38 },
  { month: "Dec 24", count: 25 },
  { month: "Jan 25", count: 56 },
  { month: "Feb 25", count: 61 },
  { month: "Mar 25", count: 74 },
  { month: "Apr 25", count: 83 },
  { month: "May 25", count: 67 },
  { month: "Jun 25", count: 49 },
  { month: "Jul 25", count: 58 },
];

const MONTHLY_ADMISSIONS = [
  { month: "Aug 24", count: 12 },
  { month: "Sep 24", count: 8 },
  { month: "Oct 24", count: 15 },
  { month: "Nov 24", count: 11 },
  { month: "Dec 24", count: 6 },
  { month: "Jan 25", count: 24 },
  { month: "Feb 25", count: 19 },
  { month: "Mar 25", count: 31 },
  { month: "Apr 25", count: 28 },
  { month: "May 25", count: 22 },
  { month: "Jun 25", count: 17 },
  { month: "Jul 25", count: 14 },
];

const ENQUIRY_STATUS = [
  { label: "New", value: 45, color: "#3b82f6" },
  { label: "Interested", value: 32, color: "#10b981" },
  { label: "Callback", value: 28, color: "#f59e0b" },
  { label: "Admitted", value: 89, color: "#8b5cf6" },
  { label: "Lost", value: 21, color: "#ef4444" },
  { label: "Not Interested", value: 14, color: "#6b7280" },
];

const LEAD_SOURCES = [
  { label: "WhatsApp", value: 67 },
  { label: "Website", value: 54 },
  { label: "Walk In", value: 38 },
  { label: "Referral", value: 29 },
  { label: "Google", value: 22 },
  { label: "LTPE", value: 18 },
  { label: "Social Media", value: 14 },
];

export function DashboardChartSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Monthly enquiries */}
      <div className="bg-gray-900 border border-gray-800/60 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white text-sm">Monthly Enquiries</h3>
            <p className="text-xs text-gray-500">Last 12 months</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+12% vs last year</span>
        </div>
        <MonthlyChart data={MONTHLY_ENQUIRIES} />
      </div>

      {/* Monthly admissions */}
      <div className="bg-gray-900 border border-gray-800/60 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white text-sm">Monthly Admissions</h3>
            <p className="text-xs text-gray-500">Last 12 months</p>
          </div>
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">207 total</span>
        </div>
        <AdmissionsBarChart data={MONTHLY_ADMISSIONS} />
      </div>

      {/* Enquiry status */}
      <div className="bg-gray-900 border border-gray-800/60 rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="font-semibold text-white text-sm">Enquiry Pipeline</h3>
          <p className="text-xs text-gray-500">Status distribution</p>
        </div>
        <EnquiryStatusPie data={ENQUIRY_STATUS} />
      </div>

      {/* Lead sources */}
      <div className="bg-gray-900 border border-gray-800/60 rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="font-semibold text-white text-sm">Lead Sources</h3>
          <p className="text-xs text-gray-500">Where enquiries come from</p>
        </div>
        <LeadSourceChart data={LEAD_SOURCES} />
      </div>
    </div>
  );
}
