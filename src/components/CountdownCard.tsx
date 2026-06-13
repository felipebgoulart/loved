import { useEffect, useState } from "react";

interface Props {
  sinceISO: string;
  photo: string;
  name: string;
  sinceLabel: string;
}

function diff(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();
  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prev = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += prev; months--;
  }
  if (months < 0) { months += 12; years--; }
  return { years, months, days, hours, minutes, seconds };
}

const Stat = ({ value, label }: { value: number; label: string }) => (
  <div className="rounded-2xl bg-white/8 px-3 py-4 text-center">
    <div className="font-display text-3xl tabular-nums text-foreground">
      {value.toString().padStart(value > 99 ? 3 : 2, "0")}
    </div>
    <div className="mt-0.5 text-[11px] text-foreground/60">{label}</div>
  </div>
);

export function CountdownCard({ sinceISO, photo, name, sinceLabel }: Props) {
  const start = new Date(sinceISO);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const d = diff(start, now);

  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-card-soft">
      <div className="aspect-[16/10] w-full">
        <img
          src={photo}
          alt={name}
          width={800}
          height={500}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl text-foreground">{name}</h3>
        <p className="mt-0.5 text-sm text-primary">{sinceLabel}</p>

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <Stat value={d.years} label="Anos" />
          <Stat value={d.months} label="Meses" />
          <Stat value={d.days} label="Dias" />
          <Stat value={d.hours} label="Horas" />
          <Stat value={d.minutes} label="Minutos" />
          <Stat value={d.seconds} label="Segundos" />
        </div>
      </div>
    </div>
  );
}