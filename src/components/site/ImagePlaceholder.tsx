import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label?: string;
  className?: string;
};

export function ImagePlaceholder({ label = "Image", className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "wire-image flex h-full min-h-24 w-full items-center justify-center text-center",
        className,
      )}
    >
      <span className="font-mono-label uppercase tracking-wider">{label}</span>
    </div>
  );
}
