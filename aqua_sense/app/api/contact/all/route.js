import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        request_id AS id,
        full_name AS "userName",
        email,
        phone,
        organization_type AS "organizationType",
        message,
        status,
        created_at AS "submittedOn"
      FROM contact_requests
      ORDER BY created_at DESC;
    `);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("GET /api/contact/all error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact requests" },
      { status: 500 }
    );
  }
}
