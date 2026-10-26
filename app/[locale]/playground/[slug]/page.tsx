import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPlaygroundPost } from "@/components/site/playground-data";
import { PlaygroundPostPage } from "@/views/PlaygroundPostPage";
import { localizePlaygroundPost } from "@/i18n/localize";
import { localeAlternates, resolveLocale } from "@/i18n/page-meta";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const raw = getPlaygroundPost(slug);
  if (!raw) return { title: "Playground" };
  const post = localizePlaygroundPost(raw, locale);
  return {
    title: `${post.title} — Playground`,
    description: post.summary,
    openGraph: {
      title: `${post.title} — Playground`,
      description: post.summary,
    },
    alternates: localeAlternates(`/playground/${post.slug}`),
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const resolved = await resolveLocale(Promise.resolve({ locale }));
  setRequestLocale(resolved);
  const post = getPlaygroundPost(slug);
  if (!post) notFound();
  return <PlaygroundPostPage post={post} />;
}
