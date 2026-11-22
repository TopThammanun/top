import type { Project, ProjectKind, Resume } from "@/content/types";

export function projectsUsing(r: Resume, techId: string): Project[] {
  return r.projects.filter((p) => p.stack.includes(techId));
}

export function techUsage(r: Resume): Record<string, number> {
  return Object.fromEntries(r.tech.map((t) => [t.id, projectsUsing(r, t.id).length]));
}

export function countByKind(r: Resume): Record<ProjectKind | "all", number> {
  const count = (kind: ProjectKind) => r.projects.filter((p) => p.kind === kind).length;
  return { all: r.projects.length, client: count("client"), tooling: count("tooling"), side: count("side") };
}

export function techName(r: Resume, id: string): string {
  return r.tech.find((t) => t.id === id)?.name ?? id;
}

export interface SkillGroup {
  label: string;
  names: string[];
}

export function skillGroups(r: Resume): SkillGroup[] {
  return r.categories.map((c) => ({
    label: c.label,
    names: r.tech.filter((t) => t.category === c.id).map((t) => t.name),
  }));
}
