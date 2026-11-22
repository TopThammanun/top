import type { Resume } from "@/content/types";
import { linkHref } from "./routes";
import { projectGroup } from "./selectors";
import { SECTIONS, type SectionId } from "./sections";

export type CommandAction =
  | { type: "section"; id: SectionId }
  | { type: "project"; slug: string }
  | { type: "href"; href: string; newTab: boolean }
  | { type: "copy"; text: string }
  | { type: "theme" }
  | { type: "help" };

export type CommandGroup = "Navigate" | "Projects" | "Actions" | "Open" | "Help";

export interface Command {
  id: string;
  group: CommandGroup;
  label: string;
  hint?: string;
  keywords?: string[];
  action: CommandAction;
}

export const COMMAND_GROUPS: readonly CommandGroup[] = ["Navigate", "Projects", "Actions", "Open", "Help"];

function present(commands: (Command | null)[]): Command[] {
  return commands.filter((c): c is Command => c !== null);
}

export function buildCommands(r: Resume): Command[] {
  const github = linkHref(r, "github");
  const { email, linkedin } = r.profile;

  const navigate = SECTIONS.map<Command>((s) => ({
    id: `nav-${s.id}`,
    group: "Navigate",
    label: s.label,
    hint: `g ${s.key}`,
    action: { type: "section", id: s.id },
  }));

  const projects = r.projects.map<Command>((p) => ({
    id: `project-${p.slug}`,
    group: "Projects",
    label: p.name,
    hint: projectGroup(p),
    keywords: [p.domain, ...p.stack],
    action: { type: "project", slug: p.slug },
  }));

  const actions = present([
    {
      id: "download-pdf",
      group: "Actions",
      label: "Download PDF",
      action: { type: "href", href: "/resume.pdf", newTab: true },
    },
    { id: "toggle-theme", group: "Actions", label: "Toggle theme", hint: "t", action: { type: "theme" } },
    github
      ? {
          id: "copy-github",
          group: "Actions",
          label: "Copy GitHub URL",
          action: { type: "copy", text: github },
        }
      : null,
    {
      id: "copy-site",
      group: "Actions",
      label: "Copy site URL",
      action: { type: "copy", text: r.meta.siteUrl },
    },
    email
      ? { id: "copy-email", group: "Actions", label: "Copy email", action: { type: "copy", text: email } }
      : null,
  ]);

  const open = present([
    email
      ? {
          id: "open-email",
          group: "Open",
          label: "Email",
          action: { type: "href", href: `mailto:${email}`, newTab: false },
        }
      : null,
    linkedin
      ? {
          id: "open-linkedin",
          group: "Open",
          label: "LinkedIn",
          action: { type: "href", href: linkedin, newTab: true },
        }
      : null,
    github
      ? {
          id: "open-github",
          group: "Open",
          label: "GitHub",
          action: { type: "href", href: github, newTab: true },
        }
      : null,
    {
      id: "open-json",
      group: "Open",
      label: "resume.json",
      action: { type: "href", href: "/resume.json", newTab: true },
    },
    {
      id: "open-txt",
      group: "Open",
      label: "resume.txt",
      action: { type: "href", href: "/resume.txt", newTab: true },
    },
  ]);

  const help: Command[] = [
    { id: "help-shortcuts", group: "Help", label: "Keyboard shortcuts", hint: "?", action: { type: "help" } },
  ];

  return [...navigate, ...projects, ...actions, ...open, ...help];
}
