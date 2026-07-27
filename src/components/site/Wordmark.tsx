import { Link } from "@/components/Link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-baseline text-[1.05rem] font-medium leading-none tracking-tight text-foreground ${className}`}
      aria-label="kbell + postman — home"
      style={{ letterSpacing: "-0.03em" }}
    >
      <span>kb</span>
      <span className="mx-0.5 text-accent">+</span>
      <span>pm</span>
    </Link>
  );
}
