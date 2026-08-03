import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, createBlogPost } from "@/services/blog.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getBlogPosts({
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      page: parseInt(searchParams.get("page") || "1"),
      pageSize: parseInt(searchParams.get("pageSize") || "10"),
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/admin/blog]", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await createBlogPost(body);
    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/blog]", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
