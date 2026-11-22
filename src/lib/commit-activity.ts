import type { CommitActivity, ProjectGroup } from "@/content/types";
import { addDays, DAYS_PER_WEEK, weekStart } from "./days";

export interface CommitRecord {
  hash: string;
  date: string;
  group: ProjectGroup;
}

export function windowStart(to: string, weeks: number): string {
  return addDays(weekStart(to), -(weeks - 1) * DAYS_PER_WEEK);
}

export function repoGroup(path: string, companyPaths: string[], personalPaths: string[]): ProjectGroup {
  const within = (prefix: string) => path === prefix || path.startsWith(`${prefix}/`);
  if (personalPaths.some(within)) return "personal";
  return companyPaths.some(within) ? "company" : "personal";
}

export function tallyCommits(commits: CommitRecord[], from: string, to: string): CommitActivity {
  const seen = new Set<string>();
  const counts = new Map<string, [number, number]>();
  for (const commit of commits) {
    if (seen.has(commit.hash) || commit.date < from || commit.date > to) continue;
    seen.add(commit.hash);
    const day = counts.get(commit.date) ?? [0, 0];
    day[commit.group === "company" ? 0 : 1] += 1;
    counts.set(commit.date, day);
  }
  return { from, to, days: Object.fromEntries([...counts].sort(([a], [b]) => a.localeCompare(b))) };
}
