import type { Metadata } from "next";
import { ContactPage } from "@/views/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell KBPM what you are building. Start a product sprint, productionize a prototype, or talk through product development support.",
  openGraph: {
    title: "Contact - kbell + postman",
    description: "Tell us what you are building and where the product is stuck.",
  },
};

type Props = {
  searchParams: Promise<{ interest?: string | string[] }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const raw = params.interest;
  const interest = typeof raw === "string" ? raw : undefined;
  return <ContactPage interest={interest} />;
}
