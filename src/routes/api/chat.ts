import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { isAllowedOrigin, isBodyTooLarge, json } from "@/server/http.server";
import { dbRpc } from "@/server/supabase.server";
import { CANARIES, SYSTEM_PROMPT } from "@/server/chat/system-prompt.server";
import { askModel } from "@/server/chat/llm.server";

const PAUSA = "El asistente está en pausa. Puedes dejar tus datos en el formulario de Contacto y Aurora te escribe.";
const FALLA = "Ahora mismo no puedo responder. Puedes dejar tus datos en el formulario de Contacto y Aurora te escribe.";

// La forma exacta que aceptamos. El cliente NUNCA puede mandar el rol "system".
const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});
const BodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
  sessionId: z.string().uuid(),
});

// Caracteres de control (excepto saltos de línea y tabulaciones): patrón típico de spam.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

async function hashIp(ip: string) {
  const data = new TextEncoder().encode(`aurora-chat:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest).slice(0, 16), (b) => b.toString(16).padStart(2, "0")).join("");
}

function guardOutput(reply: string) {
  const lower = reply.toLowerCase();
  const leaked = CANARIES.some((c) => lower.includes(c.toLowerCase()));
  return leaked ? "No puedo compartir esa información. ¿Te cuento cómo trabaja Aurora?" : reply.slice(0, 4000);
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Interruptor de apagado: CHAT_ENABLED=false en Vercel pausa el chat sin tocar código.
        if (process.env["CHAT_ENABLED"] === "false") return json({ reply: PAUSA }, 200);

        if (!isAllowedOrigin(request)) return json({ error: "Origen no permitido" }, 403);
        if (isBodyTooLarge(request, 40_000)) return json({ error: "Mensaje demasiado grande" }, 413);

        const parsed = BodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return json({ error: "Petición inválida" }, 400);
        const { messages } = parsed.data;
        if (messages.at(-1)?.role !== "user") return json({ error: "Petición inválida" }, 400);
        if (messages.some((m) => CONTROL.test(m.content))) return json({ error: "Petición inválida" }, 400);

        // Límite de uso por visitante (compartido en Supabase porque Vercel es serverless) y tope global diario.
        const ip =
          request.headers.get("x-real-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "desconocida";
        try {
          const limit = await dbRpc<{ ok: boolean; reason?: string }>("chat_rate_hit", {
            p_key: await hashIp(ip),
            p_daily_token_cap: Number(process.env["CHAT_DAILY_TOKEN_CAP"] ?? 200_000),
          });
          if (!limit.ok) {
            if (limit.reason === "global") return json({ reply: PAUSA }, 200);
            const msg =
              limit.reason === "minute"
                ? "Vas muy rápido. Intenta de nuevo en un minuto."
                : "Llegaste al límite de mensajes por hoy. Puedes dejar tus datos en el formulario de Contacto.";
            return json({ error: msg }, 429, { "Retry-After": limit.reason === "minute" ? "60" : "3600" });
          }
        } catch (err) {
          console.error("Límite de uso no disponible:", (err as Error).message);
          return json({ reply: FALLA }, 200); // si no podemos medir el uso, no llamamos al modelo
        }

        // El prompt de sistema lo agrega el SERVIDOR, siempre de primero. Solo los últimos 20 turnos.
        const result = await askModel([{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-20)]);
        if (!result) return json({ reply: FALLA }, 200);

        if (result.tokens > 0) {
          dbRpc("chat_add_tokens", { p_tokens: result.tokens }).catch((err) =>
            console.error("No se pudo sumar tokens:", (err as Error).message),
          );
        }
        return json({ reply: guardOutput(result.text) }, 200);
      },
    },
  },
});
