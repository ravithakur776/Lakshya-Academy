import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, Share2 } from "lucide-react";
import { Container } from "@/components/common/container";
import { FadeIn } from "@/components/animations/fade-in";
import { blogPosts } from "@/data/extended-data";
import { SITE_CONFIG } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Lakshya Academy Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-emerald-50/50 to-white">
        <Container size="default">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>›</span>
            <span className="text-gray-600 line-clamp-1">{post.title}</span>
          </nav>

          <FadeIn>
            <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${post.categoryColor}`}>{post.category}</span>
            <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-emerald-300 flex-shrink-0 bg-emerald-100">
                  {post.authorAvatar.startsWith("/") ? (
                    <Image src={post.authorAvatar} alt={post.author} fill className="object-cover object-top" sizes="36px" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-xs font-bold">{post.authorAvatar}</div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-400">{post.authorRole}</p>
                </div>
              </div>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Article content */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article body */}
            <article className="lg:col-span-3">
              <FadeIn>
                {/* Thumbnail */}
                <div className="h-80 md:h-96 bg-gradient-to-br from-gray-100 to-emerald-50 rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden border border-emerald-100/60 shadow-md">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                    />
                  ) : (
                    <span className="text-[120px] opacity-20">📖</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="prose prose-[#0F7A3C] max-w-none text-gray-800 leading-relaxed mb-8 space-y-6">
                  <p className="text-xl text-gray-600 font-medium leading-relaxed p-4 bg-emerald-50/60 border-l-4 border-primary rounded-r-2xl mb-8">
                    {post.excerpt}
                  </p>
                  
                  {post.content.split("\n\n").map((paragraph, idx) => {
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={idx} className="font-heading font-bold text-2xl text-gray-900 mt-8 mb-3">
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={idx} className="font-heading font-bold text-3xl text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    return (
                      <p key={idx} className="text-gray-700 text-base md:text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                      <Tag className="h-3 w-3" /> {tag}
                    </span>
                  ))}
                </div>

                {/* Share */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-8">
                  <Share2 className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">Share this article:</span>
                  {[
                    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(post.title + " " + SITE_CONFIG.url + "/blog/" + post.slug)}`, color: "bg-[#25D366] text-white" },
                    { label: "Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${SITE_CONFIG.url}/blog/${post.slug}`, color: "bg-gray-900 text-white" },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`text-xs font-semibold px-3 py-1.5 rounded-full ${s.color}`}>{s.label}</a>
                  ))}
                </div>

                {/* Author box */}
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-start gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#0F7A3C]/30 shadow-sm flex-shrink-0 bg-white">
                    {post.authorAvatar.startsWith("/") ? (
                      <Image src={post.authorAvatar} alt={post.author} fill className="object-cover object-top" sizes="56px" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-black text-lg">{post.authorAvatar}</div>
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900">{post.author}</p>
                    <p className="text-primary text-xs font-semibold mb-2">{post.authorRole}</p>
                    <p className="text-gray-500 text-sm">Co-Founder & Director at Lakshya Academy Mathura with 17+ years of experience guiding top JEE rankers.</p>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                  <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Blog
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                    Book Free Counselling <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {related.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h3 className="font-heading font-bold text-gray-900 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map(r => (
                      <Link key={r.id} href={`/blog/${r.slug}`} className="block group">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.categoryColor}`}>{r.category}</span>
                        <h4 className="font-semibold text-xs text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mt-1">{r.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
