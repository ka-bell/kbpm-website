import type { Metadata } from "next";
import { AboutPage } from "@/views/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kbell & Postman is a senior studio in Amsterdam — strategy, design and code, without an account layer.",
  openGraph: {
    title: "About — KB+PM",
    description: "Senior-led. No account layer.",
    url: "/about",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
