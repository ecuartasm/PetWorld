import { NextResponse } from "next/server";
import { logRequest } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.$queryRaw`SELECT 1`;
    logRequest("/api/health", "GET", 200, { database: "connected" });
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch {
    logRequest("/api/health", "GET", 503, { database: "disconnected" });
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        database: "disconnected",
      },
      { status: 503 },
    );
  }
}
