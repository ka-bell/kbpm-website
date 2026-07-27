import { Link } from "@/components/Link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display mt-4 text-5xl text-foreground">Page not found.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t been built yet.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-foreground px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
