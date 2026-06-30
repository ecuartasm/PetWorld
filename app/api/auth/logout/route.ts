import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { logRequest, logError } from "@/lib/logger";

export async function POST() {
  try {
    await destroySession();
    logRequest("/api/auth/logout", "POST", 200);
    return NextResponse.json({ success: true });
  } catch (error) {
    logError("/api/auth/logout", "POST", error);
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
