
import { NextResponse } from "next/server";

import pool from "../../../../lib/db.js";
export async function PATCH(req) {
  const { reportId, status } = await req.json();

  await pool.query(
    `UPDATE issue_reports SET status = $1 WHERE report_id = $2`,
    [status, reportId]
  );

  return NextResponse.json({ success: true });
}
