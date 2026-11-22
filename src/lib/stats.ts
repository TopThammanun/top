import type { Project, Resume, YearMonth } from "@/content/types";
import { formatDuration, formatMonth, monthsBetween } from "./format";
import { companyProjects } from "./selectors";

const COUNT = /^(\d+(?:\.\d+)?)(k?)(\+?)$/;
const THOUSAND = 1000;

export interface Count {
  value: number;
  approximate: boolean;
}

export interface CareerStat {
  value: string;
  label: string;
  note?: string;
}

export function parseCount(text: string): Count | null {
  const match = text.match(COUNT);
  if (!match) return null;
  const [, digits, thousands, plus] = match;
  return { value: Number(digits) * (thousands ? THOUSAND : 1), approximate: plus === "+" };
}

export function formatCount({ value, approximate }: Count): string {
  const text = value < THOUSAND ? String(value) : `${Math.floor(value / 100) / 10}k`;
  return approximate ? `${text}+` : text;
}

function sumStat(projects: Project[], label: string): Count | null {
  const counts = projects
    .map((p) => p.stats.find((stat) => stat.label === label))
    .map((stat) => (stat ? parseCount(stat.value) : null))
    .filter((count): count is Count => count !== null);
  if (counts.length === 0) return null;
  return {
    value: counts.reduce((sum, count) => sum + count.value, 0),
    approximate: counts.some((count) => count.approximate),
  };
}

export function careerStats(r: Resume, now: YearMonth): CareerStat[] {
  const company = companyProjects(r);
  if (company.length === 0) return [];

  const start = company.map((p) => p.period.start).sort()[0];
  const end =
    company
      .map((p) => p.period.end ?? now)
      .sort()
      .at(-1) ?? now;
  const repos = sumStat(company, "repos");
  const commits = sumStat(company, "commits");

  return [
    {
      value: formatDuration(monthsBetween(start, end)),
      label: "On company projects",
      note: `since ${formatMonth(start)}`,
    },
    { value: String(company.length), label: "Company projects" },
    ...(repos ? [{ value: formatCount(repos), label: "Repositories" }] : []),
    ...(commits ? [{ value: formatCount(commits), label: "Commits" }] : []),
  ];
}
