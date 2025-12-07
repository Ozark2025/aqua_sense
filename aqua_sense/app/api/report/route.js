import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";
import cloudinary from "cloudinary";
import pool from "../../../lib/db.js";

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Reliable uploader
async function uploadToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: "aqua_sense_reports" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = session.user.id;
    const data = await req.formData();

    const title = data.get("title");
    const category = data.get("category");
    const priority = data.get("priority");
    const location = data.get("location");
    const description = data.get("description");

    const photos = data.getAll("photos");

    // Upload photos
    const uploadedImageUrls = [];
    for (const file of photos) {
      if (!file?.name) continue;

      const url = await uploadToCloudinary(file);
      uploadedImageUrls.push(url);
    }

    // Insert into DB
    const result = await pool.query(
      `INSERT INTO issue_reports 
       (user_id, title, category, priority, location, description, photos)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING report_id, created_at`,
      [
        userId,
        title,
        category,
        priority,
        location,
        description,
        uploadedImageUrls.length ? uploadedImageUrls : null,
      ]
    );

    return NextResponse.json(
      { success: true, report: result.rows[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error("Report API Error:", err);
    return NextResponse.json(
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}
