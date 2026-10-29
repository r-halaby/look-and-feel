import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const TOKEN = process.env.DISCOGS_TOKEN;
const ai = new Anthropic();
const HEADERS = { "User-Agent": "LookAndFeelRadio/1.0 +https://looknfeel.xyz" };
const DESIGN_ROLES = ["Design", "Cover Design", "Art Direction", "Artwork", "Cover", "Photography", "Illustration"];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artist = searchParams.get("artist") ?? "";
  const title = searchParams.get("title") ?? "";
  const album = searchParams.get("album") ?? "";

  if (!TOKEN) return NextResponse.json({ error: "DISCOGS_TOKEN not set" }, { status: 500 });
  if (!artist && !title && !album) return NextResponse.json({ error: "Missing artist or title" }, { status: 400 });

  // Strip parenthetical qualifiers from title: (Live), (Dirty), (Remix), etc.
  const cleanTitle = title.replace(/\s*\([^)]*\)\s*$/, "").trim();
  // Use only the primary artist when multiple are listed
  const cleanArtist = artist.split(/,|(?:\s+(?:ft\.?|feat\.?)\s+)/i)[0].trim();

  // When album name is known, search by release_title + artist (finds the actual album, not a single)
  const baseParams: Record<string, string> = { artist: cleanArtist, type: "release", token: TOKEN, per_page: "5" };
  if (album) baseParams.release_title = album;
  else baseParams.track = cleanTitle;

  // Search for the release
  const searchRes = await fetch(
    `https://api.discogs.com/database/search?${new URLSearchParams(baseParams)}`,
    { headers: HEADERS, next: { revalidate: 86400 } }
  );

  if (!searchRes.ok) {
    return NextResponse.json({ imageUrl: null, credits: [] });
  }

  const { results = [] } = await searchRes.json();
  if (results.length === 0) return NextResponse.json({ imageUrl: null, credits: [] });

  const { id: releaseId, cover_image: imageUrl = null } = results[0];

  // Fetch full release for design credits
  let credits: { role: string; name: string }[] = [];
  if (releaseId) {
    const releaseRes = await fetch(
      `https://api.discogs.com/releases/${releaseId}?token=${TOKEN}`,
      { headers: HEADERS, next: { revalidate: 86400 } }
    );
    if (releaseRes.ok) {
      const release = await releaseRes.json();
      credits = (release.extraartists ?? [])
        .filter((a: { role?: string }) => DESIGN_ROLES.some((r) => a.role?.includes(r)))
        .map((a: { role: string; name: string }) => ({ role: a.role, name: a.name }));
    }
  }

  // AI fallback: ask Claude for design credits when Discogs has none
  if (credits.length === 0 && imageUrl) {
    try {
      const msg = await ai.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 256,
        messages: [{
          role: "user",
          content: `Who are the design/artwork credits for the album "${album || cleanTitle}" by "${cleanArtist}"? I'm looking for roles like Art Director, Designer, Photographer, Illustrator, Cover Design. Return ONLY a JSON array like [{"role":"Art Director","name":"Full Name"}]. Return [] if you are not confident. Do not guess.`,
        }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      const match = text.match(/\[[\s\S]*\]/);
      if (match) credits = JSON.parse(match[0]);
    } catch {
      // ignore, fall through with empty credits
    }
  }

  return NextResponse.json({ imageUrl, credits });
}
