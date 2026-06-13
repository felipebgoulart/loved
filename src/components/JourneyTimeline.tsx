import { Heart } from "lucide-react";

export interface JourneyItem {
  date: string;
  title: string;
  description: string;
  image: string;
  caption?: string;
}

export function JourneyTimeline({ items }: { items: JourneyItem[] }) {
  return (
    <div className="relative">
      {/* center vertical line */}
      <div className="absolute left-1/2 top-2 -ml-px h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-primary/60 via-white/15 to-transparent" />

      <ul className="space-y-8">
        {items.map((it, i) => {
          const left = i % 2 === 0;
          return (
            <li key={i} className="relative grid grid-cols-2 items-center gap-4">
              {/* Heart node */}
              <span className="absolute left-1/2 top-6 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-button-glow">
                <Heart className="h-2.5 w-2.5" fill="currentColor" />
              </span>

              {/* Photo / Text positioned alternately */}
              {left ? (
                <>
                  <PolaroidCard image={it.image} caption={it.caption} rotate={-4} />
                  <TextBlock date={it.date} title={it.title} description={it.description} />
                </>
              ) : (
                <>
                  <TextBlock date={it.date} title={it.title} description={it.description} align="right" />
                  <PolaroidCard image={it.image} caption={it.caption} rotate={3} />
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PolaroidCard({
  image,
  caption,
  rotate = 0,
}: {
  image: string;
  caption?: string;
  rotate?: number;
}) {
  return (
    <div
      className="rounded-md bg-[#f4ecd8] p-2 pb-6 shadow-card-soft"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="aspect-square w-full overflow-hidden bg-black/20">
        <img src={image} alt={caption ?? "Polaroid"} loading="lazy" className="h-full w-full object-cover" />
      </div>
      {caption && (
        <p className="mt-2 text-center text-[13px] text-neutral-700" style={{ fontFamily: "'Caveat', cursive" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

function TextBlock({
  date,
  title,
  description,
  align = "left",
}: {
  date: string;
  title: string;
  description: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="font-display text-lg text-primary">{date}</p>
      <p className="mt-1 font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/70">{description}</p>
    </div>
  );
}