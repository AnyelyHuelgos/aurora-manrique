import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";
import { sendChatMessage, type ChatMessage } from "@/lib/chat";

const bienvenida: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hola, soy el asistente de Aurora. ¿Qué te gustaría mejorar en el marketing de tu marca?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([bienvenida]);
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  // Accesibilidad: al abrir, el foco va al campo de texto; al cerrar, vuelve al botón del chat.
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Escape cierra el chat.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lleva a la persona al formulario de contacto: cierra el chat, baja a #contacto y enfoca el primer campo.
  function irAContacto() {
    setOpen(false);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), 600);
  }

  const yaConverso = messages.some((m) => m.role === "user");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value || pending) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: value };
    const history = [...messages, userMsg];
    setMessages(history);
    setText("");
    setPending(true);
    try {
      const reply = await sendChatMessage(value, history);
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", text: reply }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Asistente de Aurora"
          className="fixed inset-x-3 bottom-3 top-16 z-50 flex flex-col overflow-hidden rounded-sm border border-border bg-background shadow-2xl md:inset-x-auto md:bottom-24 md:right-6 md:top-auto md:h-[560px] md:w-[380px]"
        >
          <div className="flex items-start justify-between gap-4 bg-ciruela px-5 py-4 text-ciruela-foreground">
            <div>
              <p className="font-display text-lg">Asistente de Aurora</p>
              <p className="mt-1 text-[11px] leading-snug text-ciruela-foreground/70">
                Asistente automático con IA. Puede equivocarse. No compartas datos sensibles.{" "}
                <a href="/privacidad" target="_blank" rel="noopener" className="underline underline-offset-2">
                  Privacidad
                </a>
              </p>
            </div>
            <button type="button" aria-label="Cerrar chat" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
            {messages.map((m) => (
              <p
                key={m.id}
                className={`whitespace-pre-wrap break-words text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-sm bg-ciruela px-4 py-2.5 text-ciruela-foreground"
                    : "max-w-[90%] text-foreground"
                }`}
              >
                {m.text}
              </p>
            ))}
            {pending && <p className="text-sm text-muted-foreground">Escribiendo…</p>}
          </div>
          {yaConverso && (
            <div className="flex items-center justify-between gap-3 border-t border-border bg-niebla px-4 py-2.5">
              <p className="text-xs text-muted-foreground">Llamada de 30 minutos, sin costo.</p>
              <button
                type="button"
                onClick={irAContacto}
                className="shrink-0 rounded-full border border-ciruela px-4 py-1.5 text-xs font-semibold text-ciruela transition-colors hover:bg-ciruela hover:text-ciruela-foreground"
              >
                Agendar llamada →
              </button>
            </div>
          )}
          <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-border p-3">
            <label htmlFor="chat-input" className="sr-only">
              Tu mensaje
            </label>
            <textarea
              ref={inputRef}
              id="chat-input"
              rows={2}
              maxLength={2000}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Escribe tu mensaje…"
              className="min-w-0 flex-1 resize-none rounded-sm border border-input bg-card px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={!text.trim() || pending}
              className="rounded-full bg-dorado px-5 py-2.5 text-sm font-semibold text-dorado-foreground disabled:opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? "Cerrar chat" : "Abrir chat con el asistente"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-24 right-4 z-50 h-14 w-14 items-center justify-center rounded-full bg-ciruela text-ciruela-foreground shadow-lg transition-transform hover:scale-105 md:bottom-6 md:right-6 ${
          open ? "hidden md:flex" : "flex"
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
