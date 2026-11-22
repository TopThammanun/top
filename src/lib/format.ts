import type { Period, YearMonth } from "@/content/types";
import { weekdayIndex } from "./days";

const MONTHS_PER_YEAR = 12;
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

export function monthName(month: number): string {
  return MONTH_NAMES[month - 1];
}

export function formatMonth(value: YearMonth): string {
  const { year, month } = parseYearMonth(value);
  return `${monthName(month)} ${year}`;
}

export function formatDate(day: string): string {
  const [year, month, date] = day.split("-").map(Number);
  return `${WEEKDAY_NAMES[weekdayIndex(day)]} ${date} ${monthName(month)} ${year}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatQuantity(count: number, noun: string): string {
  return `${formatNumber(count)} ${noun}${count === 1 ? "" : "s"}`;
}

export function formatFormalPeriod(p: Period): string {
  if (p.end === p.start) return formatMonth(p.start);
  return `${formatMonth(p.start)} – ${p.end ? formatMonth(p.end) : "Present"}`;
}

export function periodDuration(p: Period, now: YearMonth): string {
  return formatDuration(monthsBetween(p.start, p.end ?? now));
}

export function formatUsage(projects: number): string {
  return `used in ${formatQuantity(projects, "project")}`;
}

export function formatIndex(n: number): string {
  return String(n).padStart(2, "0");
}

export function toYearMonth(d: Date): YearMonth {
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${d.getUTCFullYear()}-${month}` as YearMonth;
}
