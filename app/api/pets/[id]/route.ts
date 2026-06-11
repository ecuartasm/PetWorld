import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { petSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

const petUpdateSchema = petSchema.partial();

async function getPetWithAuth(petId: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "No autenticado", status: 401, pet: null, user: null };

  const pet = await prisma.pet.findUnique({ where: { id: petId } });
  if (!pet) return { error: "Mascota no encontrada", status: 404, pet: null, user };
  if (pet.ownerId !== user.id) return { error: "No autorizado", status: 403, pet: null, user };

  return { error: null, status: 200, pet, user };
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { error, status, pet } = await getPetWithAuth(id);
    if (error) return NextResponse.json({ error }, { status });

    return NextResponse.json({ pet });
  } catch (error) {
    console.error("Get pet error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { error, status } = await getPetWithAuth(id);
    if (error) return NextResponse.json({ error }, { status });

    const body = await request.json();
    const parsed = petUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { birthDate, ...rest } = parsed.data;

    const data: Record<string, unknown> = { ...rest };
    if (birthDate !== undefined) {
      data.birthDate = birthDate ? new Date(birthDate) : null;
    }

    const updated = await prisma.pet.update({
      where: { id },
      data,
    });

    return NextResponse.json({ pet: updated });
  } catch (error) {
    console.error("Update pet error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { error, status } = await getPetWithAuth(id);
    if (error) return NextResponse.json({ error }, { status });

    await prisma.pet.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete pet error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
