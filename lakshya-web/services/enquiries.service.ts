/**
 * Enquiries / CRM service — lead management with pipeline
 */

import { prisma } from "@/lib/prisma";
import type { Enquiry, CreateEnquiryInput, UpdateEnquiryInput, PaginatedResponse } from "@/types/database";

export type EnquiryFilters = {
  search?: string;
  status?: string;
  counsellorId?: string;
  leadSource?: string;
  page?: number;
  pageSize?: number;
};

export async function getEnquiries(filters: EnquiryFilters = {}): Promise<PaginatedResponse<Enquiry>> {
  const { search, status, counsellorId, leadSource, page = 1, pageSize = 10 } = filters;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { studentName: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
      { email: { contains: search, mode: "insensitive" } },
      { parentName: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status) where.status = status;
  if (counsellorId) where.counsellorId = counsellorId;
  if (leadSource) where.leadSource = leadSource;

  const [data, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      include: {
        counsellor: { select: { name: true, avatarUrl: true } },
        course: { select: { name: true } },
        followUps: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.enquiry.count({ where }),
  ]);

  return {
    data: data as Enquiry[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// Get all enquiries grouped by status for Kanban
export async function getEnquiriesByStatus(): Promise<Record<string, Enquiry[]>> {
  const statuses = ["NEW", "INTERESTED", "CALLBACK", "ADMISSION_DONE", "LOST", "NOT_INTERESTED"];
  const enquiries = await prisma.enquiry.findMany({
    where: { status: { in: statuses as ("NEW" | "INTERESTED" | "CALLBACK" | "ADMISSION_DONE" | "LOST" | "NOT_INTERESTED")[] } },
    include: {
      counsellor: { select: { name: true, avatarUrl: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 200,
  });

  const grouped: Record<string, Enquiry[]> = {};
  for (const status of statuses) {
    grouped[status] = enquiries.filter((e) => e.status === status) as Enquiry[];
  }
  return grouped;
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  return prisma.enquiry.findUnique({
    where: { id },
    include: {
      counsellor: true,
      course: true,
      followUps: {
        include: { admin: { select: { name: true, avatarUrl: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  }) as Promise<Enquiry | null>;
}

export async function createEnquiry(input: CreateEnquiryInput): Promise<Enquiry> {
  const { courseId, counsellorId, studentId, ...rest } = input;
  return prisma.enquiry.create({
    data: {
      ...rest,
      courseId: courseId || undefined,
      counsellorId: counsellorId || undefined,
      studentId: studentId || undefined,
    },
    include: { counsellor: true, course: true },
  }) as Promise<Enquiry>;
}

export async function updateEnquiry(id: string, input: UpdateEnquiryInput): Promise<Enquiry> {
  const { courseId, counsellorId, studentId, ...rest } = input;
  return prisma.enquiry.update({
    where: { id },
    data: {
      ...rest,
      courseId: courseId || undefined,
      counsellorId: counsellorId || undefined,
      studentId: studentId || undefined,
    },
    include: { counsellor: true, course: true },
  }) as Promise<Enquiry>;
}

export async function updateEnquiryStatus(id: string, status: string): Promise<Enquiry> {
  const data: Record<string, unknown> = { status };
  if (status === "ADMISSION_DONE") {
    data.convertedAt = new Date();
  }
  return prisma.enquiry.update({
    where: { id },
    data,
  }) as Promise<Enquiry>;
}

export async function assignCounsellor(enquiryId: string, counsellorId: string): Promise<void> {
  await prisma.enquiry.update({ where: { id: enquiryId }, data: { counsellorId } });
}

export async function addFollowUp(
  enquiryId: string,
  adminId: string,
  notes: string,
  nextFollowUp?: Date,
  outcome?: string
) {
  return prisma.followUp.create({
    data: { enquiryId, adminId, notes, nextFollowUp, outcome },
  });
}

export async function deleteEnquiry(id: string): Promise<void> {
  await prisma.enquiry.delete({ where: { id } });
}

// Get pending follow-ups for today
export async function getPendingFollowups() {
  return prisma.enquiry.findMany({
    where: {
      status: { in: ["NEW", "INTERESTED", "CALLBACK"] },
      followUpAt: { lte: new Date() },
    },
    include: { counsellor: { select: { name: true } } },
    orderBy: { followUpAt: "asc" },
  });
}
