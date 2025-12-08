import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { id, status } = await req.json();

    const result = await pool.query(
      `
        UPDATE contact_requests
        SET status = $1, updated_at = NOW()
        WHERE request_id = $2
        RETURNING *;
      `,
      [status, id]
    );

    return NextResponse.json(
      { success: true, data: result.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Status Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
