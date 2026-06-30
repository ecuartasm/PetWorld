import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { petSchema } from "@/lib/validation";
import { logRequest, logError } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logRequest("/api/pets", "GET", 401);
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const pets = await prisma.pet.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
    });

    logRequest("/api/pets", "GET", 200, { userId: user.id, count: pets.length });
    return NextResponse.json({ pets });
  } catch (error) {
    logError("/api/pets", "GET", error);
    console.error("Get pets error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logRequest("/api/pets", "POST", 401);
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = petSchema.safeParse(body);

    if (!parsed.success) {
      logRequest("/api/pets", "POST", 400, { userId: user.id, error: "validation_failed" });
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { birthDate, ...rest } = parsed.data;

    const pet = await prisma.pet.create({
      data: {
        ...rest,
        birthDate: birthDate ? new Date(birthDate) : null,
        ownerId: user.id,
      },
    });

    logRequest("/api/pets", "POST", 201, { userId: user.id, petId: pet.id });
    return NextResponse.json({ pet }, { status: 201 });
  } catch (error) {
    logError("/api/pets", "POST", error);
    console.error("Create pet error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
