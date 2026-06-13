import { Play } from "lucide-react";

export interface Album {
  title: string;
  subtitle: string;
  cover: string;
}

interface Props {
  albums: Album[];
  onOpen: (index: number) => void;
}

export function AlbumGrid({ albums, onOpen }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {albums.map((a, i) => (
        <li key={a.title}>
          <button
            onClick={() => onOpen(i)}
            className="group relative block w-full overflow-hidden rounded-2xl bg-card text-left shadow-card-soft transition active:scale-[0.98]"
          >
            <div className="aspect-[3/4] w-full">
              <img src={a.cover} alt={a.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-background backdrop-blur">
              <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="line-clamp-1 font-display text-base text-white">{a.title}</p>
              <p className="text-[11px] text-white/70">{a.subtitle}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
