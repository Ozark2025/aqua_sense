import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";
import pool from "../../../lib/db.js";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admins only" },
        { status: 403 }
      );
    }

    const result = await pool.query(`
      SELECT
        ir.report_id,
        ir.category,
        ir.priority,
        ir.location,
        ir.description,
        ir.photos,
        ir.status,
        ir.created_at,
        u.name AS user_name
      FROM issue_reports ir
      LEFT JOIN "User" u ON ir.user_id = u.id
      ORDER BY ir.created_at DESC
    `);

    // ✅ ALWAYS return ARRAY
    return NextResponse.json(result.rows);

  } catch (error) {
    console.error("GET REPORTS ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
