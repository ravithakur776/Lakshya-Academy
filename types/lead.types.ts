// ── Lead ──────────────────────────────────────────────────────

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "INTERESTED"
  | "DEMO_SCHEDULED"
  | "CONVERTED"
  | "NOT_INTERESTED"
  | "LOST";

export type LeadSource =
  | "WEBSITE"
  | "WHATSAPP"
  | "PHONE_CALL"
  | "WALK_IN"
  | "SOCIAL_MEDIA"
  | "REFERRAL"
  | "ADVERTISEMENT"
  | "GOOGLE"
  | "LTPE";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  grade?: string | null;
  targetExam?: string | null;
  targetYear?: number | null;
  city?: string | null;
  source: LeadSource;
  status: LeadStatus;
  notes?: string | null;
  interestedIn: string[];
  assignedTo?: string | null;
  followUpAt?: Date | null;
  convertedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ── Contact Form ──────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email?: string;
  phone: string;
  subject?: string;
  message: string;
}

// ── LTPE Registration ─────────────────────────────────────────

export interface LtpeRegistrationData {
  name: string;
  phone: string;
  email?: string;
  grade: string;
  school?: string;
  city?: string;
}

export interface LtpeRegistration {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  grade: string;
  school?: string | null;
  city?: string | null;
  examDate?: Date | null;
  examCenter?: string | null;
  rollNumber?: string | null;
  isConfirmed: boolean;
  score?: number | null;
  rank?: number | null;
  scholarship?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
