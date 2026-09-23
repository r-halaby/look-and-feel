import Image from "next/image";
import { TowerIcon } from "@/components/TowerIcon";

export default function Home() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden -mt-[1px]">
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background/70" />

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-5 sm:px-10 py-32 sm:py-40 text-white">
        <h1 className="text-[16vw] sm:text-[10vw] md:text-[8.5vw] leading-[0.95] font-light tracking-[-0.02em] text-center text-white">
          LOOK &amp; FEEL
        </h1>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between px-5 sm:px-10 pb-8 sm:pb-10 gap-6 sm:gap-8 text-white">
        <TowerIcon className="w-8 h-14 text-white shrink-0" />
        <div className="sm:max-w-md sm:text-right">
          <p className="text-xs sm:text-sm leading-relaxed text-white">
            A study of the reciprocal relationship between sound and design.
            Explore the emotional and conceptual space behind visual practice.
          </p>
          <div className="mt-4 sm:ml-auto w-16 h-px bg-white/60" />
        </div>
      </div>
    </section>
  );
}
