import type { Project, ProjectGroup, ProjectImage, ProjectKind, Resume } from "@/content/types";

const GROUP_BY_KIND: Record<ProjectKind, ProjectGroup> = {
  client: "company",
  tooling: "personal",
  side: "personal",
};

export function projectGroup(project: Project): ProjectGroup {
  return GROUP_BY_KIND[project.kind];
}

export function companyProjects(r: Resume): Project[] {
  return r.projects.filter((p) => projectGroup(p) === "company");
}

export function personalProjects(r: Resume): Project[] {
  return r.projects.filter((p) => projectGroup(p) === "personal");
}

export function projectImages(project: Project): ProjectImage[] {
  return (project.chapters ?? []).flatMap((chapter) => chapter.images);
}

export function projectsUsing(r: Resume, techId: string): Project[] {
  return r.projects.filter((p) => p.stack.includes(techId));
}

export function techUsage(r: Resume): Record<string, number> {
  return Object.fromEntries(r.tech.map((t) => [t.id, projectsUsing(r, t.id).length]));
}

export function techGroups(r: Resume): Record<string, ProjectGroup | null> {
  return Object.fromEntries(
    r.tech.map((t) => {
      const groups = projectsUsing(r, t.id).map(projectGroup);
      return [t.id, groups.includes("company") ? "company" : (groups[0] ?? null)];
    }),
  );
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
