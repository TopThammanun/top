import type { Education, ExternalLink, Project, Resume, Role } from "@/content/types";
import { formatFormalPeriod, formatMonth } from "./format";

export interface CareerStep {
  id: string;
  kind: "education" | "role";
  title: string;
  subtitle: string;
  distinction: string | null;
  when: string | null;
  current: boolean;
  summary: string | null;
  chips: { label: string; items: string[] };
  links: ExternalLink[];
  projects: Project[];
}

export function currentRole(r: Resume): Role | null {
  return r.career.find((role) => role.period?.end === null) ?? null;
}

function sharedEnding(titles: string[][]): string[] {
  const [first, ...rest] = titles;
  const limit = Math.min(...titles.map((words) => words.length)) - 1;
  let shared = 0;
  while (shared < limit && rest.every((words) => words.at(-1 - shared) === first.at(-1 - shared)))
    shared += 1;
  return first.slice(first.length - shared);
}

export function careerLadder(r: Resume): string | null {
  const titles = [...r.career].reverse().map((role) => role.title.split(" "));
  if (titles.length === 0) return null;
  const ending = sharedEnding(titles);
  const steps = titles.map((words) => words.slice(0, words.length - ending.length).join(" "));
  return [steps.join(" → "), ...ending].join(" ");
}

export function roleWhen(role: Role): string | null {
  if (role.period) return formatFormalPeriod(role.period);
  return role.months === null ? null : `${role.months} months`;
}

export function roleHeading(role: Role): string {
  const when = roleWhen(role);
  return `${role.title}, ${role.employer}${when ? ` (${when})` : ""}`;
}

export function educationDegree(education: Education): string {
  return [education.program, education.honors].filter(Boolean).join(" · ");
}

export function educationHeadline(education: Education): string {
  return [education.school, education.honors].filter(Boolean).join(" · ");
}

export function educationWhen(education: Education): string {
  return `Graduated ${formatMonth(education.graduated)}`;
}

export function educationProjects(r: Resume, education: Education): Project[] {
  return r.projects.filter((project) => education.projects.includes(project.slug));
}

function educationStep(r: Resume, education: Education): CareerStep {
  return {
    id: education.school,
    kind: "education",
    title: education.school,
    subtitle: education.program,
    distinction: education.honors,
    when: educationWhen(education),
    current: false,
    summary: null,
    chips: { label: "Coursework", items: education.coursework },
    links: [],
    projects: educationProjects(r, education),
  };
}

function roleStep(role: Role): CareerStep {
  return {
    id: role.id,
    kind: "role",
    title: role.title,
    subtitle: role.employer,
    distinction: null,
    when: roleWhen(role),
    current: role.period?.end === null,
    summary: role.summary,
    chips: { label: "Stack", items: role.stack },
    links: role.links,
    projects: [],
  };
}

export function careerSteps(r: Resume): CareerStep[] {
  return [
    ...r.education.map((education) => educationStep(r, education)),
    ...r.career.map(roleStep).reverse(),
  ];
}
