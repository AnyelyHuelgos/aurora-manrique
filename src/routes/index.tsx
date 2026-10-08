import { createFileRoute } from "@tanstack/react-router";
import { Contacto } from "@/components/site/Contacto";
import { ChatWidget } from "@/components/site/ChatWidget";
import { MobileCta } from "@/components/site/MobileCta";
import { Header } from "@/components/site/Header";
import { CountUp, Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurora Manrique — Consultora de marketing en Bogotá y Latinoamérica" },
      {
        name: "description",
        content:
          "Estrategia de marketing para marcas de moda, bienestar y servicios profesionales que ya tienen algo bueno que vender y quieren crecer con claridad.",
      },
      { property: "og:title", content: "Aurora Manrique — Consultora de marketing en Bogotá y Latinoamérica" },
      {
        property: "og:description",
        content:
          "Estrategia de marketing para marcas de moda, bienestar y servicios profesionales que ya tienen algo bueno que vender y quieren crecer con claridad.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CO" },
      { property: "og:url", content: "https://aurora-manrique.vercel.app/" },
      { property: "og:image", content: "https://aurora-manrique.vercel.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Aurora Manrique — Estrategia clara antes que publicaciones bonitas." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://aurora-manrique.vercel.app/og-image.png" },
    ],
  }),
  component: Index,
});

const servicios = [
  {
    titulo: "Estrategia de marca",
    paraQuien: "Para marcas que necesitan claridad antes de seguir ejecutando.",
    descripcion:
      "Definimos posicionamiento, cliente, mensaje y prioridades para convertir ideas dispersas en un plan concreto.",
    incluye: ["Diagnóstico estratégico", "Cliente ideal", "Propuesta de valor", "Mensajes principales", "Roadmap de seis meses"],
  },
  {
    titulo: "Contenido que tiene una función",
    paraQuien: "Para marcas que publican, pero quieren que su contenido trabaje para el negocio.",
    descripcion:
      "Calendario, guiones y dirección creativa pensados para atraer clientes y no solo seguidores.",
    incluye: ["Estrategia editorial", "Calendario mensual", "Guiones", "Dirección creativa", "Instagram, TikTok y LinkedIn", "Medición"],
  },
  {
    titulo: "Campañas que acompañan la venta",
    paraQuien: "Meta Ads, landing pages y email conectados en un mismo recorrido.",
    descripcion:
      "Lanzamientos y pauta que acompañan a tu cliente desde el primer clic hasta la compra.",
    incluye: ["Estrategia de campaña", "Meta Ads", "Landing pages", "Email marketing", "Optimización y reportes"],
  },
];

const casos = [
  {
    marca: "Casa Lino",
    sector: "Moda",
    cifra: "+42 %",
    detalle: "ventas desde canales digitales · 3,4× ROAS · 6 meses",
    reto: "Mucho contenido, pocas ventas.",
    estrategia: "Mensaje único y campañas conectadas.",
    resultado: "Saber qué decir y a quién.",
    fondo: "bg-niebla",
  },
  {
    marca: "Serena Skin",
    sector: "Bienestar",
    cifra: "2×",
    detalle: "leads calificados en 4 meses",
    reto: "Pauta sin mensaje claro.",
    estrategia: "Propuesta de valor y pauta enfocada.",
    resultado: "Contactos que sí están listos para comprar.",
    fondo: "bg-dorado/10",
  },
];

const pasos = [
  {
    numero: "01",
    titulo: "Entender",
    descripcion:
      "Primero conocemos el negocio: tu marca, tus números y tu competencia, en una sesión de 90 minutos.",
  },
  {
    numero: "02",
    titulo: "Decidir",
    descripcion:
      "Elegimos dónde tiene sentido invertir: objetivos, mensajes y canales según tu presupuesto.",
  },
  {
    numero: "03",
    titulo: "Ejecutar",
    descripcion: "Convertimos la estrategia en contenido y campañas, con revisiones cada semana.",
  },
  {
    numero: "04",
    titulo: "Aprender",
    descripcion:
      "Medimos cada mes y usamos los resultados para decidir el siguiente movimiento.",
  },
];

const siFit = [
  "Tu producto ya está validado.",
  "Quieres una estrategia a medio plazo.",
  "Estás dispuesta a medir resultados.",
  "Buscas acompañamiento estratégico, no solo alguien que publique.",
];

