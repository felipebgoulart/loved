
interface Stat {
  label: string;
  value: string;
}

export function WrappedCard({ stats }: { stats: Stat[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-7" style={{ background: "var(--gradient-wrapped)" }}>
      {/* Wavy ribbon top */}
      <Ribbon className="absolute -top-2 left-1/2 -translate-x-1/2" />

      <div className="relative pt-20 text-center">
        <h3 className="font-display text-4xl leading-tight text-white">
          Feliz Dia dos Namorados, meu amor!
        </h3>
        <p className="mt-3 text-sm text-white/70">Explore o seu tempo em casal</p>
      </div>

      {/* Stats */}
      <div className="relative mt-6 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm">
            <div className="font-display text-2xl text-white">{s.value}</div>
            <div className="mt-0.5 text-[11px] text-white/60">{s.label}</div>
          </div>
        ))}
      </div>

      <Ribbon className="relative mx-auto mt-7" />
    </div>
  );
}

function Ribbon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 80" className={`h-14 w-72 ${className}`} fill="none" aria-hidden>
      <defs>
        <linearGradient id="rb" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ff5b8a" />
          <stop offset="1" stopColor="#ff2a5e" />
        </linearGradient>
      </defs>
      <path
        d="M0 40 C 50 0, 100 80, 160 40 S 270 0, 320 40 L 320 60 C 270 20, 210 100, 160 60 S 50 20, 0 60 Z"
        fill="url(#rb)"
        opacity="0.95"
      />
    </svg>
  );
}
