// Regular schedule: last Wednesday of every month, 10:00–11:30 AM ET
export const SHOW_START_HOUR_ET = 10;
export const SHOW_END_HOUR_ET = 11;
export const SHOW_END_MINUTE_ET = 30;

// One-off overrides — add an entry whenever the show moves to a different date
export const overrides: Array<{ date: string; note?: string }> = [
  { date: "2026-11-24", note: "Thanksgiving week — moved to Tuesday" },
];

// Stream URL — paste the URL from browser DevTools during your next live show
export const STREAM_URL = "";

function lastWednesdayOfMonth(year: number, month: number): Date {
  // Work backwards from the last day of the month to find the last Wednesday (day 3)
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  const daysBack = (lastDay.getUTCDay() - 3 + 7) % 7;
  return new Date(Date.UTC(year, month, lastDay.getUTCDate() - daysBack));
}

export function getNextAirDate(): Date {
  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  // Check overrides first
  for (const o of overrides) {
    const d = new Date(o.date + "T00:00:00Z");
    if (d.getTime() >= todayUTC) return d;
  }

  // Try last Wednesday of this month, then next month
  for (let offset = 0; offset <= 1; offset++) {
    const m = now.getUTCMonth() + offset;
    const y = now.getUTCFullYear() + Math.floor(m / 12);
    const lastWed = lastWednesdayOfMonth(y, m % 12);

    // Skip if this date is overridden
    const isoDate = lastWed.toISOString().slice(0, 10);
    const isOverridden = overrides.some((o) => o.date === isoDate);
    if (isOverridden) continue;

    if (lastWed.getTime() >= todayUTC) return lastWed;
  }

  // Fallback: last Wednesday of next month
  const nm = now.getUTCMonth() + 1;
  const ny = now.getUTCFullYear() + Math.floor(nm / 12);
  return lastWednesdayOfMonth(ny, nm % 12);
}

/** Returns true if the show is currently on air (within the scheduled window, ET) */
export function isLiveNow(): boolean {
  const now = new Date();
  // ET offset: EST = UTC-5, EDT = UTC-4
  const jan = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const jul = new Date(Date.UTC(now.getUTCFullYear(), 6, 1));
  const isDST =
    Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) ===
    now.getTimezoneOffset()
      ? false
      : true;
  const etOffsetHours = isDST ? -4 : -5;

  const etNow = new Date(now.getTime() + etOffsetHours * 3600 * 1000);
  const etDateStr = etNow.toISOString().slice(0, 10);
  const etHour = etNow.getUTCHours();
  const etMin = etNow.getUTCMinutes();

  // Is today a scheduled air date?
  const todayIsOverride = overrides.some((o) => o.date === etDateStr);
  const todayIsLastWed = (() => {
    const d = new Date(etDateStr + "T00:00:00Z");
    const lastWed = lastWednesdayOfMonth(d.getUTCFullYear(), d.getUTCMonth());
    const lastWedStr = lastWed.toISOString().slice(0, 10);
    const overridesDates = overrides.map((o) => o.date);
    return lastWedStr === etDateStr && !overridesDates.includes(etDateStr);
  })();

  if (!todayIsOverride && !todayIsLastWed) return false;

  // Is it within 10:00–11:30 AM ET?
  const afterStart = etHour > SHOW_START_HOUR_ET || (etHour === SHOW_START_HOUR_ET && etMin >= 0);
  const beforeEnd = etHour < SHOW_END_HOUR_ET || (etHour === SHOW_END_HOUR_ET && etMin < SHOW_END_MINUTE_ET);
  return afterStart && beforeEnd;
}
