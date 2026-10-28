"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Episode, Track, Chapter } from "@/data/episodes";

type Tab = "video" | "audio" | "visuals";

type ListItem =
  | { kind: "track"; timeSec: number; timeStr: string; title: string; artist: string }
  | { kind: "chapter"; timeSec: number; timeStr: string; label: string; guest?: string };

function parseTime(t: string): number {
  const parts = t.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

function fmtTimestamp(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function buildList(tracks?: Track[], chapters?: Chapter[]): ListItem[] {
  const items: ListItem[] = [
    ...(tracks ?? []).map((t) => ({
      kind: "track" as const,
      timeSec: parseTime(t.time),
      timeStr: t.time,
      title: t.title,
      artist: t.artist,
    })),
    ...(chapters ?? []).map((c) => ({
      kind: "chapter" as const,
      timeSec: parseTime(c.time),
      timeStr: c.time,
      label: c.label,
      guest: c.guest,
    })),
  ];
  return items.sort((a, b) => a.timeSec - b.timeSec);
}

export function EpisodePlayer({ episode }: { episode: Episode }) {
  const hasList = (episode.tracks?.length ?? 0) > 0 || (episode.chapters?.length ?? 0) > 0;
  const defaultTab: Tab = hasList ? "audio" : episode.videoUrl ? "video" : "audio";
  const [tab, setTab] = useState<Tab>(defaultTab);

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Top bar */}
      <div
        className="shrink-0 flex items-center justify-between px-5 sm:px-10 py-4 sm:py-5 z-20 bg-white border-b border-black/10"
        style={{
          paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
          paddingRight: "max(1.25rem, env(safe-area-inset-right))",
          paddingTop: "max(1rem, env(safe-area-inset-top))",
        }}
      >
        <Link
          href="/"
          className="text-[11px] tracking-[0.2em] uppercase text-black/50 hover:text-black transition-colors"
        >
          ← Index
        </Link>
        <div className="flex items-center gap-5 sm:gap-6">
          {episode.videoUrl && (
            <TabBtn label="Video" active={tab === "video"} onClick={() => setTab("video")} />
          )}
          <TabBtn label="Audio" active={tab === "audio"} onClick={() => setTab("audio")} />
          {episode.photos?.length && (
            <TabBtn label="Visuals" active={tab === "visuals"} onClick={() => setTab("visuals")} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {tab === "video" && <VideoView episode={episode} />}
        {tab === "audio" && <AudioView episode={episode} />}
        {tab === "visuals" && <VisualsView episode={episode} />}
      </div>
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
        active ? "text-black" : "text-black/35 hover:text-black/70"
      }`}
    >
      {label}
    </button>
  );
}

// ── Video ──────────────────────────────────────────────

function ExpandIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 1h4v4M5 12H1V8M12 1L7.5 5.5M1 12l4.5-4.5" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 5H8V1M1 8h4v4M8 1L3.5 5.5M5 12l4.5-4.5" />
    </svg>
  );
}

function VideoView({ episode }: { episode: Episode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); }
  };

  const seekTo = (seconds: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = seconds;
  };

  const seekFromBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo(((e.clientX - rect.left) / rect.width) * v.duration);
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const hasList =
    (episode.tracks?.length ?? 0) > 0 ||
    (episode.chapters?.length ?? 0) > 0;

  if (!episode.videoUrl) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">
          Video not available
        </p>
      </div>
    );
  }

  const videoEl = (
    <video
      ref={videoRef}
      src={episode.videoUrl}
      className="w-full h-full object-cover"
      playsInline
      onTimeUpdate={() => {
        const v = videoRef.current;
        if (!v || !v.duration) return;
        setCurrentTime(v.currentTime);
        setProgress(v.currentTime / v.duration);
      }}
      onLoadedMetadata={() => {
        if (videoRef.current) setDuration(videoRef.current.duration);
      }}
      onEnded={() => setPlaying(false)}
    />
  );

  // ── No tracklist: full-bleed video + compact player bar ──
  if (!hasList) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Compact player bar */}
        <div className="shrink-0 bg-white border-b border-black px-5 sm:px-10 py-3 flex items-center gap-5 sm:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] tracking-[0.2em] uppercase text-black">
              Ep. {String(episode.number).padStart(3, "0")}
            </span>
            <span className="text-black/30">—</span>
            <span
              className="text-[11px] tracking-[0.1em] uppercase text-black truncate max-w-[240px]"
              dangerouslySetInnerHTML={{ __html: episode.title }}
            />
          </div>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span className="text-[11px] tracking-[0.1em] text-black tabular-nums shrink-0">
              {fmt(currentTime)}
            </span>
            <div
              className="flex-1 h-px bg-black cursor-pointer relative"
              onClick={seekFromBar}
            >
              <div
                className="absolute left-0 top-0 h-full bg-black"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="text-[11px] tracking-[0.1em] text-black tabular-nums shrink-0">
              {duration > 0 ? fmt(duration) : "--:--"}
            </span>
            <button
              onClick={toggle}
              className="shrink-0 text-[11px] tracking-[0.2em] uppercase text-black border border-black px-4 py-1.5 hover:bg-black hover:text-white transition-colors"
            >
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        {/* Full-bleed video */}
        <div className="flex-1 relative overflow-hidden cursor-pointer" onClick={toggle}>
          {videoEl}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-14 h-14 border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-white text-base">▶</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const playOverlay = !playing && (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="w-14 h-14 border border-white/40 flex items-center justify-center">
        <span className="text-white text-base">▶</span>
      </div>
    </div>
  );

  // ── Expanded: full-bleed video + mini player bar ──
  if (expanded) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Full-bleed video */}
        <div className="flex-1 relative overflow-hidden cursor-pointer" onClick={toggle}>
          {videoEl}
          {playOverlay}
        </div>

        {/* Mini player bar */}
        <div className="shrink-0 bg-white border-t border-black px-5 sm:px-10 py-3 flex items-center gap-5 sm:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] tracking-[0.2em] uppercase text-black">
              Ep. {String(episode.number).padStart(3, "0")}
            </span>
            <span className="text-black/30">—</span>
            <span
              className="text-[11px] tracking-[0.1em] uppercase text-black truncate max-w-[240px]"
              dangerouslySetInnerHTML={{ __html: episode.title }}
            />
          </div>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span className="text-[11px] tracking-[0.1em] text-black tabular-nums shrink-0">
              {fmt(currentTime)}
            </span>
            <div className="flex-1 h-px bg-black cursor-pointer relative" onClick={seekFromBar}>
              <div className="absolute left-0 top-0 h-full bg-black" style={{ width: `${progress * 100}%` }} />
            </div>
            <span className="text-[11px] tracking-[0.1em] text-black tabular-nums shrink-0">
              {duration > 0 ? fmt(duration) : "--:--"}
            </span>
            <button
              onClick={toggle}
              className="shrink-0 text-[11px] tracking-[0.2em] uppercase text-black border border-black px-4 py-1.5 hover:bg-black hover:text-white transition-colors"
            >
              {playing ? "Pause" : "Play"}
            </button>
            <button
              onClick={() => setExpanded(false)}
              className="shrink-0 text-black/50 hover:text-black transition-colors"
              title="Exit full view"
            >
              <CollapseIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Split: 16:9 video + info left, tracklist right ──
  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden" style={{ maxWidth: "calc(55vh * 16 / 9)" }}>
        {/* 16:9 video with expand button */}
        <div className="relative w-full aspect-video shrink-0 overflow-hidden cursor-pointer" onClick={toggle}>
          {videoEl}
          {playOverlay}
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
            className="absolute top-3 right-3 z-20 text-white/60 hover:text-white transition-colors bg-black/30 hover:bg-black/50 p-2"
            title="Full view"
          >
            <ExpandIcon />
          </button>
        </div>

        {/* Episode info */}
        <div className="bg-white shrink-0 px-5 sm:px-10 pt-10 sm:pt-14 pb-8 sm:pb-10 border-t border-black">
          <p className="text-[11px] tracking-[0.2em] uppercase text-black mb-3">
            Ep. {String(episode.number).padStart(3, "0")}
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.01em] leading-[1.05] mb-2 text-black"
            dangerouslySetInnerHTML={{ __html: episode.title }}
          />
          <p className="text-[11px] tracking-[0.2em] uppercase text-black mb-6">
            {episode.guest}
          </p>
          <div className="max-w-lg">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[11px] tracking-[0.1em] text-black tabular-nums w-10">
                {fmt(currentTime)}
              </span>
              <div className="flex-1 h-px bg-black cursor-pointer relative" onClick={seekFromBar}>
                <div className="absolute left-0 top-0 h-full bg-black" style={{ width: `${progress * 100}%` }} />
              </div>
              <span className="text-[11px] tracking-[0.1em] text-black tabular-nums w-10 text-right">
                {duration > 0 ? fmt(duration) : "--:--"}
              </span>
            </div>
            <button
              onClick={toggle}
              className="text-[11px] tracking-[0.2em] uppercase text-black border border-black px-5 py-3 hover:bg-black hover:text-white transition-colors"
            >
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      </div>

      <TracklistPanel
        tracks={episode.tracks}
        chapters={episode.chapters}
        currentTime={currentTime}
        onSeek={seekTo}
      />
    </div>
  );
}

// ── Audio ─────────────────────────────────────────────

function AudioView({ episode }: { episode: Episode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  const seekTo = (seconds: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = seconds;
  };

  const seekFromBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo(((e.clientX - rect.left) / rect.width) * a.duration);
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const hasList =
    (episode.tracks?.length ?? 0) > 0 ||
    (episode.chapters?.length ?? 0) > 0;

  const audio = episode.audioUrl && (
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
        if (audioRef.current) setDuration(audioRef.current.duration);
      }}
      onEnded={() => setPlaying(false)}
      preload="metadata"
    />
  );

  // ── No tracklist: full-bleed cover + compact player bar ──
  if (!hasList) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {audio}

        {/* Compact player bar */}
        <div className="shrink-0 bg-black border-b border-white/10 px-5 sm:px-10 py-3 flex items-center gap-5 sm:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] tracking-[0.2em] uppercase text-white/35">
              Ep. {String(episode.number).padStart(3, "0")}
            </span>
            <span className="text-white/20">—</span>
            <span
              className="text-[11px] tracking-[0.1em] uppercase text-white/70 truncate max-w-[240px]"
              dangerouslySetInnerHTML={{ __html: episode.title }}
            />
          </div>

          {episode.audioUrl ? (
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <span className="text-[11px] tracking-[0.1em] text-white/35 tabular-nums shrink-0">
                {fmt(currentTime)}
              </span>
              <div
                className="flex-1 h-px bg-white/20 cursor-pointer relative"
                onClick={seekFromBar}
              >
                <div
                  className="absolute left-0 top-0 h-full bg-white"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-[11px] tracking-[0.1em] text-white/35 tabular-nums shrink-0">
                {duration > 0 ? fmt(duration) : "--:--"}
              </span>
              <button
                onClick={toggle}
                className="shrink-0 text-[11px] tracking-[0.2em] uppercase border border-white/30 px-4 py-1.5 hover:bg-white hover:text-black transition-colors"
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          ) : (
            <span className="text-[11px] tracking-[0.2em] uppercase text-white/30">
              Audio coming soon
            </span>
          )}
        </div>

        {/* Full-bleed cover */}
        {episode.coverImage ? (
          <div className="flex-1 relative overflow-hidden">
            <Image
              src={episode.coverImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">
              No artwork
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── With tracklist: 16:9 cover + info left, tracklist right ──
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* ── Left: cover + info ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden" style={{ maxWidth: "calc(55vh * 16 / 9)" }}>
        {/* Cover image — 16:9 */}
        {episode.coverImage && (
          <div className="relative w-full aspect-video shrink-0 overflow-hidden">
            <Image
              src={episode.coverImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {audio}

        {/* Episode info — white below cover */}
        <div className="bg-white shrink-0 px-5 sm:px-10 pt-10 sm:pt-14 pb-8 sm:pb-10 border-t border-black/10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-black mb-3">
            Ep. {String(episode.number).padStart(3, "0")}
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.01em] leading-[1.05] mb-2 text-black"
            dangerouslySetInnerHTML={{ __html: episode.title }}
          />
          <p className="text-[11px] tracking-[0.2em] uppercase text-black mb-6">
            {episode.guest}
          </p>

          {episode.audioUrl ? (
            <div className="max-w-lg">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-[11px] tracking-[0.1em] text-black tabular-nums w-10">
                  {fmt(currentTime)}
                </span>
                <div
                  className="flex-1 h-px bg-black cursor-pointer relative"
                  onClick={seekFromBar}
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-black"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <span className="text-[11px] tracking-[0.1em] text-black tabular-nums w-10 text-right">
                  {duration > 0 ? fmt(duration) : "--:--"}
                </span>
              </div>
              <button
                onClick={toggle}
                className="text-[11px] tracking-[0.2em] uppercase text-black border border-black px-5 py-3 hover:bg-black hover:text-white transition-colors"
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          ) : (
            <p className="text-[11px] tracking-[0.2em] uppercase text-black">
              Audio coming soon
            </p>
          )}
        </div>
      </div>

      {/* ── Right: tracklist ── */}
      <TracklistPanel
        tracks={episode.tracks}
        chapters={episode.chapters}
        currentTime={currentTime}
        onSeek={seekTo}
      />
    </div>
  );
}

// ── Tracklist panel ───────────────────────────────────

function TracklistPanel({
  tracks,
  chapters,
  currentTime,
  onSeek,
}: {
  tracks?: Track[];
  chapters?: Chapter[];
  currentTime: number;
  onSeek: (seconds: number) => void;
}) {
  const items = buildList(tracks, chapters);

  let activeIdx = -1;
  for (let i = 0; i < items.length; i++) {
    if (items[i].timeSec <= Math.floor(currentTime)) activeIdx = i;
    else break;
  }

  const activeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeIdx]);

  return (
    <aside className="flex-1 min-w-[320px] flex flex-col bg-white text-black border-l border-black overflow-hidden">
      <header className="px-5 sm:px-6 py-4 border-b border-black shrink-0 bg-black">
        <span className="text-[10px] tracking-[0.25em] uppercase text-white">
          Tracklist
        </span>
      </header>

      <div className="flex-1 overflow-y-auto">
        {items.map((item, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={i}
              ref={isActive ? activeRef : undefined}
              onClick={() => onSeek(item.timeSec)}
              className={`w-full text-left px-5 sm:px-6 py-4 border-b border-black flex items-center gap-4 sm:gap-5 hover:bg-black transition-colors group ${
                isActive ? "bg-black/[0.04]" : ""
              }`}
            >
              <span className="text-[11px] font-mono text-black tabular-nums shrink-0 w-10 group-hover:text-white">
                {fmtTimestamp(item.timeSec)}
              </span>

              <div className="flex-1 min-w-0">
                {item.kind === "track" ? (
                  <>
                    <p className={`text-[12px] tracking-[0.08em] uppercase leading-tight truncate group-hover:text-white ${isActive ? "font-medium" : ""}`}>
                      {item.title}
                    </p>
                    {item.artist && (
                      <p className="text-[11px] tracking-[0.05em] uppercase text-black truncate mt-0.5 group-hover:text-white">
                        {item.artist}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className={`text-[12px] tracking-[0.08em] uppercase leading-tight text-accent truncate group-hover:text-white ${isActive ? "font-medium" : ""}`}>
                      {item.label}
                    </p>
                    {item.guest && (
                      <p className="text-[11px] tracking-[0.05em] uppercase text-black truncate mt-0.5 group-hover:text-white">
                        with {item.guest}
                      </p>
                    )}
                  </>
                )}
              </div>

              {isActive && (
                <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

// ── Visuals ───────────────────────────────────────────

function VisualsView({ episode }: { episode: Episode }) {
  if (!episode.photos || episode.photos.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">
          Photos coming soon
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-8">
      <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
        {episode.photos.map((src, i) => (
          <div key={i} className="mb-3 sm:mb-4 break-inside-avoid">
            <Image src={src} alt="" width={600} height={600} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
