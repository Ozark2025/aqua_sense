import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route.js";
import pool from "../../../lib/db.js";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const result = await pool.query(
      `SELECT id, name, email, role ,created_at FROM "User"`
    );

    return NextResponse.json(result.rows); // ✅ MUST HIT THIS

  } catch (err) {
    console.error("USERS API ERROR 👉", err);

    // ✅ IMPORTANT: return JSON even on crash
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
