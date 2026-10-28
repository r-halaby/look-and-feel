import { EpisodeTable } from "@/components/EpisodeTable";
import { episodes } from "@/data/episodes";

export default function Home() {
  return (
    <div className="px-5 sm:px-10 pt-8 sm:pt-10 pb-24">
      <div className="flex items-baseline justify-between mb-8 sm:mb-10">
        <h1 className="text-[11px] tracking-[0.2em] uppercase text-muted">
          Episodes
        </h1>
        <span className="text-[11px] tracking-[0.2em] uppercase text-muted">
          {episodes.length} total
        </span>
      </div>
      <EpisodeTable />
    </div>
  );
}
