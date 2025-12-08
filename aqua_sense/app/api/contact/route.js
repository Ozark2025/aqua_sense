import { NextResponse } from "next/server";
import pool from "@/lib/db"; // adjust your path

export async function POST(req) {
  try {
    const body = await req.json();
    const { full_name, email, phone, organization_type, message } = body;

    const query = `
      INSERT INTO contact_requests 
      (full_name, email, phone, organization_type, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      full_name,
      email,
      phone,
      organization_type,
      message,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(
      { success: true, data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
