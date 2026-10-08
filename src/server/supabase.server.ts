// Acceso a Supabase por su API REST con la llave secreta. NUNCA importar desde el navegador.

function config() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SECRET_KEY"];
  if (!url || !key) throw new Error("Supabase no configurado");
  const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  // Las llaves antiguas (service_role) son JWT y también van en Authorization.
  if (key.startsWith("eyJ")) headers["Authorization"] = `Bearer ${key}`;
  return { url: url.replace(/\/$/, ""), headers };
}

export async function dbInsert(table: string, row: Record<string, unknown>) {
  const { url, headers } = config();
  const r = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(10_000),
  });
  if (!r.ok) throw new Error(`Supabase insert ${r.status}`);
}

/** Devuelve true si existe al menos una fila que cumpla el filtro (sintaxis PostgREST). */
export async function dbExists(table: string, filter: string) {
  const { url, headers } = config();
  const r = await fetch(`${url}/rest/v1/${table}?select=id&limit=1&${filter}`, {
    headers,
    signal: AbortSignal.timeout(10_000),
  });
  if (!r.ok) throw new Error(`Supabase select ${r.status}`);
  const rows = (await r.json()) as unknown[];
  return rows.length > 0;
}

/** Llama una función SQL (RPC) con la llave secreta y devuelve su resultado. */
export async function dbRpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const { url, headers } = config();
  const r = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers,
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(10_000),
  });
  if (!r.ok) throw new Error(`Supabase rpc ${fn} ${r.status}`);
  return (await r.json()) as T;
}
