import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/lakshya";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Lakshya Academy database with official data...");

  // 1. Site Settings
  const settings = [
    { key: "site_name", value: "Lakshya Academy", label: "Institute Name", group: "general" },
    { key: "tagline", value: "Shaping Future IITians Through Excellence", label: "Tagline", group: "general" },
    { key: "motto", value: "Learn • Practice • Achieve", label: "Motto", group: "general" },
    { key: "established", value: "2017", label: "Established Year", group: "general" },
    { key: "phone_primary", value: "+91 9319098141", label: "Primary Phone", group: "contact" },
    { key: "phone_alternate", value: "+91 7895060239", label: "Alternate Phone", group: "contact" },
    { key: "whatsapp", value: "+91 9319098141", label: "WhatsApp Number", group: "contact" },
    { key: "email_info", value: "2017lakshya@gmail.com", label: "Official Email", group: "contact" },
    { key: "address", value: "190/2, Above PC Jewellers, Krishna Nagar, Mathura, Uttar Pradesh 281001", label: "Address", group: "contact" },
    { key: "google_maps_url", value: "https://share.google/JS10432St6nvkkaoT", label: "Google Maps Link", group: "contact" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }

  // 2. Courses
  const courses = [
    {
      name: "Class 11 — Aspire",
      slug: "aspire-class-11",
      shortName: "Aspire",
      description: "1-Year comprehensive classroom program for Class 11 targeting Physics, Chemistry & Mathematics for JEE Main & Advanced.",
      targetClass: "11",
      targetExam: "JEE_ADVANCED",
      duration: "1 Year",
      seats: 50,
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Class 12 — Zenith",
      slug: "zenith-class-12",
      shortName: "Zenith",
      description: "1-Year rank booster program for Class 12 covering 12th board syllabus alongside complete 11th JEE revision.",
      targetClass: "12",
      targetExam: "JEE_ADVANCED",
      duration: "1 Year",
      seats: 50,
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: "Dropper — Excel",
      slug: "excel-droppers",
      shortName: "Excel",
      description: "Dedicated 1-Year intensive program for Class 12 passed aspirants with fees based on JEE Main Score or Scholarship.",
      targetClass: "Dropper",
      targetExam: "JEE_ADVANCED",
      duration: "1 Year",
      seats: 50,
      isFeatured: true,
      sortOrder: 3,
    },
  ];

  for (const c of courses) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }

  // 3. Faculty (Directors)
  const facultyList = [
    {
      name: "Mr. Vikas Shandilya",
      slug: "mr-vikas-shandilya",
      subject: "Mathematics & Chemistry",
      subjects: ["Mathematics", "Chemistry"],
      qualification: "B.Tech, Mechanical Engineering, IIT (BHU)",
      experience: "17+ Years",
      experienceYears: 17,
      bio: "Co-founder & Director of Lakshya Academy. B.Tech in Mechanical Engineering from IIT (BHU) with 17+ years experience.",
      philosophy: "Mathematics and Chemistry are languages of pattern and precision.",
      email: "vikas.shandilya@lakshyaiit.com",
      phone: "+91 9319098141",
      rating: 4.9,
      studentsCoached: 5000,
      topRankers: 100,
      isActive: true,
      isVisible: true,
      sortOrder: 1,
    },
    {
      name: "Mr. Pushpendra Sharma",
      slug: "mr-pushpendra-sharma",
      subject: "Physics & Chemistry",
      subjects: ["Physics", "Chemistry"],
      qualification: "B.Tech, Mining Engineering, IIT (BHU)",
      experience: "17+ Years",
      experienceYears: 17,
      bio: "Co-founder & Director of Lakshya Academy. B.Tech in Mining Engineering from IIT (BHU) with 17+ years expertise in Physics.",
      philosophy: "Physics is about building intuitive physical models and mastering execution under pressure.",
      email: "pushpendra.sharma@lakshyaiit.com",
      phone: "+91 7895060239",
      rating: 4.9,
      studentsCoached: 5000,
      topRankers: 100,
      isActive: true,
      isVisible: true,
      sortOrder: 2,
    },
  ];

  for (const f of facultyList) {
    await prisma.faculty.upsert({
      where: { slug: f.slug },
      update: f,
      create: f,
    });
  }

  // 4. Results
  await prisma.result.deleteMany();
  await prisma.result.create({
    data: {
      studentName: "Sabal Agrawal",
      achievement: "AIR 272",
      exam: "JEE Advanced 2025",
      year: 2025,
      course: "Classroom Program",
      isFeatured: true,
      sortOrder: 1,
    },
  });

  console.log("🎉 Lakshya Academy official data seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
