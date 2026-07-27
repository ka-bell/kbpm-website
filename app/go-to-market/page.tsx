import type { Metadata } from "next";
import { GoToMarketPage } from "@/views/GoToMarketPage";

export const metadata: Metadata = {
  title: "Go-to-Market",
  description:
    "Make your vibecoded app actually ready to launch — start with a €250 scan, or go full Release Ready.",
  openGraph: {
    title: "Go-to-Market — kbell + postman",
    description:
      "Your vibecoded app looks ready. We make it actually ready to launch.",
  },
  alternates: { canonical: "/go-to-market" },
};

export default function Page() {
  return <GoToMarketPage />;
}
