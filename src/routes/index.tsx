import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurora Manrique — Consultora de marketing" },
      {
        name: "description",
        content:
          "Consultora de marketing para marcas que ya tienen un buen producto y necesitan que más personas lo sepan, lo entiendan y lo compren.",
      },
      { property: "og:title", content: "Aurora Manrique — Consultora de marketing" },
      {
        property: "og:description",
        content:
          "Estrategia de marca, contenido y campañas para marcas de moda, bienestar y servicios profesionales.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const servicios = [
  {
    titulo: "Estrategia de marca",
    descripcion:
      "Definimos tu cliente ideal, tu propuesta de valor y el tono con el que hablas. Sales con un plan de comunicación de seis meses listo para ejecutar.",
    etiquetas: ["Diagnóstico de marca", "Mensaje principal", "Plan de 6 meses"],
  },
  {
    titulo: "Contenido y redes",
    descripcion:
      "Calendario mensual, guiones y piezas para Instagram, LinkedIn y TikTok, pensadas para atraer clientes y no solo seguidores.",
    etiquetas: ["Calendario editorial", "Guiones de video", "Dirección de arte"],
  },
  {
    titulo: "Campañas y email",
    descripcion:
      "Lanzamientos, pauta en Meta y secuencias de correo que acompañan a tu cliente desde el primer clic hasta la compra.",
    etiquetas: ["Pauta en Meta", "Email marketing", "Landing de campaña"],
  },
];

const pasos = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    descripcion: "Revisamos tu marca, tus números y a tu competencia en una sesión de 90 minutos.",
  },
  {
    numero: "02",
    titulo: "Plan",
    descripcion: "Te entrego objetivos, mensajes y canales priorizados según tu presupuesto.",
  },
  {
    numero: "03",
    titulo: "Ejecución",
    descripcion: "Producimos y lanzamos el contenido y las campañas, con revisiones cada semana.",
  },
  {
    numero: "04",
    titulo: "Medición",
    descripcion: "Cada mes vemos qué funcionó, qué no y dónde conviene invertir más.",
  },
];

const datos = [
  ["10", "años en marketing"],
  ["60+", "marcas acompañadas"],
  ["3x", "retorno promedio en campañas"],
];

