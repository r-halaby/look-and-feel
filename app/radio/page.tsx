import Image from "next/image";
import { episodes } from "@/data/episodes";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Radio — Look & Feel",
  description: "Episodes of Look & Feel, on air at Rodeo Radio.",
};

function getNextAirDate(): Date {
  function thirdWednesday(year: number, month: number): Date {
    const first = new Date(Date.UTC(year, month, 1));
    const daysUntilWed = (3 - first.getUTCDay() + 7) % 7;
    return new Date(Date.UTC(year, month, 1 + daysUntilWed + 14));
  }

  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const thisMonth = thirdWednesday(now.getUTCFullYear(), now.getUTCMonth());

  if (thisMonth.getTime() >= todayUTC) return thisMonth;

  const nm = now.getUTCMonth() === 11 ? 0 : now.getUTCMonth() + 1;
  const ny = now.getUTCMonth() === 11 ? now.getUTCFullYear() + 1 : now.getUTCFullYear();
  return thirdWednesday(ny, nm);
}

function formatDate(iso: string) {
  const date = new Date(iso + "T12:00:00Z");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });
}

export default function RadioPage() {
  const [latest, ...archive] = episodes;
  const nextAir = getNextAirDate();
  const nextAirFormatted = nextAir.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="pt-24">
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        <div className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-10 pb-12 sm:pb-16">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
            On air at Rodeo Radio
          </p>
          <h1 className="text-[18vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] font-light tracking-[-0.02em]">
            RADIO
          </h1>
        </div>
      </section>

      {/* Next air date */}
      <section className="px-5 sm:px-10 py-5 sm:py-6 border-t hairline flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <p className="text-[11px] tracking-[0.2em] uppercase text-muted">
          Next Episode
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
          <p className="text-lg sm:text-xl font-light tracking-tight">
            {nextAirFormatted}
          </p>
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted">
            10 AM ET &middot;{" "}
            <a
              href="https://evenings.fm/rodeo-radio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Rodeo Radio
            </a>
          </p>
        </div>
      </section>

      {/* Latest episode */}
      <section className="border-t hairline">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Cover */}
          <div className="pt-[30px] pb-[30px] pl-[30px]">
            {latest.coverImage ? (
              <Image
                src={latest.coverImage}
                alt={latest.title}
                width={0}
                height={0}
                sizes="(max-width: 768px) 70vw, 35vw"
                className="w-[70%] h-auto"
              />
            ) : (
              <div className="w-[70%] aspect-square bg-foreground/10" />
            )}
          </div>

          {/* Info + player */}
          <div className="flex flex-col justify-center px-8 sm:px-12 py-12 md:py-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-6">
              Latest Episode
            </p>
            <p className="text-sm tracking-[0.15em] text-accent mb-3">
              Ep. {String(latest.number).padStart(3, "0")}
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.01em] leading-[1.05] break-words"
              dangerouslySetInnerHTML={{ __html: latest.title }}
            />
            <p className="mt-3 text-xs tracking-[0.15em] uppercase text-muted">
              {formatDate(latest.date)} &middot; {latest.guest}
            </p>
            {latest.audioUrl && <AudioPlayer src={latest.audioUrl} />}
          </div>
        </div>
      </section>

      {/* Archive */}
      {archive.length > 0 && (
        <section className="px-5 sm:px-10 py-16 sm:py-20 border-t hairline">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-10">
            Archive
          </p>
          <ul>
            {archive.map((ep) => (
              <li
                key={ep.id}
                className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-6 sm:gap-10 py-8 border-t hairline"
              >
                {/* Thumbnail */}
                <div className="shrink-0">
                  {ep.coverImage ? (
                    <Image
                      src={ep.coverImage}
                      alt={ep.title}
                      width={0}
                      height={0}
                      sizes="120px"
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-foreground/10" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex flex-col justify-center">
                  <p className="text-[11px] tracking-[0.15em] text-muted mb-1">
                    Ep. {String(ep.number).padStart(3, "0")}
                  </p>
                  <h3
                    className="text-xl sm:text-2xl font-light tracking-tight break-words"
                    dangerouslySetInnerHTML={{ __html: ep.title }}
                  />
                  <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-muted">
                    {formatDate(ep.date)} &middot; {ep.guest}
                  </p>
                  {ep.audioUrl && <AudioPlayer src={ep.audioUrl} />}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Footer />
    </div>
  );
}
