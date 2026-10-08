export type ChatMessage = { id: string; role: "user" | "assistant"; text: string };

const SIN_CONEXION = "No pude conectarme. Revisa tu conexión e intenta de nuevo.";

/** Número de sesión del chat. Es lo único que se guarda en el navegador. */
function getSessionId() {
  try {
    let id = sessionStorage.getItem("chat_session");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("chat_session", id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** Envía la conversación a /api/chat. Nunca lanza error: siempre devuelve un texto para mostrar. */
export async function sendChatMessage(_text: string, history: ChatMessage[]): Promise<string> {
  const messages = history
    .filter((m) => m.id !== "welcome")
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.text.slice(0, 2000) }));
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, sessionId: getSessionId() }),
    });
    const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
    if (!res.ok) return data.error ?? SIN_CONEXION;
    return data.reply ?? SIN_CONEXION;
  } catch {
    return SIN_CONEXION;
  }
}
