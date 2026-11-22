import type { Resume } from "@/content/types";

export interface MachineRoute {
  path: string;
  label: string;
}

export const MACHINE_ROUTES: readonly MachineRoute[] = [
  { path: "/resume.pdf", label: "Resume (PDF)" },
  { path: "/resume.json", label: "Resume (JSON Resume)" },
  { path: "/resume.txt", label: "Resume (plain text)" },
  { path: "/llms.txt", label: "Summary for LLMs" },
];

export function absoluteUrl(r: Resume, path: string): string {
  return new URL(path, r.meta.siteUrl).toString();
}

export function linkHref(r: Resume, id: string): string | null {
  return r.profile.links.find((link) => link.id === id)?.href ?? null;
}
