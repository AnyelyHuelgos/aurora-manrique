import { useEffect, useState } from "react";

const links = [
  ["Sobre mí", "#sobre-mi"],
  ["Servicios", "#servicios"],
  ["Casos", "#casos"],
  ["Método", "#metodo"],
  ["Contacto", "#contacto"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-30 transition-colors duration-300 ${
        solid ? "border-b border-border bg-background" : "border-b border-transparent bg-background/0"
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#inicio" className="font-display text-xl tracking-tight">
          Aurora Manrique
        </a>
        <div className="hidden items-center gap-9 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-dorado hover:text-dorado-foreground"
          >
            Agenda una llamada
          </a>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-6 pb-8 lg:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-display text-2xl"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-dorado py-3.5 text-center text-sm font-semibold text-dorado-foreground"
          >
            Agenda una llamada
          </a>
        </div>
      )}
    </header>
  );
}
