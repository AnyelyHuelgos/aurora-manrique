import { useState, type FormEvent } from "react";
import { Reveal } from "./motion";

const necesidades = ["Estrategia", "Contenido", "Publicidad", "Email marketing", "No estoy segura"];
const etapas = ["Estoy empezando", "Ya vendo", "Estoy creciendo", "Marca consolidada"];
type Errores = Partial<Record<"name" | "company" | "email" | "consent", string>>;

const input = "w-full rounded-sm border border-input bg-card px-4 py-3 text-sm";

export function Contacto() {
  const [errores, setErrores] = useState<Errores>({});
  const [enviado, setEnviado] = useState(false);
  const [stage, setStage] = useState("");
  const [challenge, setChallenge] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    if (v("hp_field")) return;
    const err: Errores = {};
    if (!v("name")) err.name = "Escribe tu nombre.";
    if (!v("company")) err.company = "Escribe el nombre de tu marca o empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) err.email = "Escribe un correo válido.";
    if (!d.get("consent")) err.consent = "Necesitas aceptar para que pueda contactarte.";
    setErrores(err);
    setEnviado(false);
    if (Object.keys(err).length) return;
    setEnviado(true);
    form.reset();
    setStage("");
    setChallenge("");
  }

  const Err = ({ k }: { k: keyof Errores }) =>
    errores[k] ? (
      <p role="alert" className="mt-2 text-sm text-destructive">
        {errores[k]}
      </p>
    ) : null;

  return (
    <section id="contacto" className="scroll-mt-20 bg-background">
      <Reveal className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-[1fr_1.1fr] md:py-36 lg:gap-24">
        <div>
          <h2 className="font-display text-4xl leading-tight sm:text-6xl">
            Tu próxima campaña puede empezar con una mejor pregunta.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Cuéntame qué estás intentando conseguir y revisaremos si tiene sentido trabajar juntas.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-dorado">
            Sin costo · Sin compromiso · Respuesta en menos de 48 horas
          </p>
          <a
            href="mailto:hola@auroramanrique.com"
            className="mt-8 inline-block font-medium underline decoration-dorado decoration-2 underline-offset-4"
          >
            hola@auroramanrique.com
          </a>
        </div>

        <form onSubmit={onSubmit} noValidate className="min-w-0 space-y-6">
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="hp_field">No llenar</label>
            <input id="hp_field" name="hp_field" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">Nombre *</label>
              <input id="name" name="name" required autoComplete="name" aria-invalid={!!errores.name} className={input} />
              <Err k="name" />
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium">Marca / empresa *</label>
              <input id="company" name="company" required autoComplete="organization" aria-invalid={!!errores.company} className={input} />
              <Err k="company" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Correo *</label>
              <input id="email" name="email" type="email" required autoComplete="email" aria-invalid={!!errores.email} className={input} />
              <Err k="email" />
            </div>
            <div>
              <label htmlFor="website" className="mb-2 block text-sm font-medium">Web o Instagram</label>
              <input id="website" name="website" autoComplete="url" className={input} />
            </div>
          </div>
          <div>
            <label htmlFor="need" className="mb-2 block text-sm font-medium">¿Qué necesitas mejorar?</label>
            <select id="need" name="need" className={input}>
              {necesidades.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-medium">¿En qué etapa está tu negocio?</legend>
            <input type="hidden" name="stage" value={stage} />
            <div className="flex flex-wrap gap-2" role="radiogroup">
              {etapas.map((et) => (
                <button
                  key={et}
                  type="button"
                  role="radio"
                  aria-checked={stage === et}
                  onClick={() => setStage(et)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    stage === et ? "border-foreground bg-foreground text-background" : "border-input hover:border-foreground"
                  }`}
                >
                  {et}
                </button>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="challenge" className="mb-2 block text-sm font-medium">¿Cuál es tu principal reto?</label>
            <textarea
              id="challenge"
              name="challenge"
              rows={4}
              maxLength={1000}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className={input}
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">{challenge.length}/1000</p>
          </div>
          <div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" name="consent" required aria-invalid={!!errores.consent} className="mt-1 h-4 w-4 accent-dorado" />
              Acepto que mis datos se usen para contactarme, según la política de privacidad.
            </label>
            <Err k="consent" />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-dorado px-8 py-4 text-sm font-semibold text-dorado-foreground transition-opacity hover:opacity-90"
          >
            Agenda una llamada de 30 minutos →
          </button>
          {enviado && (
            <p role="status" className="text-sm font-medium">
              Gracias. Recibí tu mensaje y te escribo en menos de 48 horas para agendar la llamada.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
