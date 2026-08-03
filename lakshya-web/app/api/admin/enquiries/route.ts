import { NextRequest, NextResponse } from "next/server";
import { getEnquiries, createEnquiry, getEnquiriesByStatus } from "@/services/enquiries.service";
import { memoryEnquiries } from "@/lib/memory-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view");

    let dbEnquiries: any[] = [];
    try {
      const result = await getEnquiries({
        search: searchParams.get("search") || undefined,
        status: searchParams.get("status") || undefined,
        counsellorId: searchParams.get("counsellorId") || undefined,
        leadSource: searchParams.get("leadSource") || undefined,
        page: parseInt(searchParams.get("page") || "1"),
        pageSize: parseInt(searchParams.get("pageSize") || "50"),
      });
      dbEnquiries = result.data || [];
    } catch (e) {
      // Safe DB fallback
    }

    const combined = [...memoryEnquiries, ...dbEnquiries];

    if (view === "kanban") {
      const statuses = ["NEW", "INTERESTED", "CALLBACK", "ADMITTED", "LOST"];
      const grouped: Record<string, any[]> = {};
      for (const st of statuses) {
        grouped[st] = combined.filter((e) => e.status === st);
      }
      return NextResponse.json({ data: grouped, total: combined.length });
    }

    return NextResponse.json({
      data: combined,
      total: combined.length,
      page: 1,
      pageSize: 50,
      totalPages: 1,
    });
  } catch (error) {
    console.error("[GET /api/admin/enquiries]", error);
    return NextResponse.json({ data: memoryEnquiries, total: memoryEnquiries.length });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newEnquiry = {
      id: `manual-${Date.now()}`,
      studentName: body.studentName || body.name,
      name: body.studentName || body.name,
      phone: body.phone,
      email: body.email || "",
      interestedCourse: body.interestedCourse || "General",
      course: body.interestedCourse || "General",
      leadSource: body.leadSource || "MANUAL",
      status: body.status || "NEW",
      createdAt: new Date().toISOString(),
    };

    memoryEnquiries.unshift(newEnquiry);

    try {
      await createEnquiry(body);
    } catch (e) {
      console.warn("[POST /api/admin/enquiries] DB write skipped", e);
    }

    return NextResponse.json({ data: newEnquiry }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/enquiries]", error);
    return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 });
  }
}
