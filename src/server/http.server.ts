// Utilidades compartidas por los endpoints /api/*. Solo se ejecuta en el servidor.

export function json(data: unknown, status: number, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });
}

/** Solo aceptamos peticiones desde nuestro propio sitio (ALLOWED_ORIGINS separados por coma). */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const allowed = (process.env["ALLOWED_ORIGINS"] ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  if (allowed.length === 0) {
    // Sin configurar: solo se permite en desarrollo local.
    return process.env["NODE_ENV"] !== "production" && !!origin?.startsWith("http://localhost");
  }
  return !!origin && allowed.includes(origin);
}

/** Rechaza cuerpos grandes antes de leerlos. */
export function isBodyTooLarge(request: Request, maxBytes: number): boolean {
  const size = Number(request.headers.get("content-length") ?? 0);
  return !size || size > maxBytes;
}
