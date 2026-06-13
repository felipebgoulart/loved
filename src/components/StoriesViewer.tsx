import { useEffect, useRef, useState } from "react";
import { X, Volume2, VolumeX } from "lucide-react";

export interface Story {
  image: string;
  title: string;
  description?: string;
  duration?: number; // ms
  fontFamily?: string; // Adicionado suporte para fonte personalizada
}

interface Props {
  stories: Story[];
  open: boolean;
  onClose: () => void;
  startIndex?: number;
}

const DEFAULT_DURATION = 5000;

export function StoriesViewer({ stories, open, onClose, startIndex = 0 }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  useEffect(() => {
    if (open) {
      // Garante que o index nunca seja maior que o tamanho da lista atual
      const safeIndex = startIndex < stories.length ? startIndex : 0;
      setIndex(safeIndex);
      setProgress(0);
      elapsedRef.current = 0;
    }
  }, [open, startIndex, stories.length]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keyboard nav
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  // Progress timer
  useEffect(() => {
    if (!open) return;
    const duration = stories[index]?.duration ?? DEFAULT_DURATION;
    elapsedRef.current = 0;
    setProgress(0);
    startRef.current = performance.now();

    const tick = (t: number) => {
      if (paused) {
        startRef.current = t - elapsedRef.current;
      } else {
        elapsedRef.current = t - startRef.current;
        const p = Math.min(1, elapsedRef.current / duration);
        setProgress(p);
        if (p >= 1) {
          next();
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, open, paused]);

  const next = () => {
    if (index < stories.length - 1) setIndex((i) => i + 1);
    else onClose();
  };
  const prev = () => {
    if (index > 0) setIndex((i) => i - 1);
    else setProgress(0);
  };

  if (!open) return null;
  
  const story = stories[index];
  
  // TRAVA DE SEGURANÇA: Se a história não existir (índice quebrado), não quebra a tela
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-black">
      <div className="relative mx-auto flex h-full w-full max-w-md flex-col">
        {/* Background image */}
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Top + bottom gradients for legibility */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Progress bars */}
        <div className="relative z-10 flex gap-1 px-3 pt-3">
          {stories.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full bg-white transition-[width] duration-100"
                style={{
                  width: `${i < index ? 100 : i === index ? progress * 100 : 0}%`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-4 pt-3">
          <div className="text-xs font-medium text-white/90">
            {index + 1} / {stories.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMuted((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-white/90 hover:bg-white/10"
              aria-label="Som"
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full text-white/90 hover:bg-white/10"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title block - Agora aplica a fonte dinamicamente se existir */}
        <div 
          className="relative z-10 px-6 pt-6 text-center"
          style={story.fontFamily ? { fontFamily: story.fontFamily } : undefined}
        >
          <h2 className="font-display text-2xl text-white text-balance">{story.title}</h2>
          {story.description && (
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/85 text-balance">
              {story.description}
            </p>
          )}
        </div>

        {/* Tap zones */}
        <button
          aria-label="Anterior"
          onClick={prev}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
          className="absolute inset-y-0 left-0 z-20 w-1/3"
        />
        <button
          aria-label="Próximo"
          onClick={next}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
          className="absolute inset-y-0 right-0 z-20 w-1/3"
        />
      </div>
    </div>
  );
}