import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@lakshyaacademy.in";
const FROM_NAME = process.env.RESEND_FROM_NAME || SITE_CONFIG.name;

/**
 * Email Service
 *
 * Wraps Resend for all transactional emails.
 * Add new email functions here as features are built.
 */
export const emailService = {
  /**
   * Sends a contact form notification to the admin
   */
  async sendContactNotification(data: {
    name: string;
    phone: string;
    email?: string;
    message: string;
  }) {
    return resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [SITE_CONFIG.email],
      subject: `New Contact Form Submission — ${data.name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });
  },

  /**
   * Sends a lead confirmation to the prospect
   */
  async sendLeadConfirmation(data: {
    name: string;
    email: string;
    courseName?: string;
  }) {
    return resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [data.email],
      subject: `Thank you for your interest in ${SITE_CONFIG.name}!`,
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Thank you for your interest in ${SITE_CONFIG.name}.</p>
        <p>Our counselling team will contact you within 24 hours.</p>
        ${data.courseName ? `<p>Course of interest: <strong>${data.courseName}</strong></p>` : ""}
        <p>In the meantime, you can reach us at:</p>
        <p>📞 ${SITE_CONFIG.phone}</p>
        <p>📧 ${SITE_CONFIG.email}</p>
        <br />
        <p>Best regards,<br />${SITE_CONFIG.name} Team</p>
      `,
    });
  },

  /**
   * Sends LTPE registration confirmation
   */
  async sendLtpeConfirmation(data: {
    name: string;
    email: string;
    rollNumber: string;
    examDate?: string;
  }) {
    return resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [data.email],
      subject: `LTPE Registration Confirmed — Roll No: ${data.rollNumber}`,
      html: `
        <h2>LTPE Registration Confirmed!</h2>
        <p>Dear ${data.name},</p>
        <p>Your registration for the <strong>Lakshya Talent & Potential Exam (LTPE)</strong> has been confirmed.</p>
        <p><strong>Roll Number:</strong> ${data.rollNumber}</p>
        ${data.examDate ? `<p><strong>Exam Date:</strong> ${data.examDate}</p>` : ""}
        <p>Best regards,<br />${SITE_CONFIG.name} Team</p>
      `,
    });
  },

  /**
   * Sends enrollment confirmation to student
   */
  async sendEnrollmentConfirmation(data: {
    studentName: string;
    email: string;
    courseName: string;
    startDate?: string;
  }) {
    return resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [data.email],
      subject: `Enrollment Confirmed — ${data.courseName}`,
      html: `
        <h2>Welcome to ${SITE_CONFIG.name}!</h2>
        <p>Dear ${data.studentName},</p>
        <p>Your enrollment in <strong>${data.courseName}</strong> has been confirmed.</p>
        ${data.startDate ? `<p><strong>Start Date:</strong> ${data.startDate}</p>` : ""}
        <p>We're excited to have you on board!</p>
        <p>Best regards,<br />${SITE_CONFIG.name} Team</p>
      `,
    });
  },
};
