import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateAccountSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        phone: user.phone,
        city: user.city,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateAccountSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: parsed.data,
    });

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
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
