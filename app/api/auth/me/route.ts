import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateAccountSchema } from "@/lib/validation";
import { logRequest, logError } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logRequest("/api/auth/me", "GET", 401);
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const petWithAvatar = await prisma.pet.findFirst({
      where: { ownerId: user.id, avatarUrl: { not: null } },
      orderBy: { createdAt: "asc" },
      select: { avatarUrl: true, name: true },
    });

    logRequest("/api/auth/me", "GET", 200, { userId: user.id });
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        phone: user.phone,
        city: user.city,
        createdAt: user.createdAt,
        petAvatar: petWithAvatar?.avatarUrl || null,
        petName: petWithAvatar?.name || null,
      },
    });
  } catch (error) {
    logError("/api/auth/me", "GET", error);
    console.error("Get user error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logRequest("/api/auth/me", "PATCH", 401);
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateAccountSchema.safeParse(body);

    if (!parsed.success) {
      logRequest("/api/auth/me", "PATCH", 400, { userId: user.id, error: "validation_failed" });
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: parsed.data,
    });

    logRequest("/api/auth/me", "PATCH", 200, { userId: user.id });
    return NextResponse.json({
      user: {
        id: updated.id,
        email: updated.email,
        displayName: updated.displayName,
        phone: updated.phone,
        city: updated.city,
      },
    });
  } catch (error) {
    logError("/api/auth/me", "PATCH", error);
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
