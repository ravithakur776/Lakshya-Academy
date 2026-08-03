/**
 * Students service — full CRUD + CSV export
 */

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { CreateStudentInput, UpdateStudentInput, PaginatedResponse, Student } from "@/types/database";

function generateRegistrationNo(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(10000 + Math.random() * 90000);
  return `LA${year}${random}`;
}

export type StudentFilters = {
  search?: string;
  status?: string;
  currentClass?: string;
  courseId?: string;
  page?: number;
  pageSize?: number;
};

export async function getStudents(filters: StudentFilters = {}): Promise<PaginatedResponse<Student>> {
  const { search, status, currentClass, courseId, page = 1, pageSize = 10 } = filters;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { registrationNo: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
      { parentName: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status) where.status = status;
  if (currentClass) where.currentClass = currentClass;
  if (courseId) where.courseId = courseId;

  const [data, total] = await Promise.all([
    prisma.student.findMany({
      where,
      include: { course: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.student.count({ where }),
  ]);

  return {
    data: data as Student[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getStudentById(id: string): Promise<Student | null> {
  return prisma.student.findUnique({
    where: { id },
    include: {
      course: true,
      payments: { orderBy: { createdAt: "desc" } },
    },
  }) as Promise<Student | null>;
}

export async function createStudent(input: CreateStudentInput): Promise<Student> {
  const registrationNo = generateRegistrationNo();
  const { courseId, documents, ...rest } = input;

  return prisma.student.create({
    data: {
      ...rest,
      registrationNo,
      courseId: courseId || undefined,
      documents: documents ? (documents as unknown as Prisma.InputJsonValue) : undefined,
    },
    include: { course: true },
  }) as Promise<Student>;
}

export async function updateStudent(id: string, input: UpdateStudentInput): Promise<Student> {
  const { courseId, documents, ...rest } = input;

  return prisma.student.update({
    where: { id },
    data: {
      ...rest,
      courseId: courseId || undefined,
      documents: documents ? (documents as unknown as Prisma.InputJsonValue) : undefined,
    },
    include: { course: true },
  }) as Promise<Student>;
}

export async function deleteStudent(id: string): Promise<void> {
  await prisma.student.delete({ where: { id } });
}

export async function exportStudentsCSV(filters: StudentFilters = {}): Promise<string> {
  const { search, status, currentClass } = filters;
  const where: Record<string, unknown> = {};
  if (search) where.name = { contains: search, mode: "insensitive" };
  if (status) where.status = status;
  if (currentClass) where.currentClass = currentClass;

  const students = await prisma.student.findMany({
    where,
    include: { course: { select: { name: true } } },
    orderBy: { admissionDate: "desc" },
  });

  const headers = [
    "Reg No",
    "Name",
    "Class",
    "Course",
    "Father Name",
    "Mother Name",
    "Phone",
    "WhatsApp",
    "Email",
    "City",
    "School",
    "Admission Date",
    "Status",
  ];

  const rows = students.map((s) => [
    s.registrationNo,
    s.name,
    s.currentClass,
    s.course?.name || "",
    s.fatherName || "",
    s.motherName || "",
    s.phone || "",
    s.whatsapp || "",
    s.email || "",
    s.city || "",
    s.school || "",
    s.admissionDate.toLocaleDateString("en-IN"),
    s.status,
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
}
