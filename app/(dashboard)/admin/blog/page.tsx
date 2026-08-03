"use client";

import { useState } from "react";
import { BookOpen, Plus, Sparkles, Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";

const MOCK_POSTS = [
  { id: "1", title: "How to Crack JEE Advanced in 1 Year: Strategy by IIT (BHU) Alumni", slug: "crack-jee-advanced-1-year", category: "JEE Preparation", status: "PUBLISHED", views: 1247, publishedAt: "2025-07-20" },
  { id: "2", title: "Top 5 Mistakes Students Make in Organic Chemistry for JEE", slug: "organic-chemistry-mistakes", category: "Chemistry Tips", status: "PUBLISHED", views: 892, publishedAt: "2025-07-15" },
  { id: "3", title: "Why Starting Early in Class 9 Gives You a Huge JEE Advantage", slug: "class-9-foundation-advantage", category: "Foundation", status: "DRAFT", views: 0, publishedAt: "2025-07-30" },
];

export default function BlogAdminPage() {
  const [showAiModal, setShowAiModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<{ title: string; excerpt: string; content: string } | null>(null);

  async function handleGenerateAi() {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/admin/ai/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedDraft(data.draft);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog & AI Content Studio"
        description="Publish articles and generate SEO drafts with AI"
        icon={BookOpen}
        breadcrumbs={[{ label: "Admin" }, { label: "Blog" }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAiModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              <Sparkles className="h-4 w-4" /> AI Article Generator
            </button>
            <button className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all">
              <Plus className="h-4 w-4" /> Write Post
            </button>
          </div>
        }
      />

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_POSTS.map((post) => (
          <div key={post.id} className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold bg-emerald-50 text-[#0F7A3C] border border-emerald-200 px-2.5 py-1 rounded-full uppercase">
                  {post.category}
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase">
                  {post.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-base font-heading line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                <Eye className="h-3.5 w-3.5 text-emerald-700" /> {post.views} views · {post.publishedAt}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-emerald-100">
              <button className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"><Edit className="h-4 w-4" /></button>
              <button className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-100 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-emerald-100 bg-emerald-50/40">
              <h2 className="font-heading font-bold text-gray-900 text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#0F7A3C]" /> AI Blog Generator
              </h2>
              <button onClick={() => setShowAiModal(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900">✕</button>
            </div>
            <div className="p-6 space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-600 uppercase tracking-wider mb-1">Topic / Prompt *</label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. How to balance Class 12 board exams with JEE preparation..."
                />
              </div>

              {generatedDraft && (
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <p className="font-bold text-gray-900 text-sm">{generatedDraft.title}</p>
                  <p className="text-gray-600 text-xs italic">{generatedDraft.excerpt}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-emerald-100 bg-gray-50/50">
              <button onClick={() => setShowAiModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200/60">Close</button>
              <button
                onClick={handleGenerateAi}
                disabled={isGenerating}
                className="px-5 py-2.5 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20 disabled:opacity-50"
              >
                {isGenerating ? "Generating Draft..." : "Generate Draft"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
