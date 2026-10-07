import { useEffect, useState } from "react";

export function MobileCta() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = document.getElementById("contacto");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setHidden(Boolean(e?.isIntersecting)), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : ""
      }`}
      aria-hidden={hidden}
    >
      <a
        href="#contacto"
        tabIndex={hidden ? -1 : 0}
        className="block rounded-full bg-dorado py-3.5 text-center text-sm font-semibold text-dorado-foreground"
      >
        Agenda una llamada
      </a>
    </div>
  );
}
