"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { episodes } from "@/data/episodes";

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });
}

export function EpisodeTable() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const hovered = episodes.find((ep) => ep.id === hoveredId);

  return (
    <div
      className="w-full"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      {/* Floating cover art follows cursor */}
      {hoveredId && (hovered?.hoverImage ?? hovered?.coverImage) && (
        <div
          className="fixed pointer-events-none z-50"
          style={{ left: pos.x + 24, top: pos.y - 120, width: 180 }}
        >
          <Image
            src={(hovered.hoverImage ?? hovered.coverImage)!}
            alt=""
            width={180}
            height={225}
            className="w-full h-auto shadow-xl"
            priority
          />
        </div>
      )}

      {/* Column headers */}
      <div className="flex items-center gap-4 sm:gap-8 border-b border-hairline pb-3 text-[11px] tracking-[0.15em] uppercase text-muted select-none">
        <span className="w-10 shrink-0">No.</span>
        <span className="flex-1 min-w-0">Title</span>
        <span className="w-32 sm:w-36 shrink-0 hidden sm:block">Featuring</span>
        <span className="w-28 sm:w-32 shrink-0 hidden sm:block">Date</span>
        <span className="w-12 shrink-0 text-right hidden sm:block">Dur.</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-hairline">
        {episodes.map((ep) => (
          <Link
            key={ep.id}
            href={`/episodes/${ep.id}`}
            className="flex items-center gap-4 sm:gap-8 py-4 sm:py-5 group"
            onMouseEnter={() => setHoveredId(ep.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <span className="w-10 shrink-0 text-[11px] tracking-[0.1em] text-muted">
              {String(ep.number).padStart(3, "0")}
            </span>
            <span
              className="flex-1 min-w-0 text-sm sm:text-base font-light group-hover:text-accent transition-colors"
              dangerouslySetInnerHTML={{ __html: ep.title }}
            />
            <span className="w-32 sm:w-36 shrink-0 text-sm text-muted hidden sm:block">
              {ep.guest}
            </span>
            <span className="w-28 sm:w-32 shrink-0 text-sm text-muted hidden sm:block">
              {formatDate(ep.date)}
            </span>
            <span className="w-12 shrink-0 text-sm text-muted text-right hidden sm:block">
              {ep.duration || "—"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
