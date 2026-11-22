import type { Period, YearMonth } from "@/content/types";

const MONTHS_PER_YEAR = 12;

function parseYearMonth(value: YearMonth): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

export function monthsBetween(start: YearMonth, end: YearMonth): number {
  const a = parseYearMonth(start);
  const b = parseYearMonth(end);
  return (b.year - a.year) * MONTHS_PER_YEAR + (b.month - a.month) + 1;
}

export function formatDuration(months: number): string {
  const total = Math.max(1, months);
  const years = Math.floor(total / MONTHS_PER_YEAR);
  const rest = total % MONTHS_PER_YEAR;
  return [years ? `${years}y` : "", rest ? `${rest}m` : ""].filter(Boolean).join(" ");
}

export function formatPeriod(p: Period): string {
  return `${p.start} → ${p.end ?? "now"}`;
}

export function periodDuration(p: Period, now: YearMonth): string {
  return formatDuration(monthsBetween(p.start, p.end ?? now));
}

export function toYearMonth(d: Date): YearMonth {
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${d.getUTCFullYear()}-${month}` as YearMonth;
}
