import { NextRequest, NextResponse } from "next/server";
import { getDashboardStats, getRecentActivity } from "@/services/analytics.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type === "activity") {
      const limit = parseInt(searchParams.get("limit") || "10");
      const activity = await getRecentActivity(limit);
      return NextResponse.json({ data: activity });
    }

    const stats = await getDashboardStats();
    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error("[GET /api/admin/analytics]", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
