import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

// Debe coincidir con CONSENT_VERSION en src/routes/api/leads.ts: es la versión que se guarda con cada contacto.
const VERSION = "politica-2026-10";
const ACTUALIZADA = "8 de octubre de 2026";
const CORREO = "hola@auroramanrique.com";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — Aurora Manrique" },
      {
        name: "description",
        content:
          "Cómo se recogen, usan y protegen los datos personales en el sitio de Aurora Manrique, conforme a la Ley 1581 de 2012 de Colombia.",
      },
      { property: "og:title", content: "Política de privacidad — Aurora Manrique" },
      { property: "og:url", content: "https://aurora-manrique.vercel.app/privacidad" },
    ],
  }),
  component: Privacidad,
});

function Seccion({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="font-display text-2xl leading-snug sm:text-3xl">{titulo}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function Privacidad() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-xl tracking-tight">
            Aurora Manrique
          </Link>
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-dorado">Información legal</p>
        <h1 className="mt-6 font-display text-4xl leading-tight sm:text-6xl">Política de privacidad</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Última actualización: {ACTUALIZADA} · Versión {VERSION}
        </p>

        <div className="mt-10 rounded-sm border border-border bg-niebla p-5 text-sm leading-relaxed">
          Este sitio es un proyecto de portafolio y Aurora Manrique es una marca conceptual. Aun así, el formulario y el
          asistente funcionan de verdad, así que esta política describe con exactitud qué pasa con los datos que se
          envían a través de ellos.
        </div>

        <div className="mt-14 space-y-12">
          <Seccion titulo="1. Quién es la responsable">
            <p>
              Aurora Manrique, consultora de marketing con domicilio en Bogotá, Colombia, es la responsable del
              tratamiento de los datos personales recogidos en este sitio. Para cualquier asunto relacionado con tus
              datos puedes escribir a{" "}
              <a href={`mailto:${CORREO}`} className="text-foreground underline underline-offset-4">
                {CORREO}
              </a>
              .
            </p>
            <p>
              Esta política se rige por la Ley 1581 de 2012 de protección de datos personales de Colombia y el Decreto
              1377 de 2013.
            </p>
          </Seccion>

          <Seccion titulo="2. Qué datos se recogen">
            <p>
              <strong className="font-semibold text-foreground">Formulario de contacto.</strong> Nombre, nombre de tu
              marca o empresa, correo electrónico, web o Instagram (opcional), qué necesitas mejorar, la etapa de tu
              negocio y tu principal reto. También se guarda la fecha en que aceptaste esta política y la versión que
              aceptaste.
            </p>
            <p>
              <strong className="font-semibold text-foreground">Asistente de IA.</strong> Los mensajes que escribes en
              el chat se envían al proveedor de inteligencia artificial para generar las respuestas. Este sitio{" "}
              <strong className="font-semibold text-foreground">no guarda el contenido de las conversaciones</strong>{" "}
              en su base de datos.
            </p>
            <p>
              <strong className="font-semibold text-foreground">Datos técnicos.</strong> Para evitar abusos del chat,
              se cuenta cuántos mensajes envía cada visitante. Para eso se usa tu dirección IP convertida en un código
              cifrado e irreversible: la IP nunca se guarda tal cual. Ese contador se borra automáticamente en un
              máximo de dos días.
            </p>
            <p>
              No se recogen datos sensibles (de salud, origen, creencias, biometría ni datos financieros). Por favor,
              no los escribas en el formulario ni en el chat.
            </p>
          </Seccion>

          <Seccion titulo="3. Para qué se usan">
            <p>
              Los datos del formulario se usan únicamente para responder tu solicitud, agendar la llamada de
              diagnóstico y, si decides trabajar con Aurora, preparar una propuesta. No se usan para enviarte
              publicidad ni boletines sin que lo pidas, y no se venden ni se ceden a terceros.
            </p>
            <p>
              Los mensajes del chat se usan solo para darte una respuesta en ese momento. Las respuestas del asistente
              son orientativas: no constituyen una oferta, un precio final ni una promesa de resultados.
            </p>
          </Seccion>

          <Seccion titulo="4. Quién procesa los datos">
            <p>Para que el sitio funcione se usan estos proveedores, que procesan datos por cuenta de la responsable:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="font-semibold text-foreground">Vercel</strong>, que aloja el sitio y ejecuta el
                servidor.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Supabase</strong>, la base de datos donde se guardan
                los datos del formulario.
              </li>
              <li>
                <strong className="font-semibold text-foreground">OpenRouter</strong> y los proveedores de los modelos
                de IA a los que da acceso, que reciben los mensajes del chat. El asistente usa modelos gratuitos, cuyos
                proveedores pueden registrar los mensajes y las respuestas según sus propias políticas.
              </li>
            </ul>
            <p>
              Estos proveedores tienen servidores fuera de Colombia, principalmente en Estados Unidos, por lo que
              enviar el formulario o usar el chat implica una transferencia internacional de datos, que aceptas al dar
              tu autorización.
            </p>
          </Seccion>

          <Seccion titulo="5. Cuánto tiempo se guardan">
            <p>
              Los datos del formulario se conservan hasta 24 meses después del último contacto, o menos si pides que se
              borren. Los contadores técnicos del chat se borran automáticamente en un máximo de dos días.
            </p>
          </Seccion>

          <Seccion titulo="6. Cómo se protegen">
            <p>
              La base de datos está cerrada al público: nadie puede leerla ni escribir en ella desde el navegador, solo
              el servidor del sitio, con una llave secreta que nunca sale de él. Toda la comunicación viaja cifrada por
              HTTPS. Los registros técnicos del servidor guardan qué pasó (por ejemplo, un código de error), nunca el
              contenido de tus mensajes ni tus datos.
            </p>
          </Seccion>

          <Seccion titulo="7. Tus derechos">
            <p>Como titular de tus datos tienes derecho a:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Conocer, actualizar y rectificar tus datos.</li>
              <li>Pedir una prueba de la autorización que diste.</li>
              <li>Saber cómo se han usado tus datos.</li>
              <li>Revocar tu autorización y pedir que se borren tus datos.</li>
              <li>Acceder gratis a tus datos.</li>
              <li>
                Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) si consideras que no se
                respetaron tus derechos.
              </li>
            </ul>
          </Seccion>

          <Seccion titulo="8. Cómo ejercerlos">
            <p>
              Escribe a{" "}
              <a href={`mailto:${CORREO}`} className="text-foreground underline underline-offset-4">
                {CORREO}
              </a>{" "}
              con el asunto "Datos personales", indicando tu nombre, el correo con el que enviaste el formulario y qué
              quieres hacer.
            </p>
            <p>
              Las consultas se responden en un máximo de 10 días hábiles y los reclamos (por ejemplo, una corrección o
              un borrado) en un máximo de 15 días hábiles, como establece la ley.
            </p>
          </Seccion>

          <Seccion titulo="9. Cookies y almacenamiento en el navegador">
            <p>
              Este sitio no usa cookies de publicidad ni de seguimiento. El chat guarda en tu navegador, solo mientras
              la pestaña está abierta, un número de sesión anónimo para mantener la conversación. No contiene datos
              personales y desaparece al cerrar la pestaña.
            </p>
          </Seccion>

          <Seccion titulo="10. Menores de edad">
            <p>
              Los servicios de este sitio están dirigidos a marcas y profesionales. No se recogen a sabiendas datos de
              menores de 18 años.
            </p>
          </Seccion>

          <Seccion titulo="11. Cambios a esta política">
            <p>
              Si esta política cambia, se publicará aquí con una nueva fecha y número de versión. Cada contacto queda
              guardado con la versión que aceptó en su momento.
            </p>
          </Seccion>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <Link
            to="/"
            hash="contacto"
            className="inline-block rounded-full bg-dorado px-8 py-4 text-sm font-semibold text-dorado-foreground transition-opacity hover:opacity-90"
          >
            Volver al formulario →
          </Link>
        </div>
      </main>

      <footer className="bg-ciruela text-ciruela-foreground">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-xs text-ciruela-foreground/60 sm:flex-row sm:justify-between">
          <p>© 2026 Aurora Manrique</p>
          <p>Proyecto de portafolio · Marca y casos conceptuales.</p>
        </div>
      </footer>
    </div>
  );
}
