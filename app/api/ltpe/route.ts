import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { memoryLtpeRegistrations, memoryEnquiries } from "@/lib/memory-store";
import { createAdminClient } from "@/lib/supabase/server";

function generateLtpeRegNo(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `LTPE${year}${random}`;
}

export async function GET() {
  try {
    // 1. Try Supabase first
    try {
      const supabase = await createAdminClient();
      const { data: sbData, error: sbError } = await supabase
        .from("ltpe_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!sbError && sbData && sbData.length > 0) {
        const formatted = sbData.map((row: any) => ({
          id: row.id,
          registrationNo: row.registration_no,
          studentName: row.student_name,
          parentName: row.parent_name,
          parentPhone: row.parent_phone,
          phone: row.parent_phone,
          parentEmail: row.parent_email,
          currentClass: row.current_class,
          class: row.current_class,
          school: row.school || "Not specified",
          city: row.city || "Mathura",
          gender: row.gender || "N/A",
          examDate: row.exam_date || "11 October 2026",
          status: row.status || "CONFIRMED",
          createdAt: row.created_at,
        }));

        return NextResponse.json({
          success: true,
          total: formatted.length,
          data: formatted,
        });
      }
    } catch (sbErr) {
      console.warn("[GET /api/ltpe] Supabase read skipped:", sbErr);
    }

    // 2. Try Prisma
    let dbData: any[] = [];
    try {
      dbData = await prisma.ltpeRegistration.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      // Safe DB fallback
    }

    const combined = [...memoryLtpeRegistrations, ...dbData];
    return NextResponse.json({
      success: true,
      total: combined.length,
      data: combined,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      total: memoryLtpeRegistrations.length,
      data: memoryLtpeRegistrations,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentName,
      parentName,
      phone,
      parentPhone: bodyParentPhone,
      parentEmail,
      currentClass,
      school,
      schoolName,
      city,
      gender,
      examDate,
    } = body;

    const actualPhone = phone || bodyParentPhone;
    const actualSchool = schoolName || school;

    if (!studentName || !parentName || !actualPhone || !currentClass) {
      return NextResponse.json(
        { error: "Student name, parent name, phone, and current class are required." },
        { status: 400 }
      );
    }

    const registrationNo = generateLtpeRegNo();

    const newRecord = {
      id: `ltpe-${Date.now()}`,
      registrationNo,
      studentName,
      parentName,
      parentPhone: actualPhone,
      phone: actualPhone,
      parentEmail: parentEmail || "",
      currentClass,
      class: currentClass,
      school: actualSchool || "Not specified",
      city: city || "Mathura",
      gender: gender || "N/A",
      createdAt: new Date().toISOString(),
      status: "CONFIRMED",
    };

    // 1. In-memory backup
    memoryLtpeRegistrations.unshift(newRecord);
    memoryEnquiries.unshift({
      id: `enq-ltpe-${Date.now()}`,
      studentName,
      name: studentName,
      phone: actualPhone,
      email: parentEmail || "",
      currentClass,
      class: currentClass,
      interestedCourse: `LTPE 2026 (${registrationNo})`,
      course: `LTPE 2026 (${registrationNo})`,
      leadSource: "LTPE",
      status: "NEW",
      createdAt: new Date().toISOString(),
      remarks: `LTPE Reg No: ${registrationNo}`,
    });

    // 2. Direct Supabase Storage (Permanent)
    try {
      const supabase = await createAdminClient();
      await supabase.from("ltpe_registrations").insert([
        {
          registration_no: registrationNo,
          student_name: studentName,
          parent_name: parentName,
          parent_phone: actualPhone,
          parent_email: parentEmail || null,
          current_class: currentClass,
          school: actualSchool || null,
          city: city || "Mathura",
          gender: gender || null,
          exam_date: examDate || "11 October 2026",
          status: "CONFIRMED",
        },
      ]);

      await supabase.from("enquiries").insert([
        {
          student_name: studentName,
          parent_name: parentName,
          phone: actualPhone,
          email: parentEmail || null,
          current_class: currentClass,
          school: actualSchool || null,
          city: city || "Mathura",
          interested_course: "LTPE Exam 2026",
          lead_source: "LTPE",
          status: "NEW",
          remarks: `LTPE Reg No: ${registrationNo}, Date: ${examDate || "11 October 2026"}`,
        },
      ]);
    } catch (sbErr) {
      console.warn("[POST /api/ltpe] Supabase insert fallback:", sbErr);
    }

    // 3. Prisma DB write (if connected)
    try {
      await prisma.ltpeRegistration.create({
        data: {
          registrationNo,
          studentName,
          parentName,
          parentPhone: actualPhone,
          parentEmail: parentEmail || undefined,
          currentClass,
          school: actualSchool || undefined,
          city: city || "Mathura",
          gender: gender || undefined,
        },
      });

      await prisma.enquiry.create({
        data: {
          studentName,
          parentName,
          phone: actualPhone,
          email: parentEmail || undefined,
          currentClass,
          school: actualSchool || undefined,
          city: city || "Mathura",
          interestedCourse: "LTPE Exam 2026",
          leadSource: "LTPE",
          status: "NEW",
          remarks: `LTPE Reg No: ${registrationNo}, Date: ${examDate || "11 October 2026"}`,
        },
      });
    } catch (dbError) {
      console.warn("[POST /api/ltpe] Prisma DB write skipped:", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        registrationNo,
        message: `Registration successful! Your LTPE Registration No is ${registrationNo}. Our team will send your hall ticket details on WhatsApp.`,
        data: newRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/ltpe]", error);
    return NextResponse.json(
      { error: "Failed to register for LTPE. Please call us at +91 9319098141." },
      { status: 500 }
    );
  }
}
