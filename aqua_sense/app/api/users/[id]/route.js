import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import pool from "../../../../lib/db.js";

// ✅ MAKE ADMIN
export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const userId = params.id;

  await pool.query(
    `UPDATE "User" SET role = 'admin' WHERE id = $1`,
    [userId]
  );

  return NextResponse.json({ success: true });
}

// ✅ DELETE USER
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const userId = params.id;

  await pool.query(
    `DELETE FROM "User" WHERE id = $1`,
    [userId]
  );

  return NextResponse.json({ success: true });
}