const noFit = [
  "Buscas solo publicaciones económicas.",
  "Necesitas resultados inmediatos sin inversión.",
  "Quieres estar en todas las redes solo porque tu competencia está ahí.",
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
  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground antialiased">
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
                src="/images/aurora-hero-960.webp"
                srcSet="/images/aurora-hero-640.webp 640w, /images/aurora-hero-960.webp 960w"
                sizes="(min-width: 768px) 50vw, 100vw"
                width={960}
                height={1280}
                fetchPriority="high"
                decoding="async"
                alt="Aurora Manrique, consultora de marketing, con los brazos cruzados en su oficina"
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
              src="/images/aurora-about-960.webp"
              srcSet="/images/aurora-about-640.webp 640w, /images/aurora-about-960.webp 960w"
              sizes="(min-width: 768px) 45vw, 100vw"
              width={960}
              height={1200}
              loading="lazy"
              decoding="async"
              alt="Aurora Manrique revisando su tableta en la oficina"
              className="aspect-[4/5] w-full rounded-sm object-cover object-top"
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

        {/* Servicios */}
        <section id="servicios" className="scroll-mt-20 bg-niebla">
          <Reveal className="mx-auto max-w-7xl px-6 py-24 md:py-36">
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">
              Tres formas de trabajar juntas.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Puedes empezar por una sola o combinarlas. Todas incluyen reporte mensual
              con resultados reales.
            </p>
            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {servicios.map((s, i) => (
                <article
                  key={s.titulo}
                  className="flex flex-col rounded-sm border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-dorado hover:shadow-[0_24px_48px_-24px_color-mix(in_oklab,var(--dorado)_35%,transparent)] md:p-10"
                >
                  <span className="font-display text-4xl italic text-dorado">0{i + 1}</span>
                  <h3 className="mt-8 font-display text-3xl leading-tight">{s.titulo}</h3>
                  <p className="mt-4 text-sm font-medium">{s.paraQuien}</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s.descripcion}</p>
                  <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-dorado">Incluye</p>
                  <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                    {s.incluye.map((x) => (
                      <li key={x}>— {x}</li>
                    ))}
                  </ul>
                  <a href="#contacto" className="mt-auto pt-10 text-sm font-semibold hover:text-dorado">
                    Agenda una llamada →
                  </a>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Casos */}
        <section id="casos" className="scroll-mt-20 bg-background">
          <Reveal className="mx-auto max-w-7xl px-6 py-24 md:py-36">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-dorado">Casos conceptuales</p>
            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-6xl">
              Estrategia que se puede medir.
            </h2>
            <p className="mt-4 text-xs text-muted-foreground">
              Casos ilustrativos creados para este portafolio. Las cifras no corresponden a clientes reales.
            </p>
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {casos.map((c) => (
                <article key={c.marca} className={`rounded-sm p-8 md:p-12 ${c.fondo}`}>
                  <p className="text-xs font-medium uppercase tracking-[0.2em]">
                    {c.marca} · <span className="text-muted-foreground">{c.sector}</span>
                  </p>
                  <p className="mt-10 font-display text-7xl leading-none text-dorado lg:text-8xl">{c.cifra}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{c.detalle}</p>
                  <dl className="mt-10 space-y-4 border-t border-border pt-6 text-sm">
                    {([["El reto", c.reto], ["La estrategia", c.estrategia], ["El resultado", c.resultado]] as const).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[8rem_1fr] gap-4">
                        <dt className="font-medium">{k}</dt>
                        <dd className="text-muted-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </Reveal>
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

        {/* 7. Para quién es */}
        <section className="bg-niebla">
          <Reveal className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">¿Trabajamos juntas?</h2>
            <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="font-display text-2xl">Podemos trabajar juntas si…</h3>
                <ul className="mt-8 space-y-5">
                  {siFit.map((t) => (
                    <li key={t} className="flex gap-4 leading-relaxed">
                      <span aria-hidden="true" className="font-semibold text-dorado">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border pt-12 md:border-l md:border-t-0 md:pl-16 md:pt-0">
                <h3 className="font-display text-2xl text-muted-foreground">
                  Probablemente no somos el mejor fit si…
                </h3>
                <ul className="mt-8 space-y-5 text-muted-foreground">
                  {noFit.map((t) => (
                    <li key={t} className="flex gap-4 leading-relaxed">
                      <span aria-hidden="true">—</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <Contacto />
      </main>

      <footer className="bg-ciruela pb-24 text-ciruela-foreground md:pb-0">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <div>
              <p className="font-display text-3xl">Aurora Manrique</p>
              <p className="mt-3 text-sm text-ciruela-foreground/70">
                Bogotá, Colombia · Trabajo con marcas de toda Latinoamérica
              </p>
              <a href="mailto:hola@auroramanrique.com" className="mt-6 inline-block text-sm text-dorado underline-offset-4 hover:underline">
                hola@auroramanrique.com
              </a>
            </div>
            <nav aria-label="Pie de página" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ciruela-foreground/80">
              {[["Sobre mí", "#sobre-mi"], ["Servicios", "#servicios"], ["Casos", "#casos"], ["Método", "#metodo"], ["Contacto", "#contacto"]].map(([l, h]) => (
                <a key={h} href={h} className="hover:text-ciruela-foreground">{l}</a>
              ))}
            </nav>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-ciruela-foreground/15 pt-6 text-xs text-ciruela-foreground/60 sm:flex-row sm:justify-between">
            <p>© 2026 Aurora Manrique</p>
            <a href="/privacidad" className="hover:text-ciruela-foreground">Política de privacidad</a>
            <p>Proyecto de portafolio · Marca y casos conceptuales.</p>
          </div>
        </div>
      </footer>
      <MobileCta />
      <ChatWidget />
    </div>
  );
}
