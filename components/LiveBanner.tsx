"use client";

import { STREAM_URL } from "@/data/schedule";
import { useRef, useState } from "react";

export function LiveBanner() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
    }
  };

  return (
    <div className="flex items-center justify-between border border-accent px-5 py-4 mb-10 sm:mb-12">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
        <span className="text-[11px] tracking-[0.2em] uppercase text-accent">
          Live now — Look &amp; Feel Radio
        </span>
      </div>

      {STREAM_URL ? (
        <>
          <audio ref={audioRef} src={STREAM_URL} />
          <button
            onClick={toggle}
            className="text-[11px] tracking-[0.2em] uppercase border border-hairline px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            {playing ? "Stop" : "Tune in"}
          </button>
        </>
      ) : (
        <a
          href="https://evenings.fm/rodeo-radio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-[0.2em] uppercase border border-hairline px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Tune in ↗
        </a>
      )}
    </div>
  );
}
