import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.DISCOGS_TOKEN;
const HEADERS = { "User-Agent": "LookAndFeelRadio/1.0 +https://looknfeel.xyz" };
const DESIGN_ROLES = ["Design", "Cover Design", "Art Direction", "Artwork", "Cover", "Photography", "Illustration"];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artist = searchParams.get("artist") ?? "";
  const title = searchParams.get("title") ?? "";

  if (!TOKEN) return NextResponse.json({ error: "DISCOGS_TOKEN not set" }, { status: 500 });
  if (!artist && !title) return NextResponse.json({ error: "Missing artist or title" }, { status: 400 });

  // Strip parenthetical qualifiers from title: (Live), (Dirty), (Remix), etc.
  const cleanTitle = title.replace(/\s*\([^)]*\)\s*$/, "").trim();
  // Use only the primary artist when multiple are listed
  const cleanArtist = artist.split(/,|(?:\s+(?:ft\.?|feat\.?)\s+)/i)[0].trim();

  // Search for the release
  const searchRes = await fetch(
    `https://api.discogs.com/database/search?${new URLSearchParams({
      artist: cleanArtist,
      track: cleanTitle,
      type: "release",
      token: TOKEN,
      per_page: "5",
    })}`,
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

  return NextResponse.json({ imageUrl, credits });
}
