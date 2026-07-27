import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlaygroundPost } from "@/components/site/playground-data";
import { PlaygroundPostPage } from "@/views/PlaygroundPostPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPlaygroundPost(slug);
  if (!post) {
    return { title: "Playground" };
  }
  return {
    title: `${post.title} — Playground`,
    description: post.summary,
    openGraph: {
      title: `${post.title} — Playground`,
      description: post.summary,
    },
    alternates: { canonical: `/playground/${post.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPlaygroundPost(slug);
  if (!post) notFound();
  return <PlaygroundPostPage post={post} />;
}
