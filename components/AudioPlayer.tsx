"use client";

import { useRef, useState } from "react";

export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setCurrentTime(audio.currentTime);
    setProgress(audio.currentTime / audio.duration);
  };

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  const onEnded = () => setPlaying(false);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  };

  return (
    <div className="mt-8">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="metadata"
      />
      <div className="flex items-center gap-5 sm:gap-8">
        <button
          onClick={toggle}
          className="shrink-0 text-[11px] tracking-[0.2em] uppercase border hairline px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
        >
          {playing ? "Pause" : "Play"}
        </button>
        <div
          className="flex-1 h-px bg-foreground/20 cursor-pointer relative group"
          onClick={seek}
        >
          <div
            className="absolute left-0 top-0 h-full bg-foreground"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-[11px] tracking-[0.15em] text-muted tabular-nums">
          {fmt(currentTime)} / {duration > 0 ? fmt(duration) : "--:--"}
        </span>
      </div>
    </div>
  );
}
