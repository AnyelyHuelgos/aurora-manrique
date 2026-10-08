// Encabezados de seguridad (capa 11 de la guía). Se agregan a todas las respuestas del servidor:
// páginas y rutas /api/*. Solo en producción, para no interferir con el servidor de desarrollo de Vite.

const CSP = [
  "default-src 'self'",
  // TanStack Start inserta scripts en línea para hidratar la página, por eso 'unsafe-inline'.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  // El navegador solo habla con nuestro propio servidor (/api/chat, /api/leads).
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Nadie puede meter el sitio dentro de otra página (clickjacking).
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": CSP,
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

export function withSecurityHeaders(response: Response): Response {
  if (!import.meta.env.PROD) return response;
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(name)) headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
