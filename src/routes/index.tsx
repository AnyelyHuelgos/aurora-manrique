import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Header } from "@/components/site/Header";
import { CountUp, Reveal } from "@/components/site/motion";

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

const cifras = [
  { valor: 10, sufijo: "", etiqueta: "años en marketing" },
  { valor: 60, sufijo: "+", etiqueta: "marcas acompañadas" },
  { valor: 3, sufijo: "×", etiqueta: "retorno promedio en campañas" },
];

const problemas = [
  "Publicas constantemente, pero no sabes qué está generando ventas.",
  "Inviertes en publicidad sin tener claro qué mensaje funciona.",
  "Cada mes aparece una nueva idea, pero no existe una estrategia que las conecte.",
  "Tu producto es bueno, pero comunicar su valor sigue siendo difícil.",
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
      <Header />

      <main>
        {/* Hero */}
        <section id="inicio" className="bg-background">
          <div className="mx-auto grid min-h-[calc(100svh-80px)] max-w-7xl items-center gap-10 px-6 pb-16 pt-6 md:grid-cols-[1.15fr_1fr] md:gap-16 md:pb-24 md:pt-12">
            <div className="order-2 md:order-1">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-dorado">
                Consultoría de marketing · Latinoamérica
              </p>
              <h1 className="animate-hero-rise mt-6 font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
                Tu marca ya tiene algo bueno.
                <span className="mt-2 block italic text-muted-foreground">
                  Hagamos que más personas lo elijan.
                </span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Diseño estrategias de marketing para marcas que quieren dejar de improvisar y
                empezar a crecer con claridad.
              </p>
              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href="#contacto"
                  className="w-full rounded-full bg-dorado px-8 py-4 text-center text-sm font-semibold text-dorado-foreground transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Agenda una llamada
                </a>
                <a
                  href="#metodo"
                  className="text-center text-sm font-medium underline decoration-dorado decoration-1 underline-offset-8 hover:decoration-2"
                >
                  Conoce cómo trabajo ↓
                </a>
              </div>
              <p className="mt-12 border-t border-border pt-6 text-xs tracking-wide text-muted-foreground">
                10 años de experiencia · +60 marcas acompañadas · Estrategia, contenido y performance
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/images/aurora-hero.png"
                alt="Aurora Manrique, consultora de marketing, con los brazos cruzados"
                className="mx-auto max-h-[52svh] w-full rounded-t-full bg-niebla object-cover object-top md:max-h-none"
              />
            </div>
          </div>
        </section>

        {/* Problema */}
        <section className="bg-ciruela text-ciruela-foreground">
          <Reveal className="mx-auto max-w-7xl px-6 py-24 md:py-36">
            <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
              ¿Tu marketing se siente más ocupado que efectivo?
            </h2>
            <ol className="mt-16 grid md:grid-cols-2">
              {problemas.map((t, i) => (
                <li key={t} className="flex gap-6 border-t border-ciruela-foreground/15 py-8 md:pr-12">
                  <span className="font-display text-xl italic text-dorado">0{i + 1}</span>
                  <p className="text-lg leading-relaxed text-ciruela-foreground/85">{t}</p>
                </li>
              ))}
            </ol>
            <p className="mt-16 max-w-3xl font-display text-2xl italic leading-snug text-dorado sm:text-4xl">
              El problema muchas veces no es hacer poco marketing. Es hacer marketing sin dirección.
            </p>
          </Reveal>
        </section>

        {/* Sobre mí */}
        <section id="sobre-mi" className="scroll-mt-20 bg-background">
          <Reveal className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.1fr] md:items-center md:py-36 lg:gap-24">
            <img
              src="/images/aurora-about.png"
              alt="Aurora Manrique pensativa, con la mano en el mentón"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-dorado">Sobre mí</p>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-6xl">
                Estrategia clara antes que publicaciones bonitas.
              </h2>
              <p className="mt-10 text-lg leading-relaxed text-muted-foreground">
                Durante diez años he acompañado a marcas de moda, bienestar y servicios
                profesionales a ordenar su comunicación. Empiezo por entender a quién le
                venden y por qué los eligen; después decidimos qué decir, dónde y con qué
                presupuesto.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Trabajo con pocas marcas a la vez para estar presente en cada decisión.
              </p>
            </div>
          </Reveal>
          <Reveal className="mx-auto max-w-7xl px-6 pb-24 md:pb-36">
            <dl className="grid gap-12 border-t border-border pt-14 sm:grid-cols-3">
              {cifras.map((c) => (
                <div key={c.etiqueta}>
                  <dt className="sr-only">{c.etiqueta}</dt>
                  <dd>
                    <span className="block font-display text-7xl leading-none lg:text-8xl">
                      <CountUp to={c.valor} suffix={c.sufijo} />
                    </span>
                    <span className="mt-4 block text-sm text-muted-foreground">{c.etiqueta}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-12 text-xs text-muted-foreground">
              Cifras ilustrativas de un caso conceptual de portafolio.
            </p>
          </Reveal>
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
