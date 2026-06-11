import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import { requestPasswordResetSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestPasswordResetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { email } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        message: "Si el correo existe, recibiras un enlace para restablecer tu contrasena.",
      });
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    // In development, log the reset link to console
    // In production, this would send an email
    console.log(`[DEV] Password reset link for ${email}: ${resetUrl}`);

    return NextResponse.json({
      message: "Si el correo existe, recibiras un enlace para restablecer tu contrasena.",
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
