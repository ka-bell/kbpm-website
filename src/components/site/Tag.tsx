import type { ReactNode } from "react";

type TagVariant = "lime" | "white" | "blue" | "frost";

type TagProps = {
  children: ReactNode;
  /**
   * Figma tags:
   * - lime / blue / white = Custom tag pills (3769:4989)
   * - frost = media overlay typology tags (3769:5000)
   */
  variant?: TagVariant;
  className?: string;
};

/**
 * Meta tags — Figma 3674:4891 / 3769:4989 / blog-card overlays.
 */
export function Tag({ children, variant = "lime", className = "" }: TagProps) {
  if (variant === "frost") {
    return (
      <span
        className={`inline-flex items-center justify-center bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase leading-none text-white backdrop-blur-[25px] ${className}`.trim()}
      >
        {children}
      </span>
    );
  }

  const bg =
    variant === "white"
      ? "bg-white"
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
