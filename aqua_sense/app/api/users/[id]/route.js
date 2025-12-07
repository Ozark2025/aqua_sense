import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import pool from "../../../../lib/db";

// ✅ MAKE ADMIN


export async function PATCH(req, { params }) {
  // ✅ unwrap params
  const { id: userId } = await params;

  console.log("USER ID FROM PARAMS:", userId);

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

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
