import { NextRequest, NextResponse } from "next/server";
import { logRequest } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, target, text, href, page } = body;

    logRequest("/client", "CLICK", 200, {
      event: event || "click",
      target: target || "unknown",
      text: text || "",
      href: href || "",
      page: page || "",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
}
