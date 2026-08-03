/**
 * Blog service — CRUD + AI-assisted draft generation
 */

import { prisma } from "@/lib/prisma";
import type { BlogPost, BlogCategory, CreateBlogPostInput, UpdateBlogPostInput, PaginatedResponse } from "@/types/database";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export type BlogFilters = {
  search?: string;
  status?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
};

export async function getBlogPosts(filters: BlogFilters = {}): Promise<PaginatedResponse<BlogPost>> {
  const { search, status, categoryId, page = 1, pageSize = 10 } = filters;

  const where: Record<string, unknown> = {};
  if (search) where.OR = [
    { title: { contains: search, mode: "insensitive" } },
    { excerpt: { contains: search, mode: "insensitive" } },
  ];
  if (status) where.status = status;
  if (categoryId) where.categoryId = categoryId;

  const [data, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        category: { select: { name: true, color: true, slug: true } },
        author: { select: { name: true, avatarUrl: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    data: data as BlogPost[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({
    where: { id },
    include: { category: true, author: true },
  }) as Promise<BlogPost | null>;
}

export async function createBlogPost(input: CreateBlogPostInput): Promise<BlogPost> {
  const slug = input.slug || generateSlug(input.title);
  const { categoryId, ...rest } = input;
  return prisma.blogPost.create({
    data: {
      ...rest,
      slug,
      categoryId: categoryId || undefined,
    },
    include: { category: true, author: true },
  }) as Promise<BlogPost>;
}

export async function updateBlogPost(id: string, input: UpdateBlogPostInput): Promise<BlogPost> {
  const { categoryId, ...rest } = input;
  const data: Record<string, unknown> = {
    ...rest,
    categoryId: categoryId || undefined,
  };
  if (input.status === "PUBLISHED") {
    data.publishedAt = new Date();
  }
  return prisma.blogPost.update({
    where: { id },
    data,
    include: { category: true, author: true },
  }) as Promise<BlogPost>;
}

export async function deleteBlogPost(id: string): Promise<void> {
  await prisma.blogPost.delete({ where: { id } });
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return prisma.blogCategory.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function createBlogCategory(name: string, color?: string): Promise<BlogCategory> {
  const slug = generateSlug(name);
  return prisma.blogCategory.create({ data: { name, slug, color: color || "#10b981" } });
}

// ── AI Blog Generation (calls a simple prompt-based endpoint) ──

export type AiBlogDraft = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
  tags: string[];
};

export async function generateAiBlogDraft(topic: string): Promise<AiBlogDraft> {
  // This calls the /api/admin/ai/blog route which wraps Gemini/OpenAI
  const response = await fetch("/api/admin/ai/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI blog draft");
  }

  return response.json();
}

export function generateSlugFromTitle(title: string): string {
  return generateSlug(title);
}
