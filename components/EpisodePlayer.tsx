"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Episode } from "@/data/episodes";

type Tab = "video" | "audio" | "visuals";

export function EpisodePlayer({ episode }: { episode: Episode }) {
  const defaultTab: Tab = episode.videoUrl ? "video" : "audio";
  const [tab, setTab] = useState<Tab>(defaultTab);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Top bar — absolute overlay */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-10 py-4 sm:py-5"
        style={{
          paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
          paddingRight: "max(1.25rem, env(safe-area-inset-right))",
          paddingTop: "max(1rem, env(safe-area-inset-top))",
        }}
      >
        <Link
          href="/"
          className="text-[11px] tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
        >
          ← Index
        </Link>
        <div className="flex items-center gap-5 sm:gap-6">
          <TabBtn label="Video" active={tab === "video"} onClick={() => setTab("video")} />
          <TabBtn label="Audio" active={tab === "audio"} onClick={() => setTab("audio")} />
          <TabBtn label="Visuals" active={tab === "visuals"} onClick={() => setTab("visuals")} />
        </div>
      </div>

      {/* Content */}
      {tab === "video" && <VideoView episode={episode} />}
      {tab === "audio" && <AudioView episode={episode} />}
      {tab === "visuals" && <VisualsView episode={episode} />}
    </div>
  );
}

function TabBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${
        active ? "text-white" : "text-white/35 hover:text-white/70"
      }`}
    >
      {label}
    </button>
  );
}

function VideoView({ episode }: { episode: Episode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play();
      setPlaying(true);
    }
  };

  if (!episode.videoUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">
          Video not available
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen cursor-pointer" onClick={toggle}>
      <video
        ref={videoRef}
        src={episode.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-14 h-14 border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
            <span className="text-base">▶</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AudioView({ episode }: { episode: Episode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background: cover art */}
      {episode.coverImage && (
        <div className="absolute inset-0">
          <Image
            src={episode.coverImage}
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

      {/* Hidden audio element */}
      {episode.audioUrl && (
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          onTimeUpdate={() => {
            const a = audioRef.current;
            if (!a || !a.duration) return;
            setCurrentTime(a.currentTime);
            setProgress(a.currentTime / a.duration);
          }}
          onLoadedMetadata={() => {
            const a = audioRef.current;
            if (a) setDuration(a.duration);
          }}
          onEnded={() => setPlaying(false)}
          preload="metadata"
        />
      )}

      {/* Info + controls pinned to bottom */}
      <div className="relative z-10 mt-auto px-5 sm:px-10 pb-12 sm:pb-16 pt-24">
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
          Ep. {String(episode.number).padStart(3, "0")}
        </p>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.01em] leading-[1.05] mb-2"
          dangerouslySetInnerHTML={{ __html: episode.title }}
        />
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-10">
          {episode.guest}
        </p>

        {episode.audioUrl ? (
          <div className="max-w-lg">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[11px] tracking-[0.1em] text-white/40 tabular-nums w-10">
                {fmt(currentTime)}
              </span>
              <div
                className="flex-1 h-px bg-white/20 cursor-pointer relative"
                onClick={seek}
              >
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-[11px] tracking-[0.1em] text-white/40 tabular-nums w-10 text-right">
                {duration > 0 ? fmt(duration) : "--:--"}
              </span>
            </div>
            <button
              onClick={toggle}
              className="text-[11px] tracking-[0.2em] uppercase border border-white/30 px-5 py-3 hover:bg-white hover:text-black transition-colors"
            >
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        ) : (
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">
            Audio coming soon
          </p>
        )}
      </div>
    </div>
  );
}

function VisualsView({ episode }: { episode: Episode }) {
  if (!episode.photos || episode.photos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">
          Photos coming soon
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto pt-20 px-5 sm:px-10 pb-12">
      <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
        {episode.photos.map((src, i) => (
          <div key={i} className="mb-3 sm:mb-4 break-inside-avoid">
            <Image
              src={src}
              alt=""
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