function Index() {
  const [enviado, setEnviado] = useState(false);
  const [errores, setErrores] = useState<{ nombre?: string; correo?: string }>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nombre = String(data.get("nombre") ?? "").trim();
    const correo = String(data.get("correo") ?? "").trim();

    const nuevosErrores: { nombre?: string; correo?: string } = {};
    if (!nombre) nuevosErrores.nombre = "Escribe tu nombre.";
    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
      nuevosErrores.correo = "Escribe un correo válido.";

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviado(true);
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      {/* 1. Menú */}
      <header className="absolute inset-x-0 top-0 z-20">
        <nav
          aria-label="Principal"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6"
        >
          <a href="#inicio" className="font-display text-xl text-ciruela-foreground">
            Aurora Manrique
          </a>
          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#sobre-mi"
                className="text-sm text-ciruela-foreground/80 transition-colors hover:text-ciruela-foreground"
              >
                Sobre mí
              </a>
              <a
                href="#servicios"
                className="text-sm text-ciruela-foreground/80 transition-colors hover:text-ciruela-foreground"
              >
                Servicios
              </a>
              <a
                href="#metodo"
                className="text-sm text-ciruela-foreground/80 transition-colors hover:text-ciruela-foreground"
              >
                Método
              </a>
            </div>
            <a
              href="#contacto"
              className="rounded-full border border-dorado px-5 py-2 text-sm font-medium text-dorado transition-colors hover:bg-dorado hover:text-dorado-foreground"
            >
              Agenda una llamada
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* 2. Hero */}
        <section id="inicio" className="bg-ciruela text-ciruela-foreground">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-32 md:grid-cols-2 md:items-end md:pt-40 lg:gap-16">
            <div className="pb-16 md:pb-24">
              <h1 className="animate-hero-rise font-display text-6xl leading-[1.02] sm:text-7xl lg:text-8xl">
                Aurora
                <span className="block pl-8 italic text-dorado sm:pl-12">Manrique</span>
              </h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ciruela-foreground/80">
                Consultora de marketing para marcas que ya tienen un buen producto y
                necesitan que más personas lo sepan, lo entiendan y lo compren.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="rounded-full bg-dorado px-7 py-3 text-sm font-semibold text-dorado-foreground transition-opacity hover:opacity-90"
                >
                  Agenda una llamada
                </a>
                <a
                  href="#servicios"
                  className="rounded-full border border-ciruela-foreground/40 px-7 py-3 text-sm font-medium text-ciruela-foreground transition-colors hover:border-ciruela-foreground"
                >
                  Ver servicios
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="/images/aurora-hero.png"
                alt="Aurora Manrique, consultora de marketing, con los brazos cruzados"
                className="w-full max-w-sm rounded-t-full border-4 border-dorado/40 object-cover md:max-w-md"
              />
            </div>
          </div>
        </section>

        {/* 3. Sobre mí */}
        <section id="sobre-mi" className="bg-background">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32 lg:gap-20">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Estrategia clara antes que publicaciones bonitas.
            </h2>
            <div>
              <img
                src="/images/aurora-about.png"
                alt="Aurora Manrique pensativa, con la mano en el mentón"
                className="w-full max-w-md rounded-3xl object-cover"
              />
              <p className="mt-8 leading-relaxed text-muted-foreground">
                Durante diez años he acompañado a marcas de moda, bienestar y servicios
                profesionales a ordenar su comunicación. Empiezo por entender a quién le
                venden y por qué los eligen; después decidimos qué decir, dónde y con qué
                presupuesto.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Trabajo con pocas marcas a la vez para estar presente en cada decisión.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
            <dl className="grid gap-10 border-t border-border pt-10 sm:grid-cols-3">
              {datos.map(([valor, etiqueta]) => (
                <div key={etiqueta}>
                  <dt className="sr-only">{etiqueta}</dt>
                  <dd className="font-display text-5xl">
                    {valor}
                    <span className="mt-2 block font-sans text-sm text-muted-foreground">
                      {etiqueta}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 4. Servicios */}
        <section id="servicios" className="bg-niebla">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Tres formas de trabajar juntas.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Puedes empezar por una sola o combinarlas. Todas incluyen reporte mensual
              con resultados reales.
            </p>
            <div className="mt-16">
              {servicios.map((s) => (
                <article
                  key={s.titulo}
                  className="grid gap-4 border-t border-border py-10 md:grid-cols-2 md:gap-12"
                >
                  <h3 className="font-display text-2xl sm:text-3xl">{s.titulo}</h3>
                  <div>
                    <p className="leading-relaxed text-muted-foreground">{s.descripcion}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.etiquetas.map((e) => (
                        <li
                          key={e}
                          className="rounded-full border border-border px-4 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Método */}
        <section id="metodo" className="bg-background">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Cómo trabajamos.
            </h2>
            <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {pasos.map((p) => (
                <li key={p.numero} className="border-l-2 border-dorado pl-6">
                  <span className="font-display text-3xl italic text-dorado">{p.numero}</span>
                  <h3 className="mt-4 font-display text-xl">{p.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.descripcion}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Testimonio */}
        <section className="bg-ciruela text-ciruela-foreground">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
            <blockquote>
              <p className="font-display text-3xl italic leading-snug sm:text-4xl">
                “Llegamos con mucho contenido y pocas ventas. Seis meses después sabemos
                exactamente qué decir y a quién, y se nota en la facturación.”
              </p>
              <footer className="mt-8 text-sm font-medium tracking-wide text-dorado">
                Laura Pinzón, fundadora de Casa Lino
              </footer>
            </blockquote>
          </div>
        </section>

        {/* 7. Contacto */}
        <section id="contacto" className="bg-background">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32 lg:gap-20">
            <div>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Cuéntame sobre tu marca.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                Respondo en menos de 48 horas para agendar una primera llamada de 30
                minutos, sin costo.
              </p>
              <a
                href="mailto:hola@auroramanrique.com"
                className="mt-6 inline-block font-medium text-foreground underline decoration-dorado decoration-2 underline-offset-4"
              >
                hola@auroramanrique.com
              </a>
            </div>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errores.nombre)}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm"
                />
                {errores.nombre && (
                  <p role="alert" className="mt-2 text-sm text-destructive">
                    {errores.nombre}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="correo" className="mb-2 block text-sm font-medium">
                  Correo
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errores.correo)}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm"
                />
                {errores.correo && (
                  <p role="alert" className="mt-2 text-sm text-destructive">
                    {errores.correo}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="necesidad" className="mb-2 block text-sm font-medium">
                  ¿Qué necesitas?
                </label>
                <select
                  id="necesidad"
                  name="necesidad"
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm"
                >
                  <option>Estrategia de marca</option>
                  <option>Contenido y redes</option>
                  <option>Campañas y email</option>
                  <option>Aún no lo sé</option>
                </select>
              </div>
              <div>
                <label htmlFor="mensaje" className="mb-2 block text-sm font-medium">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-dorado px-8 py-3 text-sm font-semibold text-dorado-foreground transition-opacity hover:opacity-90"
              >
                Enviar mensaje
              </button>
              {enviado && (
                <p role="status" className="text-sm font-medium text-foreground">
                  Mensaje enviado. Te escribo pronto para agendar la llamada.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="bg-ciruela text-ciruela-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-ciruela-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Aurora Manrique</p>
          <p>Bogotá, Colombia · Trabajo con marcas de toda Latinoamérica</p>
        </div>
      </footer>
    </div>
  );
}
