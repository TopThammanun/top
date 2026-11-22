import type { CommitActivity, ProjectGroup } from "@/content/types";
import { DAYS_PER_WEEK, eachDay, weekdayIndex } from "./days";
import { formatDate, formatQuantity, monthName } from "./format";

const QUARTILES = [0.25, 0.5, 0.75];
const MIN_LABEL_WEEKS = 3;

export type Level = 0 | 1 | 2 | 3 | 4;

const ACTIVE_LEVELS: readonly Level[] = [1, 2, 3, 4];

export interface CalendarDay {
  date: string;
  company: number;
  personal: number;
  total: number;
  level: Level;
  group: ProjectGroup | null;
}

export type CalendarWeek = (CalendarDay | null)[];

export interface CalendarMonth {
  label: string;
  week: number;
}

export interface CalendarSummary {
  total: number;
  company: number;
  personal: number;
  activeDays: number;
  longestStreak: number;
}

export interface CommitCalendar {
  weeks: CalendarWeek[];
  months: CalendarMonth[];
  summary: CalendarSummary;
}

export function levelThresholds(totals: number[]): number[] {
  const active = totals.filter((total) => total > 0).sort((a, b) => a - b);
  return QUARTILES.map((quartile) => active[Math.ceil(quartile * active.length) - 1] ?? 0);
}

export function levelOf(total: number, thresholds: number[]): Level {
  if (total === 0) return 0;
  return ACTIVE_LEVELS[thresholds.filter((threshold) => total > threshold).length] ?? 4;
}

function toDays(activity: CommitActivity): CalendarDay[] {
  const counts = eachDay(activity.from, activity.to).map((date) => {
    const [company, personal] = activity.days[date] ?? [0, 0];
    return { date, company, personal, total: company + personal };
  });
  const thresholds = levelThresholds(counts.map((day) => day.total));
  return counts.map((day) => ({
    ...day,
    level: levelOf(day.total, thresholds),
    group: day.total === 0 ? null : day.company >= day.personal ? "company" : "personal",
  }));
}

function toWeeks(days: CalendarDay[]): CalendarWeek[] {
  const lead = days.length > 0 ? weekdayIndex(days[0].date) : 0;
  const slots: CalendarWeek = [...Array<null>(lead).fill(null), ...days];
  const weeks: CalendarWeek[] = [];
  for (let start = 0; start < slots.length; start += DAYS_PER_WEEK) {
    const week = slots.slice(start, start + DAYS_PER_WEEK);
    weeks.push([...week, ...Array<null>(DAYS_PER_WEEK - week.length).fill(null)]);
  }
  return weeks;
}

function monthOf(week: CalendarWeek): number | null {
  const first = week.find((day) => day !== null);
  return first ? Number(first.date.slice(5, 7)) : null;
}

export function monthLabels(weeks: CalendarWeek[]): CalendarMonth[] {
  const starts = weeks.flatMap((week, index) => {
    const month = monthOf(week);
    const previous = index > 0 ? monthOf(weeks[index - 1]) : null;
    return month !== null && month !== previous ? [{ label: monthName(month), week: index }] : [];
  });
  return starts.filter((start, index) => {
    const next = starts[index + 1]?.week ?? weeks.length;
    return next - start.week >= MIN_LABEL_WEEKS;
  });
}

export function summarize(days: CalendarDay[]): CalendarSummary {
  let streak = 0;
  let longestStreak = 0;
  for (const day of days) {
    streak = day.total > 0 ? streak + 1 : 0;
    longestStreak = Math.max(longestStreak, streak);
  }
  const company = days.reduce((sum, day) => sum + day.company, 0);
  const personal = days.reduce((sum, day) => sum + day.personal, 0);
  return {
    total: company + personal,
    company,
    personal,
    activeDays: days.filter((day) => day.total > 0).length,
    longestStreak,
  };
}

export function buildCalendar(activity: CommitActivity): CommitCalendar {
  const days = toDays(activity);
  const weeks = toWeeks(days);
  return { weeks, months: monthLabels(weeks), summary: summarize(days) };
}

export function describeSummary(summary: CalendarSummary): string {
  return [
    formatQuantity(summary.total, "commit"),
    formatQuantity(summary.activeDays, "active day"),
    `longest streak ${formatQuantity(summary.longestStreak, "day")}`,
  ].join(" · ");
}

function monthOfDay(day: string): string {
  const [year, month] = day.split("-").map(Number);
  return `${monthName(month)} ${year}`;
}

export function describeSpan(activity: CommitActivity): string {
  return `${monthOfDay(activity.from)} – ${monthOfDay(activity.to)}`;
}

export function describeRange(activity: CommitActivity): string {
  return `${formatDate(activity.from)} to ${formatDate(activity.to)}`;
}
