/**
 * Section eyebrow — Figma Custom Eyebrow.
 * Mobile Tags/Mobile: 10px / mark 23px (3674:2683).
 * Desktop Tags/Desktop: 14px / mark 32px.
 */

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
      className={`flex items-center ${
        mark != null ? "h-[23px] gap-2 md:h-8 md:gap-4" : ""
      } ${className}`.trim()}
    >
      {mark != null ? (
        <img
          src={`/hero/tile-${mark}.png`}
          alt=""
          width={32}
          height={32}
          decoding="async"
          className="size-[23px] shrink-0 object-cover md:size-8"
          aria-hidden
        />
      ) : null}
      <p
        className={`font-mono uppercase leading-[1.1] tracking-[0.3px] md:tracking-[0.42px] text-[10px] md:text-[14px] ${labelInk}`}
      >
        {label}
      </p>
    </div>
  );
}
