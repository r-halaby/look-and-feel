import Image from "next/image";
import { episodes } from "@/data/episodes";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Radio — Look & Feel",
  description: "Episodes of Look & Feel, on air at Rodeo Radio.",
};

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
  const [latest] = episodes;

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
            On air at Rodeo Radio
          </p>
          <h1 className="text-[16vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] font-light tracking-[-0.02em]">
            RADIO
          </h1>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-20 border-t hairline">
        <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-8">
          First Episode
        </p>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div>
            <p className="text-sm tracking-[0.15em] text-accent">
              Ep. {String(latest.number).padStart(3, "0")}
            </p>
            <p className="mt-2 text-xs tracking-[0.15em] uppercase text-muted">
              {formatDate(latest.date)}
            </p>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-light tracking-[-0.01em] leading-[1.05]">
              {latest.title}
            </h2>
            <p className="mt-3 text-sm tracking-[0.1em] uppercase text-muted">
              with {latest.guest}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
