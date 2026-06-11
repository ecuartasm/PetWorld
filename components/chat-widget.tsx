"use client";

import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function clearConversation() {
    setMessages([]);
    setConversationId(undefined);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history,
          conversationId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: data.error || "Lo siento, ocurrio un error." }
              : m,
          ),
        );
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              fullText = parsed.error;
            } else if (parsed.text) {
              fullText += parsed.text;
              if (parsed.conversationId && !conversationId) {
                setConversationId(parsed.conversationId);
              }
            }
          } catch {
            // skip malformed chunks
          }
        }

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: fullText } : m)),
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, content: "Lo siento, no pude conectarme. Intenta de nuevo." }
            : m,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors"
          aria-label="Abrir asistente de PetWorld"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl border-b border-gray-100 bg-primary-500 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">🐾</span>
              <span className="font-semibold text-white text-sm">Asistente PetWorld</span>
            </div>
            <div className="flex gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearConversation}
                  className="rounded-md p-1.5 text-white/80 hover:text-white hover:bg-primary-600"
                  aria-label="Limpiar conversacion"
                  title="Limpiar conversacion"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-white/80 hover:text-white hover:bg-primary-600"
                aria-label="Cerrar asistente"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-sm text-gray-500 mt-8">
                <p className="font-medium text-gray-700">Hola! Soy el asistente de PetWorld.</p>
                <p className="mt-1">Preguntame sobre la plataforma, servicios, o cuidado general de mascotas.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex gap-1">
                      <span className="animate-pulse">...</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                maxLength={1000}
                disabled={loading}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:opacity-50"
                aria-label="Mensaje al asistente"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-lg bg-primary-500 px-3 py-2 text-white hover:bg-primary-600 disabled:opacity-50 transition-colors"
                aria-label="Enviar mensaje"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
