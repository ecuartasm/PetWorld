import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { petSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const pets = await prisma.pet.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ pets });
  } catch (error) {
    console.error("Get pets error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = petSchema.safeParse(body);

    if (!parsed.success) {
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

    return NextResponse.json({ pet }, { status: 201 });
  } catch (error) {
    console.error("Create pet error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
