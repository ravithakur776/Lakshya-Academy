/**
 * Typed database types derived from Prisma schema
 * Use these across the entire codebase for consistent typing
 */

export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "COUNSELLOR" | "FACULTY";
export type StudentStatus = "ACTIVE" | "INACTIVE" | "PASSED_OUT" | "DROPPED" | "SUSPENDED";
export type EnquiryStatus = "NEW" | "INTERESTED" | "CALLBACK" | "ADMISSION_DONE" | "LOST" | "NOT_INTERESTED";
export type LeadSource = "WEBSITE" | "WHATSAPP" | "PHONE_CALL" | "WALK_IN" | "SOCIAL_MEDIA" | "REFERRAL" | "ADVERTISEMENT" | "GOOGLE" | "LTPE" | "OTHER";
export type PaymentStatus = "PENDING" | "PARTIAL" | "PAID" | "FAILED" | "REFUNDED";
export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type MediaType = "IMAGE" | "VIDEO" | "DOCUMENT";
export type NoticeType = "GENERAL" | "URGENT" | "EXAM" | "HOLIDAY" | "RESULT";

// ── Database Row Types ────────────────────────────────────────

export type AdminUser = {
  id: string;
  supabaseId: string;
  email: string;
  name: string;
  phone?: string | null;
  role: AdminRole;
  avatarUrl?: string | null;
  department?: string | null;
  isActive: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Student = {
  id: string;
  registrationNo: string;
  name: string;
  photoUrl?: string | null;
  dateOfBirth?: Date | null;
  gender?: string | null;
  currentClass: string;
  targetExam?: string | null;
  targetYear?: number | null;
  school?: string | null;
  courseId?: string | null;
  fatherName?: string | null;
  motherName?: string | null;
  parentName?: string | null;
  parentPhone?: string | null;
  parentWhatsapp?: string | null;
  parentEmail?: string | null;
  parentOccupation?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  admissionDate: Date;
  status: StudentStatus;
  remarks?: string | null;
  documents?: unknown;
  createdAt: Date;
  updatedAt: Date;
  course?: Course | null;
};

export type Course = {
  id: string;
  name: string;
  slug: string;
  shortName?: string | null;
  description?: string | null;
  targetClass: string;
  targetExam?: string | null;
  duration?: string | null;
  fee?: number | null;
  seats: number;
  startDate?: Date | null;
  isActive: boolean;
  isFeatured: boolean;
  thumbnailUrl?: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Faculty = {
  id: string;
  name: string;
  slug: string;
  subject: string;
  subjects: string[];
  qualification?: string | null;
  experience?: string | null;
  experienceYears: number;
  bio?: string | null;
  philosophy?: string | null;
  photoUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  rating: number;
  studentsCoached: number;
  topRankers: number;
  isActive: boolean;
  isVisible: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Enquiry = {
  id: string;
  enquiryNo: string;
  studentName: string;
  parentName?: string | null;
  phone: string;
  whatsapp?: string | null;
  email?: string | null;
  currentClass?: string | null;
  school?: string | null;
  city?: string | null;
  interestedCourse?: string | null;
  courseId?: string | null;
  leadSource: LeadSource;
  status: EnquiryStatus;
  priority: string;
  counsellorId?: string | null;
  followUpAt?: Date | null;
  convertedAt?: Date | null;
  studentId?: string | null;
  remarks?: string | null;
  internalNotes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  counsellor?: AdminUser | null;
  course?: Course | null;
  followUps?: FollowUp[];
};

export type FollowUp = {
  id: string;
  enquiryId: string;
  adminId: string;
  notes: string;
  nextFollowUp?: Date | null;
  outcome?: string | null;
  createdAt: Date;
  admin?: AdminUser;
};

export type LtpeRegistration = {
  id: string;
  registrationNo: string;
  studentName: string;
  dateOfBirth?: Date | null;
  gender?: string | null;
  currentClass: string;
  school?: string | null;
  city?: string | null;
  parentName: string;
  parentPhone: string;
  parentEmail?: string | null;
  examCenter?: string | null;
  examDate?: Date | null;
  hallTicketSent: boolean;
  appeared: boolean;
  score?: number | null;
  rank?: number | null;
  scholarship?: string | null;
  certificateUrl?: string | null;
  admissionTaken: boolean;
  preparationLevel?: string | null;
  previousAttempt: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  color: string;
  sortOrder: number;
  createdAt: Date;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImageUrl?: string | null;
  categoryId?: string | null;
  status: BlogStatus;
  tags: string[];
  seoTitle?: string | null;
  metaDescription?: string | null;
  authorId: string;
  publishedAt?: Date | null;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  category?: BlogCategory | null;
  author?: AdminUser;
};

export type MediaFile = {
  id: string;
  name: string;
  url: string;
  type: MediaType;
  mimeType?: string | null;
  size?: number | null;
  altText?: string | null;
  folder: string;
  tags: string[];
  width?: number | null;
  height?: number | null;
  uploadedBy?: string | null;
  createdAt: Date;
};

export type GalleryItem = {
  id: string;
  title?: string | null;
  description?: string | null;
  imageUrl: string;
  category?: string | null;
  isPublic: boolean;
  sortOrder: number;
  takenAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Testimonial = {
  id: string;
  studentName: string;
  achievement?: string | null;
  course?: string | null;
  year?: number | null;
  content: string;
  imageUrl?: string | null;
  rating: number;
  isPublic: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  type: NoticeType;
  isActive: boolean;
  isPinned: boolean;
  expiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: string;
  label?: string | null;
  group: string;
  updatedAt: Date;
};

export type ActivityLog = {
  id: string;
  adminId?: string | null;
  studentId?: string | null;
  action: string;
  resource: string;
  resourceId?: string | null;
  description: string;
  metadata?: unknown;
  ipAddress?: string | null;
  createdAt: Date;
  admin?: AdminUser | null;
};

// ── API Response Types ────────────────────────────────────────

export type ApiResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// ── Dashboard Stats ───────────────────────────────────────────

export type DashboardStats = {
  todayEnquiries: number;
  todayAdmissions: number;
  totalStudents: number;
  activeStudents: number;
  pendingFollowups: number;
  ltpeRegistrations: number;
  totalFaculty: number;
  publishedBlogs: number;
  monthlyEnquiries: MonthlyData[];
  monthlyAdmissions: MonthlyData[];
  enquiryStatusDistribution: StatusData[];
  leadSourceDistribution: StatusData[];
};

export type MonthlyData = {
  month: string;
  count: number;
};

export type StatusData = {
  label: string;
  value: number;
  color?: string;
};

// ── Form Input Types ──────────────────────────────────────────

export type CreateStudentInput = Omit<Student, "id" | "registrationNo" | "createdAt" | "updatedAt" | "course">;
export type UpdateStudentInput = Partial<CreateStudentInput>;

export type CreateEnquiryInput = Omit<Enquiry, "id" | "enquiryNo" | "createdAt" | "updatedAt" | "counsellor" | "course" | "followUps">;
export type UpdateEnquiryInput = Partial<CreateEnquiryInput>;

export type CreateFacultyInput = Omit<Faculty, "id" | "createdAt" | "updatedAt">;
export type UpdateFacultyInput = Partial<CreateFacultyInput>;

export type CreateBlogPostInput = Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "views" | "category" | "author">;
export type UpdateBlogPostInput = Partial<CreateBlogPostInput>;
