import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { memoryEnquiries } from "@/lib/memory-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message, interestedIn } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      studentName: name,
      name,
      phone,
      email: email || "",
      interestedCourse: interestedIn || subject || "General Contact",
      course: interestedIn || subject || "General Contact",
      leadSource: "WEBSITE",
      status: "NEW",
      createdAt: new Date().toISOString(),
      remarks: message || "Enquiry from website contact page",
    };

    // Push to global memory store so Admin Dashboard sees it immediately
    memoryEnquiries.unshift(newEnquiry);

    // Save contact submission to DB
    let submission = null;
    try {
      submission = await prisma.contactSubmission.create({
        data: {
          name,
          phone,
          email: email || undefined,
          subject: subject || undefined,
          message: message || "Enquiry from website contact page",
          interestedIn: interestedIn || undefined,
        },
      });

      await prisma.enquiry.create({
        data: {
          studentName: name,
          phone,
          email: email || undefined,
          interestedCourse: interestedIn || subject || "General Contact",
          remarks: message,
          leadSource: "WEBSITE",
          status: "NEW",
        },
      });
    } catch (dbError) {
      console.warn("[POST /api/contact] DB write skipped:", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting Lakshya Academy! Our team will reach out to you within 2 hours.",
        data: submission || newEnquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json(
      { error: "Failed to submit contact request. Please try again or call +91 9319098141." },
      { status: 500 }
    );
  }
}
