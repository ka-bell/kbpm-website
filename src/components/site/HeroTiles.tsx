"use client";

const TILES = [
  { src: "/hero/tile-1.png", alt: "Brand mark" },
  { src: "/hero/tile-2.png", alt: "K" },
  { src: "/hero/tile-3.png", alt: "B" },
  { src: "/hero/tile-4.png", alt: "Plus" },
  { src: "/hero/tile-5.png", alt: "P" },
  { src: "/hero/tile-6.png", alt: "M" },
  { src: "/hero/tile-7.png", alt: "Brand mark" },
] as const;

function Tile({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-square overflow-hidden bg-[#1e1e1e] ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={200}
        height={200}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}

/**
 * Figma hero strip — brand tiles.
 * Mobile: continuous L→R marquee. sm+: static grid.
 */
export function HeroTiles() {
  const loop = [...TILES, ...TILES];

  return (
    <>
      {/* Mobile — tiles drift left → right across the hero */}
      <div className="relative -mx-5 overflow-hidden sm:hidden" aria-hidden>
        <div className="kbpm-hero-tiles-track flex w-max gap-[5px] will-change-transform">
          {loop.map((tile, i) => (
            <Tile
              key={`${tile.src}-${i}`}
              src={tile.src}
              alt=""
              className="size-[5.25rem] shrink-0"
            />
          ))}
        </div>
      </div>

      {/* sm+ — static responsive grid */}
      <div className="hidden grid-cols-4 gap-[5px] sm:grid lg:grid-cols-7">
        {TILES.map((tile) => (
          <Tile key={tile.src} src={tile.src} alt={tile.alt} className="w-full" />
        ))}
      </div>
    </>
  );
}
