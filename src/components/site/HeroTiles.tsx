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

/** Mobile Figma 3674:2575 — 2 + 3 tile cluster (K, B / +, P, M) */
const MOBILE_TILES = [
  TILES[1],
  TILES[2],
  TILES[3],
  TILES[4],
  TILES[5],
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
 * Mobile: 2-row cluster (Figma 3674:2575). sm+: full static grid.
 */
export function HeroTiles() {
  return (
    <>
      {/* Mobile — 2 then 3 tiles, left-aligned like Figma */}
      <div className="flex flex-col gap-2.5 sm:hidden" aria-hidden>
        <div className="flex gap-2.5">
          {MOBILE_TILES.slice(0, 2).map((tile) => (
            <Tile
              key={tile.src}
              src={tile.src}
              alt=""
              className="size-[5.6rem] shrink-0"
            />
          ))}
        </div>
        <div className="flex gap-2.5">
          {MOBILE_TILES.slice(2).map((tile) => (
            <Tile
              key={tile.src}
              src={tile.src}
              alt=""
              className="size-[5.6rem] shrink-0"
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
