import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
type LeadSource = "WEBSITE" | "WHATSAPP" | "LTPE" | "REFERRAL" | "GOOGLE" | "MANUAL" | "DIRECT_CALL";
import { memoryEnquiries } from "@/lib/memory-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, currentClass, course, leadSource } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const newEnquiry = {
      id: `lead-${Date.now()}`,
      studentName: name,
      name,
      phone,
      email: email || "",
      currentClass: currentClass || "",
      class: currentClass || "",
      interestedCourse: course || "General Enquiry",
      course: course || "General Enquiry",
      leadSource: leadSource || "WEBSITE",
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    memoryEnquiries.unshift(newEnquiry);

    let enquiry = null;
    try {
      enquiry = await prisma.enquiry.create({
        data: {
          studentName: name,
          phone,
          email: email || undefined,
          currentClass: currentClass || undefined,
          interestedCourse: course || "General Enquiry",
          leadSource: (leadSource as any) || "WEBSITE",
          status: "NEW",
        },
      });
    } catch (dbError) {
      console.warn("[POST /api/leads] DB write skipped:", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully! Our counsellor will call you shortly.",
        data: enquiry || newEnquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/leads]", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please call us at +91 9319098141." },
      { status: 500 }
    );
  }
}
