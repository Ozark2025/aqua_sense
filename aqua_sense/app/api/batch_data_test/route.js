import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { batch_id } = await req.json();

    if (!batch_id) {
      return NextResponse.json(
        { error: "batch_id is required" },
        { status: 400 }
      );
    }

    // 1️⃣ FETCH BATCH DETAILS
    const batch = await pool.query(
      `SELECT * FROM batches WHERE batch_id = $1`,
      [batch_id]
    );

    if (batch.rows.length === 0) {
      return NextResponse.json(
        { error: "Batch not found" },
        { status: 404 }
      );
    }

    // 2️⃣ PRIMARY STAGE
    const primary = await pool.query(
      `SELECT * FROM primary_stage_readings WHERE batch_id = $1`,
      [batch_id]
    );

    // 3️⃣ SECONDARY STAGE
    const secondary = await pool.query(
      `SELECT * FROM secondary_stage_readings WHERE batch_id = $1`,
      [batch_id]
    );

    // 4️⃣ TERTIARY STAGE
    const tertiary = await pool.query(
      `SELECT * FROM tertiary_stage_readings WHERE batch_id = $1`,
      [batch_id]
    );

    // 5️⃣ RETURN COMBINED RESPONSE
    return NextResponse.json({
      batch: batch.rows[0],
      primary: primary.rows,
      secondary: secondary.rows,
      tertiary: tertiary.rows
    });

  } catch (err) {
    console.error("Batch fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch batch data" },
      { status: 500 }
    );
  }
}
