import Image from "next/image";
import { events } from "@/data/events";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Events — Look & Feel",
  description: "Live broadcasts, listening sessions, and gatherings.",
};

function formatDate(iso: string) {
  const date = new Date(iso + "T12:00:00Z");
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
  }).formatToParts(date);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return {
    month: get("month").toUpperCase(),
    day: Number(get("day")),
    year: Number(get("year")),
    weekday: get("weekday").toUpperCase(),
  };
}

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");

  return (
    <div className="pt-24">
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 pb-16">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
            Live broadcasts &middot; listening sessions
          </p>
          <h1 className="text-[16vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] font-light tracking-[-0.02em]">
            EVENTS
          </h1>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-20 border-t hairline">
        <div className="flex items-baseline justify-between mb-12">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted">
            Upcoming
          </p>
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted">
            {upcoming.length} scheduled
          </p>
        </div>

        <ul className="space-y-2">
          {upcoming.map((event) => {
            const d = formatDate(event.date);
            const venue =
              event.location && event.location !== "TBA"
                ? `${event.location}, ${event.city}`
                : event.city;
            const meta = [d.weekday, event.time, venue]
              .filter(Boolean)
              .join(" · ");
            return (
              <li
                key={event.id}
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr_auto] gap-6 md:gap-10 py-8 border-t hairline"
              >
                <div className="flex flex-col">
                  <span className="text-[11px] tracking-[0.15em] text-muted">
                    {d.month}
                  </span>
                  <span className="text-5xl md:text-6xl font-light leading-none mt-1">
                    {d.day}
                  </span>
                  <span className="text-[11px] tracking-[0.15em] text-muted mt-1">
                    {d.year}
                  </span>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <h3
                    className="text-2xl md:text-3xl font-light tracking-tight"
                    dangerouslySetInnerHTML={{ __html: event.title }}
                  />
                  <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-muted">
                    {meta}
                  </p>
                  {event.description && (
                    <p className="mt-4 text-sm md:text-base leading-relaxed max-w-xl text-foreground/85">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1 flex md:flex-col md:items-end md:justify-between gap-4 md:text-right">
                  {event.capacity && (
                    <span className="text-[11px] tracking-[0.15em] uppercase text-muted">
                      Capacity {event.capacity}
                    </span>
                  )}
                  <button
                    type="button"
                    className="px-6 py-3 border hairline rounded-full text-[11px] tracking-[0.2em] uppercase hover:bg-accent hover:text-background hover:border-accent transition-colors"
                  >
                    Reserve
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {past.length > 0 && (
        <section className="px-6 sm:px-10 py-20 border-t hairline">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-10">
            Past
          </p>
          <ul>
            {past.map((event) => {
              const d = formatDate(event.date);
              return (
                <li
                  key={event.id}
                  className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-10 py-6 border-t hairline text-muted"
                >
                  <span className="text-xs md:text-sm tracking-[0.15em]">
                    {d.month} {d.day}, {d.year}
                  </span>
                  <h3
                    className="text-lg md:text-xl font-light tracking-tight"
                    dangerouslySetInnerHTML={{ __html: event.title }}
                  />
                  <span className="text-[11px] tracking-[0.15em] uppercase hidden sm:block">
                    {event.city}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <Footer />
    </div>
  );
}
