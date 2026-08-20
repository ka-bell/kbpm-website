/** Section eyebrow — Figma Custom Eyebrow (32px brand mark + mono label). */

export type BrandMark = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type SectionEyebrowProps = {
  label: string;
  /** Hero brand tile 1–7 — each section can use a different mark. */
  mark: BrandMark;
  className?: string;
};

export function SectionEyebrow({
  label,
  mark,
  className = "",
}: SectionEyebrowProps) {
  return (
    <div className={`flex h-8 items-center gap-4 ${className}`.trim()}>
      <img
        src={`/hero/tile-${mark}.png`}
        alt=""
        width={32}
        height={32}
        decoding="async"
        className="size-8 shrink-0 object-cover"
        aria-hidden
      />
      <p className="font-mono text-[14px] uppercase leading-[1.1] tracking-[0.7px] text-[#1e1e1e]">
        {label}
      </p>
    </div>
  );
}
