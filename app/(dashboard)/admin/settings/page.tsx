"use client";

import { useState } from "react";
import { Settings, Save, Building, Globe, Phone, Mail, Share2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "general", label: "General & Branding", icon: Building },
  { id: "contact", label: "Contact Details", icon: Phone },
  { id: "social", label: "Social Media", icon: Share2 },
  { id: "seo", label: "SEO & Open Graph", icon: Globe },
];

export default function SettingsAdminPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Settings & Branding"
        description="Configure institute name, tagline, official address, contact numbers, and SEO meta tags"
        icon={Settings}
        breadcrumbs={[{ label: "Admin" }, { label: "Settings" }]}
        actions={
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
          >
            <Save className="h-4 w-4" /> Save Changes
          </button>
        }
      />

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-3 rounded-2xl flex items-center justify-between">
          <span>✓ Settings saved successfully! Public website will update immediately.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-2 shadow-sm space-y-1 h-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left",
                activeTab === tab.id
                  ? "bg-[#0F7A3C] text-white shadow-sm"
                  : "text-gray-600 hover:text-emerald-900 hover:bg-emerald-50"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="md:col-span-3 bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          {activeTab === "general" && (
            <div className="space-y-4 text-xs font-semibold">
              <h3 className="font-bold text-gray-900 text-sm font-heading mb-4">General & Institute Details</h3>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Official Name</label>
                <input defaultValue="Lakshya Academy" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Tagline</label>
                <input defaultValue="Shaping Future IITians Through Excellence" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Brand Motto</label>
                <input defaultValue="Learn • Practice • Achieve" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Founding Year</label>
                <input defaultValue="2017" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4 text-xs font-semibold">
              <h3 className="font-bold text-gray-900 text-sm font-heading mb-4">Official Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 uppercase tracking-wider mb-1">Primary Phone *</label>
                  <input defaultValue="+91 9319098141" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-gray-600 uppercase tracking-wider mb-1">Alternate Phone</label>
                  <input defaultValue="+91 7895060239" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Official Email *</label>
                <input defaultValue="2017lakshya@gmail.com" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Full Address *</label>
                <textarea rows={3} defaultValue="190/2, Above PC Jewellers, Krishna Nagar, Mathura, Uttar Pradesh 281001" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500 resize-none" />
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Google Maps Link</label>
                <input defaultValue="https://share.google/JS10432St6nvkkaoT" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-4 text-xs font-semibold">
              <h3 className="font-bold text-gray-900 text-sm font-heading mb-4">Social Media Channels</h3>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Instagram URL</label>
                <input defaultValue="https://www.instagram.com/lakshyaacademymathura/" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Facebook URL</label>
                <input defaultValue="https://www.facebook.com/profile.php?id=61574186937957" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">YouTube URL</label>
                <input defaultValue="https://www.youtube.com/@lakshyaacademymathura854" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4 text-xs font-semibold">
              <h3 className="font-bold text-gray-900 text-sm font-heading mb-4">SEO & Open Graph Tags</h3>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Meta Title</label>
                <input defaultValue="Lakshya Academy Mathura | Best IIT-JEE Coaching — IIT (BHU) Alumni Led" className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Meta Description</label>
                <textarea rows={3} defaultValue="Founded in 2017 in Mathura by IIT (BHU) alumni directors Mr. Vikas Shandilya & Mr. Pushpendra Sharma. Aspire, Zenith, Excel courses." className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500 resize-none" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
