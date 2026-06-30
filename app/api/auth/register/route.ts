import { NextRequest, NextResponse } from "next/server";
import { hash } from "argon2";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validation";
import { createSession } from "@/lib/auth";
import { logRequest, logError } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      logRequest("/api/auth/register", "POST", 400, { error: "validation_failed" });
      return NextResponse.json(
        { error: "Datos invalidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { email, password, displayName, phone } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      logRequest("/api/auth/register", "POST", 409, { email });
      return NextResponse.json(
        { error: "Ya existe una cuenta con este correo electronico" },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
        phone: phone || null,
        consentVersion: "1.0",
        consentTimestamp: new Date(),
      },
    });

    await createSession(user.id);

    logRequest("/api/auth/register", "POST", 201, { userId: user.id });
    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          city: user.city,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    logError("/api/auth/register", "POST", error);
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
