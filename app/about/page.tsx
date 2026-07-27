import type { Metadata } from "next";
import { AboutPage } from "@/views/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Strategy, design, engineering, and EU-first infrastructure — what kbell + postman actually does.",
  openGraph: {
    title: "About — kbell + postman",
    description: "Strategy, design, engineering, and EU-first infrastructure.",
    url: "/about",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
