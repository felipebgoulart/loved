import { useState } from "react";
import { Heart } from "lucide-react";

interface Props {
  message: string;
}

export function MessageCard({ message }: Props) {
  const [open, setOpen] = useState(false);
  const preview = message.slice(0, 120);
  const truncated = message.length > 120;

  return (
    <div className="rounded-3xl bg-message p-5 text-message-foreground shadow-card-soft">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-message-foreground/70">
        <Heart className="h-3.5 w-3.5" fill="currentColor" />
        Mensagem especial
      </div>
      <p className="mt-3 font-display text-2xl leading-snug text-balance">
        {open || !truncated ? message : `${preview}… `}
      </p>
      {truncated && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-4 rounded-full bg-white/40 px-4 py-2 text-sm font-medium text-message-foreground backdrop-blur transition hover:bg-white/60"
        >
          {open ? "Ocultar mensagem" : "Mostrar Mensagem"}
        </button>
      )}
    </div>
  );
}