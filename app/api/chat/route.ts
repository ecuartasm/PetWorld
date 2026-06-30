import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getKnowledgeContext } from "@/lib/knowledge";
import { getSystemPrompt, CHAT_MODEL, MAX_CONVERSATION_TURNS, MAX_MESSAGE_LENGTH } from "@/lib/chat-config";
import { checkRateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { logRequest, logError } from "@/lib/logger";

export const dynamic = "force-dynamic";

const messageSchema = z.object({
  message: z.string().min(1).max(MAX_MESSAGE_LENGTH),
  conversationId: z.string().optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .optional(),
});

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    logRequest("/api/chat", "POST", 429, { ip });
    return new Response(
      JSON.stringify({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  // Validate API key exists
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    logRequest("/api/chat", "POST", 503, { error: "no_api_key" });
    return new Response(
      JSON.stringify({ error: "El asistente no esta disponible en este momento." }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Solicitud invalida." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Mensaje invalido.", details: parsed.error.flatten().fieldErrors }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { message, history, conversationId } = parsed.data;

  // Build messages array (trim to max turns)
  const messages: Array<{ role: "user" | "assistant"; content: string }> = [];
  if (history && history.length > 0) {
    const trimmed = history.slice(-(MAX_CONVERSATION_TURNS * 2));
    messages.push(...trimmed);
  }
  messages.push({ role: "user", content: message });

  // Get knowledge context and system prompt
  const knowledgeContext = getKnowledgeContext();
  const systemPrompt = getSystemPrompt(knowledgeContext);

  // Persist message for logged-in users
  const user = await getCurrentUser();
  let savedConversationId = conversationId;

  if (user) {
    try {
      if (!savedConversationId) {
        const conversation = await prisma.chatConversation.create({
          data: { userId: user.id },
        });
        savedConversationId = conversation.id;
      }

      await prisma.chatMessage.create({
        data: {
          conversationId: savedConversationId,
          role: "USER",
          content: message,
        },
      });
    } catch (e) {
      console.error("Error persisting chat message:", e);
    }
  }

  // Call Anthropic with streaming
  try {
    const client = new Anthropic({ apiKey });

    const stream = await client.messages.stream({
      model: CHAT_MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    // Collect full response for persistence
    let fullResponse = "";

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              const text = event.delta.text;
              fullResponse += text;
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text, conversationId: savedConversationId })}\n\n`),
              );
            }
          }

          // Persist assistant response
          if (user && savedConversationId) {
            try {
              await prisma.chatMessage.create({
                data: {
                  conversationId: savedConversationId,
                  role: "ASSISTANT",
                  content: fullResponse,
                },
              });
            } catch (e) {
              console.error("Error persisting assistant message:", e);
            }
          }

          logRequest("/api/chat", "POST", 200, { ip, conversationId: savedConversationId });
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error) {
          logError("/api/chat", "POST", error);
          console.error("Streaming error:", error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Lo siento, ocurrio un error. Intenta de nuevo." })}\n\n`,
            ),
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    logError("/api/chat", "POST", error);
    console.error("Anthropic API error:", error);
    return new Response(
      JSON.stringify({ error: "El asistente no esta disponible en este momento. Intenta de nuevo mas tarde." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
