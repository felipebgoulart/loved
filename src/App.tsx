import { useState } from 'react'
import './App.css'
import { MusicPlayer } from './components/MusicPlayer'
import { CountdownCard } from './components/CountdownCard'
import { MessageCard } from './components/MessageCard'
import { AlbumGrid, type Album } from './components/AlbumGrid'
import { StoriesViewer, type Story } from './components/StoriesViewer'

import heroCouple from "./assets/hero-couple.jpg";
import song from "./music/song.mp3";
import g1 from "./assets/gallery-1.jpg";
import g2 from "./assets/gallery-2.jpg";
import g3 from "./assets/gallery-3.jpg";
import g4 from "./assets/gallery-4.jpg";
import g5 from "./assets/gallery-5.jpg";

import noite from "./assets/noite.jpg";
import eat from "./assets/eat.jpg";
import fondue from "./assets/fondue.jpg";
import umbrella from "./assets/umbrella.jpg";

import foto1 from "./assets/foto-1.jpg";
import foto2 from "./assets/foto-2.jpg";
import foto3 from "./assets/foto-3.jpg";
import foto4 from "./assets/foto-4.jpg";
import foto5 from "./assets/foto-5.jpg";
import foto6 from "./assets/foto-6.jpg";
import foto7 from "./assets/foto-7.jpg";
import foto8 from "./assets/foto-8.jpg";
import foto9 from "./assets/foto-9.jpg";
import foto10 from "./assets/foto-10.jpg";
import foto11 from "./assets/foto-11.jpg";

import hands from "./assets/hands.jpg";
import lua from "./assets/lua.jpg";
import { JourneyTimeline, type JourneyItem } from './components/JourneyTimeline'
import { Bookmark, ChevronLeft, Home, LayoutGrid, MoreHorizontal, Search } from 'lucide-react'
import { WrappedCard } from './components/WrappedCard'

const albums: Album[] = [
  { title: "Nós dois", subtitle: "1 ano juntos", cover: g3 },
  { title: "Campos", subtitle: "Campos do Jordão", cover: g4 },
  { title: "Datas especiais", subtitle: "momentos únicos", cover: g5 },
  { title: "Momentos", subtitle: "pequenos detalhes", cover: foto10 },
];


const albumStories: Story[][] = [
  [
    { image: g1, title: "Primeiro encontro", description: "No nosso primeiro encontro." },
    { image: g2, title: "Aquele dia no parque", description: "Visita no Ibirapuera." },
    { image: g3, title: "No Lolapalooza", description: "Lolapalooza 2025." },
    { image: g4, title: "Campos do Jordão", description: "Nossa viagem a campos." },
  ],
  [
    { image: noite, title: "Campos do Jordão", description: "Onde tudo virou história pra contar." },
    { image: fondue, title: "Fondue", description: "Uma noite especial com sabor." },
    { image: eat, title: "Jantar romântico", description: "Um jantar inesquecível." },
    { image: umbrella, title: "Sob os guarda-chuvas", description: "Uma lembrança inesquecível." },
  ],
  [
    { image: foto1, title: "Nossos rostos", description: "Nossos rostos, nossos momentos." },
    { image: foto2, title: "Caretas", description: "Risos e momentos inesquecíveis." },
    { image: foto3, title: "Aniversário", description: "Celebrando mais um ano seu." },
    { image: foto4, title: "Aniversário", description: "Celebrando mais um ano meu." },
    { image: foto5, title: "Noivado", description: "Promessa feita, anel no dedo, vida toda pela frente." },
    { image: foto8, title: "Casados", description: "Promessa cumprida." },
  ],
  [
    { image: foto6, title: "Parque", description: "Parque no Lolapalooza." },
    { image: foto7, title: "Praia", description: "Uma tarde de sol e mar." },
    { image: foto9, title: "Ar puro", description: "O ar puro da natureza." },
    { image: foto10, title: "Aleatória", description: "Um momento inesperado." },
    { image: foto11, title: "Mini golf", description: "Uma atividade divertida que fizemos juntos." },
  ],
];

const journey: JourneyItem[] = [
  { date: "Mar 2024", title: "Nosso primeiro encontro", description: "Fomos ao Brandan House.", image: g1, caption: "Onde tudo começou" },
  { date: "Jun 2024", title: "Uma das nossas primeiras viagens", description: "Saimos para São Paulo.", image: hands, caption: "Topo da montanha" },
  { date: "Mar 2025", title: "Primeiro Evento", description: "Nosso primeiro evento juntos.", image: g3, caption: "Lolapalooza 2025" },
  { date: "Mar 2026", title: "Casamento", description: "Nosso casamento.", image: foto8, caption: "Pra sempre" },
  { date: "Abr 2026", title: "Lua de mel", description: "Nossa lua de mel.", image: lua, caption: "Pra sempre" },
];


