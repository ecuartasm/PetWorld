import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { hash } from "argon2";
import { prisma } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { token, password } = parsed.data;
    const tokenHash = createHash("sha256").update(token).digest("hex");

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "El enlace es invalido o ha expirado" },
        { status: 400 },
      );
    }

    const passwordHash = await hash(password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
      // Invalidate all existing sessions
      prisma.session.deleteMany({
        where: { userId: resetToken.userId },
      }),
    ]);

    return NextResponse.json({
      message: "Contrasena actualizada exitosamente. Inicia sesion con tu nueva contrasena.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
