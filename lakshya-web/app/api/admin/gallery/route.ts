import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      // Check single file fallback
      const singleFile = formData.get("file") as File;
      if (singleFile) {
        files.push(singleFile);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "No image files provided." }, { status: 400 });
    }

    const uploadedUrls: { name: string; url: string }[] = [];
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // Directory exists or created
    }

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${Date.now()}-${safeName}`;
      const filePath = path.join(uploadsDir, filename);

      await writeFile(filePath, buffer);
      uploadedUrls.push({
        name: file.name,
        url: `/uploads/${filename}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedUrls.length} file(s) uploaded successfully!`,
      data: uploadedUrls,
    });
  } catch (error) {
    console.error("[POST /api/admin/gallery]", error);
    return NextResponse.json(
      { error: "Failed to upload images to server." },
      { status: 500 }
    );
  }
}
