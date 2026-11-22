const DAY_MS = 86_400_000;
export const DAYS_PER_WEEK = 7;
const MONDAY_SHIFT = 6;

export function parseDay(day: string): number {
  const [year, month, date] = day.split("-").map(Number);
  return Date.UTC(year, month - 1, date);
}

export function formatDay(time: number): string {
  return new Date(time).toISOString().slice(0, 10);
}

export function addDays(day: string, count: number): string {
  return formatDay(parseDay(day) + count * DAY_MS);
}

export function weekdayIndex(day: string): number {
  return (new Date(parseDay(day)).getUTCDay() + MONDAY_SHIFT) % DAYS_PER_WEEK;
}

export function weekStart(day: string): string {
  return addDays(day, -weekdayIndex(day));
}

export function eachDay(from: string, to: string): string[] {
  const days: string[] = [];
  for (let day = from; day <= to; day = addDays(day, 1)) days.push(day);
  return days;
}
