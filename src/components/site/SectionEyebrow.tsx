/** Section eyebrow — Figma Custom Eyebrow (optional 32px brand mark + mono label). */

export type BrandMark = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type SectionEyebrowProps = {
  label: string;
  /** Hero brand tile 1–7. Omit for text-only eyebrows (e.g. Contact 3674:4568). */
  mark?: BrandMark;
  /** Dark = black type (default); light = white type on dark sections. */
  ink?: "dark" | "light";
  className?: string;
};

export function SectionEyebrow({
  label,
  mark,
  ink = "dark",
  className = "",
}: SectionEyebrowProps) {
  const labelInk = ink === "light" ? "text-white" : "text-[#1e1e1e]";
  return (
    <div
      className={`flex items-center ${mark != null ? "h-8 gap-4" : ""} ${className}`.trim()}
    >
      {mark != null ? (
        <img
          src={`/hero/tile-${mark}.png`}
          alt=""
          width={32}
          height={32}
          decoding="async"
          className="size-8 shrink-0 object-cover"
          aria-hidden
        />
      ) : null}
      <p
        className={`font-mono text-[14px] uppercase leading-[1.1] tracking-[0.42px] ${labelInk}`}
      >
        {label}
      </p>
    </div>
  );
}
