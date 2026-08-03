"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Search, BookOpen, Tag } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { blogPosts, blogCategories, type BlogPost } from "@/data/extended-data";
import { cn } from "@/lib/utils";

export function BlogClientPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featured = filteredPosts.filter((p) => p.featured);
  const rest = filteredPosts.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        eyebrow="Knowledge Hub"
        title="Expert Insights on"
        titleHighlight="JEE Preparation"
        description="Battle-tested strategies, chemistry shortcuts, dropper guides, and parenting tips — straight from our IIT (BHU) alumni directors."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        size="sm"
      />

      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Category Filter Bar */}
              <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-gray-100">
                {blogCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold transition-all duration-200",
                      selectedCategory === cat
                        ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Featured Articles Section */}
              {featured.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" /> Featured Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featured.map((post, i) => (
                      <FadeIn key={post.id} delay={i * 0.1}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between"
                        >
                          <div>
                            <div className="h-52 bg-gradient-to-br from-gray-100 via-emerald-50 to-teal-50 relative flex items-center justify-center border-b border-gray-100 overflow-hidden">
                              {post.coverImage ? (
                                <Image
                                  src={post.coverImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              ) : (
                                <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">📖</span>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute top-4 left-4 z-10">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${post.categoryColor}`}>
                                  {post.category}
                                </span>
                              </div>
                              <span className="absolute top-3 right-3 z-10 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                                Featured
                              </span>
                            </div>
                            <div className="p-5">
                              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" /> {post.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                                </span>
                              </div>
                              <h3 className="font-heading font-bold text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>

                          <div className="p-5 pt-0 border-t border-gray-50 mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-300 flex-shrink-0 bg-emerald-100">
                                {post.authorAvatar.startsWith("/") ? (
                                  <Image
                                    src={post.authorAvatar}
                                    alt={post.author}
                                    fill
                                    className="object-cover object-top"
                                    sizes="32px"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                                    {post.authorAvatar}
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-gray-700 font-bold">{post.author}</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                              Read Article <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </Link>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-gray-900 text-xl">
                    {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
                  </h2>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {filteredPosts.length} {filteredPosts.length === 1 ? "Article" : "Articles"}
                  </span>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="space-y-4">
                    {(featured.length > 0 ? rest : filteredPosts).map((post, i) => (
                      <FadeIn key={post.id} delay={i * 0.06}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group flex flex-col sm:flex-row gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg p-5 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <div className="w-full sm:w-32 h-28 rounded-xl bg-gradient-to-br from-gray-100 to-emerald-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden border border-gray-100 shadow-sm">
                            {post.coverImage ? (
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                sizes="128px"
                              />
                            ) : (
                              <span className="text-4xl opacity-40 group-hover:scale-110 transition-transform duration-300">📚</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${post.categoryColor}`}>
                                  {post.category}
                                </span>
                                <span className="text-xs text-gray-400">{post.readTime}</span>
                              </div>
                              <h3 className="font-heading font-bold text-gray-900 text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                {post.title}
                              </h3>
                              <p className="text-gray-500 text-xs line-clamp-2 mb-3">
                                {post.excerpt}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span className="font-semibold text-gray-700">{post.author} • {post.date}</span>
                              <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:translate-x-1 transition-transform">
                                Read <ArrowRight className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </FadeIn>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-500 font-semibold mb-2">No articles found matching &quot;{searchQuery}&quot;</p>
                    <p className="text-gray-400 text-xs mb-4">Try searching for keywords like &quot;Chemistry&quot;, &quot;Strategy&quot;, or &quot;Dropper&quot;.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search Box */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Search Articles</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, author or tag..."
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F7A3C]/30 focus:border-[#0F7A3C]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="flex flex-col gap-2">
                  {blogCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "text-left text-sm py-1.5 px-3 rounded-xl transition-all flex items-center justify-between",
                        selectedCategory === cat
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {cat}
                      </span>
                      <span className="text-xs font-semibold text-gray-400">
                        {cat === "All"
                          ? blogPosts.length
                          : blogPosts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Popular Articles</h3>
                <div className="space-y-3">
                  {blogPosts.slice(0, 4).map((post, i) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 group">
                      <span className="font-black text-2xl text-gray-200 group-hover:text-primary transition-colors">
                        0{i + 1}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">{post.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Direct Action CTA */}
              <div className="bg-gradient-to-br from-[#0B5C2D] via-[#0F7A3C] to-emerald-900 rounded-2xl p-5 text-white shadow-lg">
                <p className="font-heading font-bold text-lg mb-2">Crack JEE 2026-27</p>
                <p className="text-emerald-100 text-xs mb-4 leading-relaxed">
                  Get personal guidance from IIT (BHU) alumni directors Mr. Vikas Shandilya & Mr. Pushpendra Sharma.
                </p>
                <Link
                  href="/contact"
                  className="block text-center bg-amber-400 text-gray-950 font-bold text-xs py-2.5 rounded-xl hover:bg-amber-300 transition-colors shadow-sm"
                >
                  Book Free Mentorship Session
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
