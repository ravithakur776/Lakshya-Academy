/**
 * Site-wide constants for Lakshya Academy
 * Single source of truth for all static configuration and brand details
 */

// ── Company Info ─────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "Lakshya Academy",
  tagline: "Shaping Future IITians Through Excellence",
  motto: "Learn • Practice • Achieve",
  description:
    "Founded in 2017 in Mathura by IIT (BHU) alumni, Lakshya Academy focuses on concept-based learning, disciplined preparation, personal mentoring, and continuous performance analysis to qualify JEE & NEET.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lakshyaiit.com",
  email: "2017lakshya@gmail.com",
  phone: "+91 9319098141",
  phoneAlternate: "+91 7895060239",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919319098141",
  address: {
    building: "190/2, Above PC Jewellers",
    area: "Krishna Nagar",
    city: "Mathura",
    state: "Uttar Pradesh",
    pincode: "281001",
    country: "India",
    googleMapsUrl: "https://share.google/JS10432St6nvkkaoT",
  },
  social: {
    instagram: "https://www.instagram.com/lakshyaacademymathura/",
    facebook: "https://www.facebook.com/profile.php?id=61574186937957",
    youtube: "https://www.youtube.com/@lakshyaacademymathura854",
  },
  reviews: {
    rating: 4.7,
    count: 211,
  },
  founded: 2017,
  students: "500+",
  jeeMainQualified: "70+",
  jeeAdvancedQualified: "40+",
  topRank: "AIR 272 (Sabal Agrawal, JEE Advanced 2025)",
} as const;

// ── Theme ─────────────────────────────────────────────────────
export const THEME = {
  colors: {
    primary: "#0F7A3C",
    darkGreen: "#0B5C2D",
    deepEmerald: "#064E23",
    lightGreen: "#F4FAF6",
    emeraldBorder: "#D1E7DD",
    accent: "#D4AF37",
    background: "#FFFFFF",
  },
  fonts: {
    heading: "Poppins",
    body: "Inter",
  },
  borderRadius: "16px",
} as const;

// ── Route Groups ─────────────────────────────────────────────
export const ROUTES = {
  // Public
  home: "/",
  about: "/about",
  courses: "/courses",
  faculty: "/faculty",
  results: "/results",
  gallery: "/gallery",
  blog: "/blog",
  contact: "/contact",
  ltpe: "/ltpe-registration",
  ltpeRegistration: "/ltpe-registration",
  faq: "/faq",
  // Auth
  login: "/login",
  forgotPassword: "/forgot-password",
  // Admin Dashboard
  admin: "/admin",
  adminStudents: "/admin/students",
  adminEnquiries: "/admin/enquiries",
  adminLtpe: "/admin/ltpe",
  adminFaculty: "/admin/faculty",
  adminBlog: "/admin/blog",
  adminGallery: "/admin/gallery",
  adminMedia: "/admin/media",
  adminTestimonials: "/admin/testimonials",
  adminResults: "/admin/results",
  adminAnalytics: "/admin/analytics",
  adminSettings: "/admin/settings",
  adminNotices: "/admin/notices",
} as const;

// ── Navigation Items ──────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Courses", href: ROUTES.courses },
  { label: "Faculty", href: ROUTES.faculty },
  { label: "Results", href: ROUTES.results },
  { label: "LTPE 2026", href: ROUTES.ltpe, badge: "Up to 100% Scholarship" },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Blog", href: ROUTES.blog },
  { label: "Contact", href: ROUTES.contact },
] as const;

// ── Why Parents Trust Lakshya (10 Core Reasons) ───────────────
export const WHY_PARENTS_TRUST = [
  { title: "IITian Faculty", description: "Led and taught directly by IIT (BHU) alumni directors with deep subject expertise." },
  { title: "17+ Years Teaching Experience", description: "Proven track record of mentoring top engineering aspirants since 2007." },
  { title: "Personal Mentoring", description: "One-on-one academic guidance and personal psychological support for every student." },
  { title: "Small Batch Size", description: "Strictly 50 students per batch to ensure individual attention and active participation." },
  { title: "Weekly Performance Analysis", description: "Detailed analytical reports shared regularly with parents to track concept clarity." },
  { title: "Concept Based Learning", description: "Focus on fundamentals over rote memorization to solve complex multi-concept questions." },
  { title: "Regular DPP & Mock Tests", description: "Daily Practice Problems and computer-based mock tests aligned with latest NTA/JEE pattern." },
  { title: "Doubt Sessions", description: "Dedicated daily doubt resolution slots after regular lectures with core faculty." },
  { title: "Parent Interaction", description: "Regular parent-teacher meetings and instant academic feedback on attendance & scores." },
  { title: "Proven Results", description: "Consistent top ranks including Sabal Agrawal (AIR 272, JEE Advanced 2025)." },
] as const;

