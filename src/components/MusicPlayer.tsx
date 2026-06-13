import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, CheckCircle2 } from "lucide-react";

interface Props {
  title: string;
  artist: string;
  cover: string;
  src?: string;
}

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function MusicPlayer({ title, artist, cover, src }: Props) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onT = () => setCur(a.currentTime);
    const onM = () => setDur(a.duration);
    const onE = () => setPlaying(false);
    a.addEventListener("timeupdate", onT);
    a.addEventListener("loadedmetadata", onM);
    a.addEventListener("ended", onE);
    return () => {
      a.removeEventListener("timeupdate", onT);
      a.removeEventListener("loadedmetadata", onM);
      a.removeEventListener("ended", onE);
    };
  }, []);

  const toggle = async () => {
    const a = ref.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { try { await a.play(); setPlaying(true); } catch { setPlaying(false); } }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = ref.current;
    if (!a || !dur) return;
    const t = (Number(e.target.value) / 100) * dur;
    a.currentTime = t;
    setCur(t);
  };

  const progress = dur ? (cur / dur) * 100 : 0;

  return (
    <div className="px-5">
      {/* Cover */}
      <div className="overflow-hidden rounded-2xl shadow-card-soft">
        <div className="aspect-[4/5] w-full">
          <img
            src={cover}
            alt={title}
            width={896}
            height={1120}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Title + verified */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-display text-2xl text-foreground">{title}</h2>
          <p className="truncate text-sm text-foreground/60">{artist}</p>
        </div>
        <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" fill="currentColor" stroke="var(--background)" strokeWidth={2} />
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full bg-foreground transition-[width]" style={{ width: `${progress}%` }} />
          <input
            type="range" min={0} max={100} value={progress} onChange={seek}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Progresso"
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-foreground/60">
          <span>{fmt(cur)}</span>
          <span>{fmt(dur)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-between">
        <button className="grid h-10 w-10 place-items-center text-foreground/70 transition hover:text-foreground" aria-label="Shuffle">
          <Shuffle className="h-5 w-5" />
        </button>
        <button
          onClick={() => { const a = ref.current; if (a) a.currentTime = 0; }}
          className="grid h-11 w-11 place-items-center text-foreground/80 transition hover:text-foreground"
          aria-label="Anterior"
        >
          <SkipBack className="h-7 w-7" fill="currentColor" />
        </button>
        <button
          onClick={toggle}
          className="grid h-16 w-16 place-items-center rounded-full bg-foreground text-background shadow-button-glow transition active:scale-95"
          aria-label={playing ? "Pausar" : "Tocar"}
        >
          {playing ? <Pause className="h-7 w-7" fill="currentColor" /> : <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />}
        </button>
        <button className="grid h-11 w-11 place-items-center text-foreground/80 transition hover:text-foreground" aria-label="Próxima">
          <SkipForward className="h-7 w-7" fill="currentColor" />
        </button>
        <button className="grid h-10 w-10 place-items-center text-foreground/70 transition hover:text-foreground" aria-label="Repeat">
          <Repeat className="h-5 w-5" />
        </button>
      </div>

      <audio ref={ref} src={src} preload="metadata" />
    </div>
  );
}