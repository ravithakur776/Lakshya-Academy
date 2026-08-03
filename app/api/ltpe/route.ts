import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { memoryLtpeRegistrations, memoryEnquiries } from "@/lib/memory-store";

function generateLtpeRegNo(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `LTPE${year}${random}`;
}

export async function GET() {
  try {
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
    return NextResponse.json({ success: true, total: memoryLtpeRegistrations.length, data: memoryLtpeRegistrations });
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

    // Push to global memory stores for both LTPE table and CRM pipeline
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

    let dbRegistration = null;
    try {
      dbRegistration = await prisma.ltpeRegistration.create({
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
          remarks: `LTPE Reg No: ${registrationNo}, Date: ${examDate || "2026-08-23"}`,
        },
      });
    } catch (dbError) {
      console.warn("[POST /api/ltpe] DB write skipped:", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        registrationNo,
        message: `Registration successful! Your LTPE Registration No is ${registrationNo}. Our team will send your hall ticket details on WhatsApp.`,
        data: dbRegistration || newRecord,
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
