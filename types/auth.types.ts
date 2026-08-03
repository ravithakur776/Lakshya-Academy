import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

// ── Supabase Auth ─────────────────────────────────────────────

export type AuthUser = SupabaseUser;
export type AuthSession = Session;

// ── User Roles ────────────────────────────────────────────────

export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "FACULTY"
  | "STUDENT"
  | "PARENT";

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "PENDING_VERIFICATION";

// ── App User ──────────────────────────────────────────────────

export interface AppUser {
  id: string;
  supabaseId: string;
  email: string;
  phone?: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ── Auth State ────────────────────────────────────────────────

export interface AuthState {
  user: AppUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ── Auth Forms ────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  confirmPassword: string;
}

// ── Permission System ─────────────────────────────────────────

export type Permission =
  | "manage:users"
  | "manage:students"
  | "manage:courses"
  | "manage:leads"
  | "manage:faculty"
  | "manage:blog"
  | "manage:gallery"
  | "view:analytics"
  | "manage:settings";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    "manage:users",
    "manage:students",
    "manage:courses",
    "manage:leads",
    "manage:faculty",
    "manage:blog",
    "manage:gallery",
    "view:analytics",
    "manage:settings",
  ],
  ADMIN: [
    "manage:students",
    "manage:courses",
    "manage:leads",
    "manage:faculty",
    "manage:blog",
    "manage:gallery",
    "view:analytics",
  ],
  FACULTY: ["manage:students", "view:analytics"],
  STUDENT: [],
  PARENT: [],
};
