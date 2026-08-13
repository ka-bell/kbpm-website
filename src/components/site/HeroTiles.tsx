const TILES = [
  { src: "/hero/tile-1.png", alt: "Brand mark" },
  { src: "/hero/tile-2.png", alt: "K" },
  { src: "/hero/tile-3.png", alt: "B" },
  { src: "/hero/tile-4.png", alt: "Plus" },
  { src: "/hero/tile-5.png", alt: "P" },
  { src: "/hero/tile-6.png", alt: "M" },
  { src: "/hero/tile-7.png", alt: "Brand mark" },
] as const;

/** Figma hero strip — exported brand tiles (kb + pm). */
export function HeroTiles() {
  return (
    <div className="grid grid-cols-2 gap-[5px] sm:grid-cols-4 lg:grid-cols-7">
      {TILES.map((tile) => (
        <div
          key={tile.src}
          className="relative aspect-square w-full overflow-hidden bg-[#1e1e1e]"
        >
          <img
            src={tile.src}
            alt={tile.alt}
            width={200}
            height={200}
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
