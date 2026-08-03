import { NextRequest, NextResponse } from "next/server";
import {
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
  updateEnquiryStatus,
  assignCounsellor,
  addFollowUp,
} from "@/services/enquiries.service";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const enquiry = await getEnquiryById(id);
  if (!enquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: enquiry });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();

  // Handle special actions
  if (body._action === "UPDATE_STATUS") {
    const enquiry = await updateEnquiryStatus(id, body.status);
    return NextResponse.json({ data: enquiry });
  }

  if (body._action === "ASSIGN_COUNSELLOR") {
    await assignCounsellor(id, body.counsellorId);
    return NextResponse.json({ success: true });
  }

  if (body._action === "ADD_FOLLOWUP") {
    const followUp = await addFollowUp(
      id,
      body.adminId,
      body.notes,
      body.nextFollowUp ? new Date(body.nextFollowUp) : undefined,
      body.outcome
    );
    return NextResponse.json({ data: followUp });
  }

  const enquiry = await updateEnquiry(id, body);
  return NextResponse.json({ data: enquiry });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await deleteEnquiry(id);
  return NextResponse.json({ success: true });
}
