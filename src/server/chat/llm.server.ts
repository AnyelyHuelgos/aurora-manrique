// Llamada al modelo vía OpenRouter (formato compatible con OpenAI). La llave nunca sale de aquí.

type LlmMessage = { role: "system" | "user" | "assistant"; content: string };
export type LlmResult = { text: string; tokens: number } | null;

export async function askModel(messages: LlmMessage[]): Promise<LlmResult> {
  const key = process.env["OPENROUTER_API_KEY"];
  if (!key) throw new Error("OPENROUTER_API_KEY no configurada");
  // Orden de intento: modelo principal, modelo de respaldo y, al final, el router gratuito.
  // Los IDs de modelos gratuitos cambian con el tiempo: se ajustan en Vercel sin tocar código.
  const models = [
    ...new Set(
      [
        process.env["CHAT_MODEL"],
        // CHAT_FALLBACK_MODEL acepta varios modelos separados por coma, en orden de preferencia.
        ...(process.env["CHAT_FALLBACK_MODEL"] ?? "").split(","),
        "openrouter/free",
      ]
        .map((m) => m?.trim())
        .filter((m): m is string => !!m),
    ),
  ];

  for (const model of models) {
    try {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
          "X-Title": "Aurora Manrique - asistente web",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.3,
          // Margen amplio: algunos modelos gratuitos "piensan" antes de responder y eso consume tokens.
          max_tokens: 2000,
          // Pedimos el mínimo de razonamiento y que no se incluya en la respuesta.
          reasoning: { effort: "low", exclude: true },
        }),
        signal: AbortSignal.timeout(20_000),
      });
      if (!r.ok) {
        console.error("Proveedor IA respondió", r.status, "modelo", model); // sin datos del usuario
        continue;
      }
      const data = (await r.json()) as {
        model?: string;
        choices?: { message?: { content?: string | null }; finish_reason?: string }[];
        usage?: { total_tokens?: number };
      };
      const text = data.choices?.[0]?.message?.content?.trim() ?? "";
      const usado = data.model ?? model;
      if (!text) {
        console.error("Respuesta vacía, modelo", usado, "fin:", data.choices?.[0]?.finish_reason ?? "?");
        continue;
      }
      if (isNotAnAnswer(text)) {
        console.error("Respuesta descartada (clasificador, no chat), modelo", usado);
        continue;
      }
      return { text, tokens: data.usage?.total_tokens ?? 0 };
    } catch (err) {
      console.error("Fallo llamando al proveedor IA:", (err as Error).name, "modelo", model);
    }
  }
  return null;
}

/**
 * Algunos modelos del router gratuito son clasificadores de seguridad, no asistentes:
 * devuelven cosas como "User Safety: safe" en lugar de una respuesta. Esas se descartan.
 */
function isNotAnAnswer(text: string) {
  return /\b(user|response)\s+safety\s*:/i.test(text) || /^\s*(safe|unsafe)\b/i.test(text);
}
