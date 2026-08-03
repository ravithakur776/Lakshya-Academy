import { NextRequest, NextResponse } from "next/server";
import { getStudents, createStudent, exportStudentsCSV } from "@/services/students.service";
import { prisma } from "@/lib/prisma";

// GET /api/admin/students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // CSV export
    if (searchParams.get("format") === "csv") {
      const csv = await exportStudentsCSV({
        search: searchParams.get("search") || undefined,
        status: searchParams.get("status") || undefined,
        currentClass: searchParams.get("class") || undefined,
      });
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="students-${Date.now()}.csv"`,
        },
      });
    }

    const result = await getStudents({
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") || undefined,
      currentClass: searchParams.get("class") || undefined,
      courseId: searchParams.get("courseId") || undefined,
      page: parseInt(searchParams.get("page") || "1"),
      pageSize: parseInt(searchParams.get("pageSize") || "10"),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/admin/students]", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

// POST /api/admin/students
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const student = await createStudent(body);

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "CREATE_STUDENT",
        resource: "Student",
        resourceId: student.id,
        description: `New student registered: ${student.name} (${student.registrationNo})`,
      },
    }).catch(() => {}); // Non-blocking

    return NextResponse.json({ data: student }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/students]", error);
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }
}