// ── 12 Official Facilities ────────────────────────────────────
export const FACILITIES = [
  { title: "Air Conditioned Classrooms", icon: "Snowflake", desc: "Climate-controlled, noise-free learning environment." },
  { title: "Library", icon: "BookOpen", desc: "Silent reading rooms stocked with reference books & JEE archives." },
  { title: "WiFi", icon: "Wifi", desc: "High-speed internet for online test practice and video revision." },
  { title: "CCTV Surveillance", icon: "Video", desc: "24/7 security monitoring for complete campus safety." },
  { title: "Parking Facility", icon: "Car", desc: "Spacious, secure parking area for student bicycles and two-wheelers." },
  { title: "RO Purified Water", icon: "Droplets", desc: "Chilled and hygienic drinking water stations across floors." },
  { title: "Dedicated Doubt Sessions", icon: "HelpCircle", desc: "Daily 1-on-1 doubt clearing counters with subject experts." },
  { title: "Printed Study Modules", icon: "FileText", desc: "Comprehensive, updated study material with graded exercise sheets." },
  { title: "Weekly DPPs", icon: "Layers", desc: "Daily Practice Problems to enforce classroom learning everyday." },
  { title: "Full-Length Mock Tests", icon: "Award", desc: "Simulated JEE Main & Advanced online test series with rank predictor." },
  { title: "Previous Year Papers", icon: "Archive", desc: "Topic-wise 20+ year solved question archives with video solutions." },
  { title: "Video Lecture Archives", icon: "PlayCircle", desc: "Recorded lecture library for backup, revision, and missed topics." },
] as const;

// ── Storage Buckets & Upload Limits ───────────────────────────
export const STORAGE_BUCKETS = {
  avatars: "avatars",
  media: "media",
  documents: "documents",
  gallery: "gallery",
} as const;

export const UPLOAD_LIMITS = {
  image: {
    maxSize: 5 * 1024 * 1024,
    maxSizeBytes: 5 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  },
  document: {
    maxSize: 10 * 1024 * 1024,
    maxSizeBytes: 10 * 1024 * 1024,
    allowedTypes: ["application/pdf"],
  },
} as const;
export const LTPE_2026_CONFIG = {
  name: "Lakshya Talent Promotional Exam 2026",
  tagline: "Win Up to 100% Scholarship for IIT-JEE Coaching",
  eligibility: "Classes 8, 9, 10",
  examDate: "11 October 2026",
  fee: "₹100",
  maxScholarship: "100%",
  benefits: [
    "Up to 100% Fee Waiver on Class 9, 10, 11 & 12 Batches",
    "Detailed All-India & State-Level Potential Rank Analysis",
    "Free 1-on-1 Academic Counselling Session with IIT (BHU) Faculty",
    "Personalized Strengths & Weakness Diagnostic Report",
  ],
  faqs: [
    {
      q: "Who is eligible for LTPE 2026?",
      a: "Students currently studying in Class 8, Class 9, or Class 10 are eligible to apply for LTPE 2026."
    },
    {
      q: "What is the registration fee for LTPE 2026?",
      a: "The registration fee for LTPE 2026 is nominal ₹100 only."
    },
    {
      q: "When will LTPE 2026 be conducted?",
      a: "The exam will be held on 11 October 2026 at Lakshya Academy's Krishna Nagar, Mathura center."
    },
    {
      q: "What is the exam pattern for LTPE?",
      a: "The test consists of Multiple Choice Questions (MCQs) covering Physics, Chemistry, Mathematics, and Mental Ability based on the student's current class syllabus."
    },
    {
      q: "How will I receive my Hall Ticket?",
      a: "After online registration, your Hall Ticket will be delivered directly to your registered WhatsApp number and Email."
    }
  ]
} as const;
