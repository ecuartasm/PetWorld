import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ tagId: string }> }) {
  try {
    const { tagId } = await params;

    const pet = await prisma.pet.findUnique({
      where: { tagId },
      select: {
        id: true,
        tagId: true,
        name: true,
        species: true,
        breed: true,
        avatarUrl: true,
        bio: true,
        ownerName: true,
        ownerPhone: true,
        altPhone: true,
        allergies: true,
        medications: true,
        conditions: true,
        vetName: true,
        vetPhone: true,
      },
    });

    if (!pet) {
      return NextResponse.json({ error: "Mascota no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ pet });
  } catch (error) {
    console.error("Public pet lookup error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
