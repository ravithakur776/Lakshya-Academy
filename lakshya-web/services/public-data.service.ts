import { prisma } from "@/lib/prisma";

// ── Official Fallback Data ───────────────────────────────────

export const FALLBACK_COURSES = [
  {
    id: "c1",
    name: "Class 11 Program",
    courseName: "Aspire",
    slug: "aspire-class-11",
    targetClass: "Class 11",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    batchSize: 50,
    timings: ["Morning Batch", "Evening Batch"],
    fee: "Competitive / Installment Options Available",
    description: "Architected for Class 11 students to build rock-solid JEE Main & Advanced fundamentals while excelling in school boards.",
    isPopular: true,
  },
  {
    id: "c2",
    name: "Class 12 Program",
    courseName: "Zenith",
    slug: "zenith-class-12",
    targetClass: "Class 12",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    batchSize: 50,
    timings: ["Morning Batch", "Evening Batch"],
    fee: "Competitive / Installment Options Available",
    description: "1-year intensive rank booster program for Class 12 covering 12th board syllabus alongside comprehensive 11th revision.",
    isPopular: true,
  },
  {
    id: "c3",
    name: "Dropper / Repeater Batch",
    courseName: "Excel",
    slug: "excel-droppers",
    targetClass: "Class 12 Passed (Droppers)",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    batchSize: 50,
    timings: ["Morning Batch", "Evening Batch"],
    fee: "Based on JEE Main Score or Scholarship (Up to 100%)",
    description: "Full-throttle 1-year dedicated program for Class 12 passed aspirants targeting Top 500 ranks in JEE 2026.",
    isPopular: true,
  },
];

export const FALLBACK_FACULTY = [
  {
    id: "f1",
    name: "Mr. Vikas Shandilya",
    slug: "mr-vikas-shandilya",
    subject: "Mathematics & Chemistry",
    qualification: "B.Tech, Mechanical Engineering, IIT (BHU)",
    experience: "17+ Years",
    bio: "Co-founder & Director of Lakshya Academy. B.Tech in Mechanical Engineering from IIT (BHU) with 17+ years mentoring JEE toppers.",
    rating: 4.9,
    studentsCoached: "5,000+",
    topRankers: "100+",
  },
  {
    id: "f2",
    name: "Mr. Pushpendra Sharma",
    slug: "mr-pushpendra-sharma",
    subject: "Physics & Chemistry",
    qualification: "B.Tech, Mining Engineering, IIT (BHU)",
    experience: "17+ Years",
    bio: "Co-founder & Director of Lakshya Academy. B.Tech in Mining Engineering from IIT (BHU) with 17+ years expertise in Physics.",
    rating: 4.9,
    studentsCoached: "5,000+",
    topRankers: "100+",
  },
];

export const FALLBACK_RESULTS = [
  { id: "r1", studentName: "Sabal Agrawal", achievement: "AIR 272", exam: "JEE Advanced 2025", year: 2025, course: "Classroom Program", isFeatured: true },
];

export const FALLBACK_TESTIMONIALS = [
  {
    id: "t1",
    studentName: "Sabal Agrawal",
    achievement: "AIR 272 — JEE Advanced 2025",
    course: "Classroom Program",
    year: 2025,
    content: "Lakshya Academy's IIT BHU directors provided the exact conceptual rigor and personalized mentoring I needed to score AIR 272 in JEE Advanced.",
    rating: 5,
  },
];

export const FALLBACK_BLOGS = [
  {
    id: "b1",
    title: "How to Crack JEE Advanced from Mathura: Strategy by IIT (BHU) Alumni",
    slug: "crack-jee-advanced-mathura-strategy",
    excerpt: "Proven 1-year roadmap, topic weightage, and daily discipline tips from Lakshya Academy directors.",
    publishedAt: "2025-07-20",
    views: 1247,
  },
];

// ── Service Functions ─────────────────────────────────────────

export async function getPublicCourses() {
  try {
    const data = await prisma.course.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return data.length > 0 ? data : FALLBACK_COURSES;
  } catch {
    return FALLBACK_COURSES;
  }
}

export async function getPublicFaculty() {
  try {
    const data = await prisma.faculty.findMany({
      where: { isActive: true, isVisible: true },
      orderBy: { sortOrder: "asc" },
    });
    return data.length > 0 ? data : FALLBACK_FACULTY;
  } catch {
    return FALLBACK_FACULTY;
  }
}

export async function getPublicResults() {
  try {
    const data = await prisma.result.findMany({
      where: { isPublic: true },
      orderBy: { sortOrder: "asc" },
    });
    return data.length > 0 ? data : FALLBACK_RESULTS;
  } catch {
    return FALLBACK_RESULTS;
  }
}

export async function getPublicTestimonials() {
  try {
    const data = await prisma.testimonial.findMany({
      where: { isPublic: true },
      orderBy: { sortOrder: "asc" },
    });
    return data.length > 0 ? data : FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getPublicBlogPosts() {
  try {
    const data = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
    return data.length > 0 ? data : FALLBACK_BLOGS;
  } catch {
    return FALLBACK_BLOGS;
  }
}
