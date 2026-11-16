import type { ReactNode } from "react";

type TagVariant = "lime" | "white" | "blue" | "frost" | "ghost";

type TagProps = {
  children: ReactNode;
  /**
   * Custom tag — Figma 10602:43141
   * - lime / blue / white = filled pills
   * - frost = media overlay typology tags
   * - ghost = text-only
   */
  variant?: TagVariant;
  className?: string;
};

/**
 * Meta tags — Figma 10602:43141 / 3769:4989 / blog-card overlays.
 */
export function Tag({ children, variant = "lime", className = "" }: TagProps) {
  if (variant === "frost") {
    return (
      <span
        className={`inline-flex items-center justify-center bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.5px] text-white backdrop-blur-[25px] ${className}`.trim()}
      >
        {children}
      </span>
    );
  }

  if (variant === "ghost") {
    return (
      <span
        className={`inline-flex items-center justify-center font-mono text-[10px] uppercase leading-none tracking-[0.5px] text-[#1e1e1e] ${className}`.trim()}
      >
        {children}
      </span>
    );
  }

  const bg =
    variant === "white"
      ? "border border-[#1e1e1e]/15 bg-white"
      : variant === "blue"
        ? "bg-[#006ff7]"
        : "bg-[#c9ff6e]";
  const ink = variant === "blue" ? "text-white" : "text-[#1e1e1e]";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 font-mono text-[10px] uppercase leading-none tracking-[0.5px] ${bg} ${ink} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
