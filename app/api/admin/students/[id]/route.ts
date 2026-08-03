import { NextRequest, NextResponse } from "next/server";
import { getStudentById, updateStudent, deleteStudent } from "@/services/students.service";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/students/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const student = await getStudentById(id);
  if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: student });
}

// PATCH /api/admin/students/[id]
export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const student = await updateStudent(id, body);
  return NextResponse.json({ data: student });
}

// DELETE /api/admin/students/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await deleteStudent(id);
  return NextResponse.json({ success: true });
}
