import { notFound } from "next/navigation";
import { episodes } from "@/data/episodes";
import { EpisodePlayer } from "@/components/EpisodePlayer";

export function generateStaticParams() {
  return episodes.map((ep) => ({ id: ep.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ep = episodes.find((e) => e.id === id);
  if (!ep) return {};
  return {
    title: `${ep.title.replace(/&amp;/g, "&")} — Look & Feel`,
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const episode = episodes.find((ep) => ep.id === id);
  if (!episode) notFound();

  return <EpisodePlayer episode={episode} />;
}