function App() {
  const [storiesOpen, setStoriesOpen] = useState(false);
  const [activeStories, setActiveStories] = useState<Story[]>([]);

  const openAlbum = (i: number) => {
    setActiveStories(albumStories[i]);
    setStoriesOpen(true);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-md pb-28">
      {/* Top bar */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 backdrop-blur-xl"
        style={{ background: "color-mix(in oklab, var(--background) 75%, transparent)" }}
      >
        <button className="grid h-9 w-9 place-items-center rounded-full text-foreground/80 hover:bg-white/10" aria-label="Voltar">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="truncate text-sm font-semibold text-foreground">
          Eu te amo mais que tudo! <span aria-hidden>❤️🥰</span>
        </h1>
        <button className="grid h-9 w-9 place-items-center rounded-full text-foreground/80 hover:bg-white/10" aria-label="Mais opções">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </header>

      {/* Story rings (Instagram-like) */}
      <section className="px-4 pt-3">
        <ul className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {albums.map((a, i) => (
            <li key={a.title}>
              <StoryRing label={a.title} image={a.cover} onClick={() => openAlbum(i)} />
            </li>
          ))}
        </ul>
      </section>

      {/* Player */}
      <section className="pt-4">
        <MusicPlayer title="Só pensando em você" artist="Zeeba" cover={heroCouple} src={song} />
      </section>

      {/* Sobre o casal */}
      <section className="mt-8 px-5">
        <h2 className="mb-3 font-display text-xl text-foreground">Sobre o casal</h2>
        <CountdownCard sinceISO="2023-04-01T00:00:00" photo={g2} name="Felipe e Juliana" sinceLabel="Juntos desde 2024" />
      </section>

      {/* Mensagem especial */}
      <section className="mt-6 px-5">
        <MessageCard message="Você é o amor da minha vida e a pessoa que me faz querer ser melhor a cada novo dia 🥹💙. Obrigado por caminhar do meu lado, por rir comigo nas coisas pequenas e por transformar cada dia comum em algo inesquecível. Eu te amo, hoje, amanhã e sempre." />
      </section>

      {/* Álbuns - opens stories */}
      <section className="mt-8 px-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl text-foreground">Nossos álbuns</h2>
            <p className="text-xs text-foreground/60">Toque para abrir como stories</p>
          </div>
        </div>
        <AlbumGrid albums={albums} onOpen={openAlbum} />
      </section>

      {/* Nossa Jornada */}
      <section className="mt-10 px-5">
        <div className="text-center">
          <h2 className="font-display text-3xl text-foreground">Nossa Jornada</h2>
          <p className="mt-1 text-sm text-foreground/65">Cada momento que nos trouxe até aqui</p>
        </div>
        <div className="mt-6">
          <JourneyTimeline items={journey} />
        </div>
      </section>

      {/* Wrapped */}
      <section className="mt-10 px-5">
        <WrappedCard
          stats={[
            { label: "Dias juntos", value: "1.168" },
            { label: "Música", value: "Só pensando em você" },
            { label: "Mensagens trocadas", value: "∞" },
            { label: "Encontros", value: "∞" },
          ]}
        />
      </section>

      {/* Bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-white/10 backdrop-blur-xl"
        style={{ background: "color-mix(in oklab, var(--background) 85%, transparent)" }}
      >
        <ul className="grid grid-cols-5 px-2 py-2 text-foreground/70">
          {[Home, Bookmark, Search, LayoutGrid, MoreHorizontal].map((Icon, i) => (
            <li key={i} className="flex justify-center">
              <button className={`grid h-11 w-11 place-items-center rounded-xl ${i === 0 ? "text-foreground" : ""}`} aria-label={`Nav ${i}`}>
                <Icon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Stories overlay */}
      <StoriesViewer stories={activeStories} open={storiesOpen} onClose={() => setStoriesOpen(false)} />
    </main>
  )
}

function StoryRing({
  label,
  image,
  highlight,
  onClick,
}: {
  label: string;
  image: string;
  highlight?: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="flex w-16 flex-col items-center gap-1.5">
      {/* Anel externo (Gradiente ou cor sólida) */}
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full p-[2px] ${
          highlight
            ? "bg-gradient-to-tr from-primary via-accent to-foreground"
            : "bg-white/20"
        }`}
      >
        {/* Anel interno: usa border em vez de padding e 'overflow-hidden' para não deixar a foto vazar */}
        <div className="h-full w-full overflow-hidden rounded-full border-[2px] border-background bg-background">
          <img 
            src={image} 
            alt={label} 
            className="h-full w-full object-cover" 
          />
        </div>
      </div>
      <span className="line-clamp-1 text-[10px] text-foreground/80">{label}</span>
    </button>
  );
}

export default App
