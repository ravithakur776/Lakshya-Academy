// ── Enums ─────────────────────────────────────────────────────

export type CourseType =
  | "JEE_MAIN"
  | "JEE_ADVANCED"
  | "NEET"
  | "FOUNDATION"
  | "CRASH_COURSE"
  | "ONLINE";

export type CourseMode = "OFFLINE" | "ONLINE" | "HYBRID";

export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "DROPPED" | "SUSPENDED";

export type PaymentStatus = "PENDING" | "PARTIAL" | "PAID" | "FAILED" | "REFUNDED";

// ── Course ────────────────────────────────────────────────────

export interface Course {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type: CourseType;
  mode: CourseMode;
  grade: string;
  targetYear: number;
  duration?: string | null;
  fee?: number | null;
  discountFee?: number | null;
  seats: number;
  startDate?: Date | null;
  endDate?: Date | null;
  schedule?: string | null;
  syllabus?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  thumbnailUrl?: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  faculty?: CourseInstructor[];
  enrollmentCount?: number;
}

export interface CourseInstructor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string[];
  avatarUrl?: string | null;
}

// ── Enrollment ────────────────────────────────────────────────

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: Date;
  completedAt?: Date | null;
  droppedAt?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  course?: Pick<Course, "id" | "name" | "slug" | "type">;
}

// ── Payment ───────────────────────────────────────────────────

export interface Payment {
  id: string;
  enrollmentId: string;
  amount: number;
  status: PaymentStatus;
  method?: string | null;
  transactionId?: string | null;
  receipt?: string | null;
  dueDate?: Date | null;
  paidAt?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ── Student ───────────────────────────────────────────────────

export interface Student {
  id: string;
  userId: string;
  registrationNo: string;
  dateOfBirth?: Date | null;
  grade: string;
  targetExam: string;
  targetYear: number;
  school?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  parentName?: string | null;
  parentPhone?: string | null;
  parentEmail?: string | null;
  createdAt: Date;
  updatedAt: Date;
  enrollments?: Enrollment[];
}

// ── Test ──────────────────────────────────────────────────────

export type TestType = "CHAPTER_WISE" | "FULL_SYLLABUS" | "MOCK_JEE" | "WEEKLY";

export interface Test {
  id: string;
  courseId: string;
  name: string;
  type: TestType;
  totalMarks: number;
  duration: number;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestResult {
  id: string;
  testId: string;
  studentId: string;
  marksObtained: number;
  rank?: number | null;
  percentile?: number | null;
  physics?: number | null;
  chemistry?: number | null;
  mathematics?: number | null;
  biology?: number | null;
  createdAt: Date;
  updatedAt: Date;
  test?: Pick<Test, "id" | "name" | "type" | "totalMarks">;
}

// ── Result (Public) ───────────────────────────────────────────

export interface PublicResult {
  id: string;
  studentName: string;
  rank?: number | null;
  score?: number | null;
  exam: string;
  year: number;
  course?: string | null;
  imageUrl?: string | null;
  isPublic: boolean;
  isFeatured: boolean;
}
