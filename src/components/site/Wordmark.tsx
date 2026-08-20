import { Link } from "@/components/Link";

type WordmarkProps = {
  className?: string;
  /** Default = dark ink + accent plus; white = all white (dark surfaces). */
  ink?: "default" | "white";
};

export function Wordmark({ className = "", ink = "default" }: WordmarkProps) {
  const inkClass = ink === "white" ? "text-white" : "text-foreground";
  const plusClass = ink === "white" ? "text-white" : "text-accent";

  return (
    <Link
      to="/"
      className={`inline-flex items-baseline text-[1.05rem] font-medium leading-none tracking-tight ${inkClass} ${className}`}
      aria-label="kbell + postman — home"
      style={{ letterSpacing: "-0.03em" }}
    >
      <span>kb</span>
      <span className={`mx-0.5 ${plusClass}`}>+</span>
      <span>pm</span>
    </Link>
  );
}
