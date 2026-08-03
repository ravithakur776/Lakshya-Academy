"use client";

import { BarChart3, TrendingUp, Users, PhoneCall, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import {
  MonthlyChart, AdmissionsBarChart, EnquiryStatusPie, LeadSourceChart
} from "@/components/dashboard/charts/dashboard-charts";

const MONTHLY_ENQUIRIES = [
  { month: "Aug 24", count: 34 }, { month: "Sep 24", count: 28 }, { month: "Oct 24", count: 42 },
  { month: "Nov 24", count: 38 }, { month: "Dec 24", count: 25 }, { month: "Jan 25", count: 56 },
  { month: "Feb 25", count: 61 }, { month: "Mar 25", count: 74 }, { month: "Apr 25", count: 83 },
  { month: "May 25", count: 67 }, { month: "Jun 25", count: 49 }, { month: "Jul 25", count: 58 },
];

const MONTHLY_ADMISSIONS = [
  { month: "Aug 24", count: 12 }, { month: "Sep 24", count: 8 }, { month: "Oct 24", count: 15 },
  { month: "Nov 24", count: 11 }, { month: "Dec 24", count: 6 }, { month: "Jan 25", count: 24 },
  { month: "Feb 25", count: 19 }, { month: "Mar 25", count: 31 }, { month: "Apr 25", count: 28 },
  { month: "May 25", count: 22 }, { month: "Jun 25", count: 17 }, { month: "Jul 25", count: 14 },
];

const ENQUIRY_STATUS = [
  { label: "New", value: 45, color: "#0F7A3C" },
  { label: "Interested", value: 32, color: "#10b981" },
  { label: "Callback", value: 28, color: "#D4AF37" },
  { label: "Admitted", value: 89, color: "#059669" },
  { label: "Lost", value: 21, color: "#ef4444" },
];

const LEAD_SOURCES = [
  { label: "WhatsApp", value: 67 }, { label: "Website", value: 54 },
  { label: "Walk In", value: 38 }, { label: "Referral", value: 29 },
  { label: "Google", value: 22 }, { label: "LTPE", value: 18 },
];

export default function AnalyticsAdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Reports"
        description="Comprehensive analysis of enquiries, admissions, conversion funnels, and lead channels"
        icon={BarChart3}
        breadcrumbs={[{ label: "Admin" }, { label: "Analytics" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm font-heading mb-1">Monthly Enquiries Trend</h3>
          <p className="text-xs text-gray-500 mb-4">Total lead volume per month</p>
          <MonthlyChart data={MONTHLY_ENQUIRIES} />
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm font-heading mb-1">Monthly Admissions</h3>
          <p className="text-xs text-gray-500 mb-4">Number of students admitted per month</p>
          <AdmissionsBarChart data={MONTHLY_ADMISSIONS} />
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm font-heading mb-1">Enquiry Pipeline Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Status breakdown of all enquiries</p>
          <EnquiryStatusPie data={ENQUIRY_STATUS} />
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm font-heading mb-1">Lead Source Performance</h3>
          <p className="text-xs text-gray-500 mb-4">Which channels bring the most inquiries</p>
          <LeadSourceChart data={LEAD_SOURCES} />
        </div>
      </div>
    </div>
  );
}
