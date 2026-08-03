import type { MetadataRoute } from "next";
import { SITE_CONFIG, ROUTES } from "@/lib/constants";
import { blogPosts } from "@/data/extended-data";

/**
 * Dynamic Sitemap Generator
 * Generates a sitemap.xml for all static and dynamic public routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}${ROUTES.about}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.courses}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.faculty}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.results}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.gallery}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${ROUTES.blog}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.contact}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.ltpe}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic Course Pages
  const coursePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/courses/aspire-class-11`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/courses/zenith-class-12`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/courses/excel-droppers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  // Dynamic Faculty Pages
  const facultyPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/faculty/mr-vikas-shandilya`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faculty/mr-pushpendra-sharma`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Dynamic Blog Post Pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...coursePages, ...facultyPages, ...blogPages];
}
