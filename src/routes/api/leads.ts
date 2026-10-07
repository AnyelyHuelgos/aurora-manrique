import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { isAllowedOrigin, isBodyTooLarge, json } from "@/server/http.server";
import { dbExists, dbInsert } from "@/server/supabase.server";

const CONSENT_VERSION = "politica-2026-10";

const vacioANull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

// La forma exacta que aceptamos. Todo lo demás se rechaza.
const LeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.string().trim().toLowerCase().email().max(200),
  website: z.preprocess(vacioANull, z.string().trim().max(300).optional()),
  need: z.preprocess(
    vacioANull,
    z.enum(["Estrategia", "Contenido", "Publicidad", "Email marketing", "No estoy segura"]).optional(),
  ),
  stage: z.preprocess(
    vacioANull,
    z.enum(["Estoy empezando", "Ya vendo", "Estoy creciendo", "Marca consolidada"]).optional(),
  ),
  challenge: z.preprocess(vacioANull, z.string().trim().max(1000).optional()),
  consent: z.literal(true), // si no marcó la casilla, se rechaza
  hp_field: z.string().max(200).optional(), // honeypot: solo lo llenan los bots
});

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAllowedOrigin(request)) return json({ error: "Origen no permitido" }, 403);
        if (isBodyTooLarge(request, 8_000)) return json({ error: "Solicitud demasiado grande" }, 413);

        const parsed = LeadSchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return json({ error: "Revisa los datos del formulario." }, 400);

        const { hp_field, consent: _consent, ...lead } = parsed.data;
        // Bot: respondemos como si todo hubiera salido bien, pero no guardamos nada.
        if (hp_field) return json({ ok: true }, 200);

        try {
          // Evita envíos repetidos: un mismo correo, como máximo una vez cada 10 minutos.
          const desde = new Date(Date.now() - 10 * 60_000).toISOString();
          const repetido = await dbExists(
            "leads",
            `email=eq.${encodeURIComponent(lead.email)}&created_at=gte.${encodeURIComponent(desde)}`,
          );
          if (repetido) {
            return json({ error: "Ya recibí tu solicitud. Te escribo pronto." }, 429, {
              "Retry-After": "600",
            });
          }

          await dbInsert("leads", {
            source: "form",
            name: lead.name,
            company: lead.company,
            email: lead.email,
            website: lead.website ?? null,
            need: lead.need ?? null,
            stage: lead.stage ?? null,
            challenge: lead.challenge ?? null,
            consent_at: new Date().toISOString(),
            consent_version: CONSENT_VERSION,
          });
          return json({ ok: true }, 201);
        } catch (err) {
          console.error("Error guardando lead:", (err as Error).message); // nunca los datos
          return json({ error: "No pude guardar tus datos. Intenta de nuevo en un momento." }, 500);
        }
      },
    },
  },
});
