import { z } from "zod";

/**
 * Zod validation schemas for common form inputs
 */

// ── Primitives ────────────────────────────────────────────────

export const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number is too long")
  .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number");

export const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .optional()
  .or(z.literal(""));

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name is too long")
  .regex(/^[a-zA-Z\s'.]+$/, "Name can only contain letters and spaces");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// ── Forms ─────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  subject: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

export const enquiryFormSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  grade: z.string().optional(),
  targetExam: z.string().optional(),
  message: z.string().optional(),
});

export const ltpeRegistrationSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  grade: z.string().min(1, "Please select your class"),
  school: z.string().optional(),
  city: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: z.string().email("Please enter a valid email address"),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ── Types ─────────────────────────────────────────────────────

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;
export type LtpeRegistrationValues = z.infer<typeof ltpeRegistrationSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
