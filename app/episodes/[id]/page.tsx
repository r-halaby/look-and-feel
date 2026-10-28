import { notFound } from "next/navigation";
import Script from "next/script";
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
    description: ep.description || undefined,
    openGraph: ep.audioUrl
      ? { audio: [{ url: ep.audioUrl, type: "audio/mpeg" }] }
      : undefined,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RadioEpisode",
    name: episode.title.replace(/&amp;/g, "&"),
    episodeNumber: episode.number,
    datePublished: episode.date,
    url: `https://looknfeel.xyz/episodes/${episode.id}`,
    ...(episode.audioUrl && {
      associatedMedia: {
        "@type": "AudioObject",
        contentUrl: episode.audioUrl,
        encodingFormat: "audio/mpeg",
        duration: episode.duration ? `PT${episode.duration.replace(":", "M")}S` : undefined,
      },
    }),
    ...(episode.tracks?.length && {
      hasPart: episode.tracks.map((t) => ({
        "@type": "MusicRecording",
        name: t.title,
        byArtist: { "@type": "MusicGroup", name: t.artist },
      })),
    }),
    ...(episode.chapters?.length && {
      description: episode.chapters
        .map((c) => `${c.time} — ${c.label}${c.guest ? ` with ${c.guest}` : ""}`)
        .join("; "),
    }),
  };

  return (
    <>
      <Script
        id="episode-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EpisodePlayer episode={episode} />
    </>
  );
}
