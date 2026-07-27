import type { Metadata } from "next";
import { PlaygroundIndexPage } from "@/views/PlaygroundIndexPage";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Thoughts that keep us up at night — architecture, infrastructure, AI, and the odd rabbit hole.",
  openGraph: {
    title: "Playground — kbell + postman",
    description: "Thoughts that keep us up at night.",
  },
  alternates: { canonical: "/playground" },
};

export default function Page() {
  return <PlaygroundIndexPage />;
}
