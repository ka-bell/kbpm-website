import { Link } from "@/components/Link";

type WordmarkProps = {
  className?: string;
  /** Default = black logo on light; white = white logo on dark surfaces. */
  ink?: "default" | "white";
};

export function Wordmark({ className = "", ink = "default" }: WordmarkProps) {
  const src =
    ink === "white" ? "/brand/logo-white.png" : "/brand/logo-black.png";

  return (
    <Link
      to="/"
      className={`inline-flex items-center leading-none ${className}`.trim()}
      aria-label="kbell + postman — home"
    >
      <img
        src={src}
        alt=""
        width={567}
        height={174}
        decoding="async"
        className="h-[1em] w-auto"
        aria-hidden
      />
    </Link>
  );
}
