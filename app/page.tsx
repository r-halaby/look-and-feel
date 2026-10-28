import { EpisodeTable } from "@/components/EpisodeTable";
import { LiveBanner } from "@/components/LiveBanner";
import { episodes } from "@/data/episodes";
import { isLiveNow, getNextAirDate } from "@/data/schedule";

export default function Home() {
  const live = isLiveNow();
  const nextAir = getNextAirDate();
  const nextAirFormatted = nextAir.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="px-5 sm:px-10 pt-8 sm:pt-10 pb-24">
      {live && <LiveBanner />}

      <div className="flex items-baseline justify-between mb-8 sm:mb-10">
        <h1 className="text-[11px] tracking-[0.2em] uppercase text-muted">
          Episodes
        </h1>
        <span className="text-[11px] tracking-[0.2em] uppercase text-muted">
          Next — {nextAirFormatted}
        </span>
      </div>
      <EpisodeTable />
    </div>
  );
}
