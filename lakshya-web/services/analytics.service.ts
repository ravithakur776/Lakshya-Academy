/**
 * Analytics service — dashboard stats aggregations
 * Uses Prisma for real DB queries (falls back to mock in dev when DB not connected)
 */

import { prisma } from "@/lib/prisma";
import type { DashboardStats, MonthlyData, StatusData } from "@/types/database";

function getMonthLabel(date: Date): string {
  return date.toLocaleString("en-IN", { month: "short", year: "2-digit" });
}

function getLast12Months(): Date[] {
  const months: Date[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    months.push(d);
  }
  return months;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const [
    todayEnquiries,
    todayAdmissions,
    totalStudents,
    activeStudents,
    pendingFollowups,
    ltpeRegistrations,
    totalFaculty,
    publishedBlogs,
    allEnquiries,
    allStudents,
  ] = await Promise.all([
    prisma.enquiry.count({ where: { createdAt: { gte: today, lte: todayEnd } } }),
    prisma.student.count({ where: { admissionDate: { gte: today, lte: todayEnd } } }),
    prisma.student.count(),
    prisma.student.count({ where: { status: "ACTIVE" } }),
    prisma.enquiry.count({
      where: {
        status: { in: ["NEW", "INTERESTED", "CALLBACK"] },
        followUpAt: { lte: new Date() },
      },
    }),
    prisma.ltpeRegistration.count(),
    prisma.faculty.count({ where: { isActive: true } }),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.enquiry.findMany({ select: { createdAt: true, status: true, leadSource: true } }),
    prisma.student.findMany({ select: { admissionDate: true } }),
  ]);

  // Monthly enquiries (last 12 months)
  const months = getLast12Months();
  const monthlyEnquiries: MonthlyData[] = months.map((m) => {
    const nextMonth = new Date(m);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const count = allEnquiries.filter(
      (e) => e.createdAt >= m && e.createdAt < nextMonth
    ).length;
    return { month: getMonthLabel(m), count };
  });

  // Monthly admissions (last 12 months)
  const monthlyAdmissions: MonthlyData[] = months.map((m) => {
    const nextMonth = new Date(m);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const count = allStudents.filter(
      (s) => s.admissionDate >= m && s.admissionDate < nextMonth
    ).length;
    return { month: getMonthLabel(m), count };
  });

  // Enquiry status distribution
  const statusCounts = allEnquiries.reduce<Record<string, number>>(
    (acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const STATUS_COLORS: Record<string, string> = {
    NEW: "#3b82f6",
    INTERESTED: "#10b981",
    CALLBACK: "#f59e0b",
    ADMISSION_DONE: "#0F7A3C",
    LOST: "#ef4444",
    NOT_INTERESTED: "#6b7280",
  };

  const enquiryStatusDistribution: StatusData[] = Object.entries(statusCounts).map(([label, value]) => ({
    label: label.replace(/_/g, " "),
    value: Number(value),
    color: STATUS_COLORS[label],
  }));

  // Lead source distribution
  const sourceCounts = allEnquiries.reduce<Record<string, number>>(
    (acc, e) => {
      acc[e.leadSource] = (acc[e.leadSource] || 0) + 1;
      return acc;
    },
    {}
  );

  const leadSourceDistribution: StatusData[] = Object.entries(sourceCounts).map(([label, value]) => ({
    label: label.replace(/_/g, " "),
    value: Number(value),
  }));

  return {
    todayEnquiries,
    todayAdmissions,
    totalStudents,
    activeStudents,
    pendingFollowups,
    ltpeRegistrations,
    totalFaculty,
    publishedBlogs,
    monthlyEnquiries,
    monthlyAdmissions,
    enquiryStatusDistribution,
    leadSourceDistribution,
  };
}

// Recent activity logs
export async function getRecentActivity(limit = 10) {
  return prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { admin: { select: { name: true, role: true, avatarUrl: true } } },
  });
}
