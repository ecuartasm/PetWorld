import { NextRequest, NextResponse } from "next/server";
import { verify } from "argon2";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validation";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Correo o contrasena incorrectos" },
        { status: 401 },
      );
    }

    const valid = await verify(user.passwordHash, password);
    if (!valid) {
      return NextResponse.json(
        { error: "Correo o contrasena incorrectos" },
        { status: 401 },
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await createSession(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        city: user.city,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
