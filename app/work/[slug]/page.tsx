import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCase } from "@/components/site/cases-data";
import { WorkCasePage } from "@/views/WorkCasePage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) {
    return { title: "Case" };
  }
  return {
    title: c.client,
    description: c.outcome,
    openGraph: {
      title: `${c.client} — kbell + postman`,
      description: c.outcome,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  return <WorkCasePage c={c} />;
}
