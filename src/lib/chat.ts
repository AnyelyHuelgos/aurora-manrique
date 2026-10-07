export type ChatMessage = { id: string; role: "user" | "assistant"; text: string };

/** Envío del chat. Hoy responde con un texto fijo; reemplazar por la conexión real más adelante. */
export async function sendChatMessage(_text: string, _history: ChatMessage[]): Promise<string> {
  await new Promise((r) => setTimeout(r, 600));
  return "Pronto podré responderte. Mientras tanto, puedes agendar una llamada.";
}
