/** Fallback when no locale layout is available. */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-[60vh] items-center justify-center bg-white px-4 text-[#1e1e1e]">
          <div className="max-w-md text-center">
            <p className="font-mono text-sm uppercase tracking-wider text-[#6b6b6b]">
              404
            </p>
            <h1 className="mt-4 text-5xl font-medium tracking-tight">
              Page not found.
            </h1>
            <p className="mt-4 text-sm text-[#6b6b6b]">
              The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t
              been built yet.
            </p>
            <div className="mt-8">
              <a
                href="/"
                className="inline-flex items-center justify-center border border-[#1e1e1e] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[#1e1e1e] hover:text-white"
              >
                Back to homepage
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
