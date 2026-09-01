import { NextRequest, NextResponse } from "next/server";
import { getEnquiries, createEnquiry } from "@/services/enquiries.service";
import { memoryEnquiries } from "@/lib/memory-store";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view");

    // 1. Try Supabase first
    try {
      const supabase = await createAdminClient();
      const { data: sbData, error: sbError } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!sbError && sbData && sbData.length > 0) {
        const formatted = sbData.map((row: any) => ({
          id: row.id,
          studentName: row.student_name,
          name: row.student_name,
          parentName: row.parent_name || "",
          phone: row.phone,
          email: row.email || "",
          currentClass: row.current_class || "",
          class: row.current_class || "",
          interestedCourse: row.interested_course || "General",
          course: row.interested_course || "General",
          leadSource: row.lead_source || "WEBSITE",
          status: row.status || "NEW",
          remarks: row.remarks || "",
          createdAt: row.created_at,
        }));

        if (view === "kanban") {
          const statuses = ["NEW", "INTERESTED", "CALLBACK", "ADMITTED", "LOST"];
          const grouped: Record<string, any[]> = {};
          for (const st of statuses) {
            grouped[st] = formatted.filter((e) => e.status === st);
          }
          return NextResponse.json({ data: grouped, total: formatted.length });
        }

        return NextResponse.json({
          data: formatted,
          total: formatted.length,
          page: 1,
          pageSize: 50,
          totalPages: 1,
        });
      }
    } catch (sbErr) {
      console.warn("[GET /api/admin/enquiries] Supabase read skipped:", sbErr);
    }

    // 2. Try Prisma fallback
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

    // 1. Supabase write
    try {
      const supabase = await createAdminClient();
      await supabase.from("enquiries").insert([
        {
          student_name: body.studentName || body.name,
          phone: body.phone,
          email: body.email || null,
          interested_course: body.interestedCourse || "General",
          lead_source: body.leadSource || "MANUAL",
          status: body.status || "NEW",
        },
      ]);
    } catch (sbErr) {
      console.warn("[POST /api/admin/enquiries] Supabase insert skipped", sbErr);
    }

    // 2. Prisma fallback
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
