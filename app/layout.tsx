import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "kbell + postman — Digital product studio, Amsterdam",
    template: "%s — kbell + postman",
  },
  description:
    "kbell + postman is an Amsterdam digital product studio. We build digital products end to end — when the idea outgrows the team.",
  authors: [{ name: "kbell + postman" }],
  openGraph: {
    title: "kbell + postman — Digital product studio, Amsterdam",
    description:
      "Validate, build, evolve and support digital products — for agencies, founders, and product teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Google+Sans+Flex:opsz,wght@8..144,1..1000&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
