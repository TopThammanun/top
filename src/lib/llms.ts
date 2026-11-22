import type { Education, Project, Resume, Role } from "@/content/types";
import { projectAnchor } from "./anchors";
import { educationDegree, educationWhen, roleHeading } from "./career";
import { formatFormalPeriod } from "./format";
import { fullName } from "./identity";
import { absoluteUrl, MACHINE_ROUTES, projectPath } from "./routes";
import { companyProjects, personalProjects, skillGroups } from "./selectors";

function projectLine(r: Resume, p: Project, path: string): string {
  return `- [${p.name}](${absoluteUrl(r, path)}): ${p.role}, ${formatFormalPeriod(p.period)}. ${p.summary}`;
}

function roleLine(role: Role): string {
  const stack = role.stack.length > 0 ? ` Technologies: ${role.stack.join(", ")}.` : "";
  return `- ${roleHeading(role)}: ${role.summary}${stack}`;
}

function educationLine(education: Education): string {
  const coursework =
    education.coursework.length > 0 ? ` Coursework: ${education.coursework.join(", ")}.` : "";
  return `- ${education.school}: ${educationDegree(education)}. ${educationWhen(education)}.${coursework}`;
}

function section(title: string, lines: string[]): string[] {
  return lines.length > 0 ? [`## ${title}`, "", ...lines, ""] : [];
}

export function toLlmsTxt(r: Resume): string {
  const { profile } = r;
  const name = fullName(profile);
  const contactLinks = [
    ...profile.links.map((l) => ({ label: l.label, href: l.href })),
    ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin }] : []),
    ...(profile.email ? [{ label: "Email", href: `mailto:${profile.email}` }] : []),
  ];

  return [
    `# ${name}`,
    "",
    `> ${name}, also known as ${profile.displayName} (${profile.handle}): ${profile.title} based in ${profile.location.label} (${profile.location.utcOffset}).`,
    "",
    ...profile.summary,
    "",
    `Now: ${profile.now}.`,
    "",
    ...section(
      "Resume",
      MACHINE_ROUTES.map((route) => `- [${route.label}](${absoluteUrl(r, route.path)})`),
    ),
    ...section("Career", r.career.map(roleLine)),
    ...section("Education", r.education.map(educationLine)),
    ...section(
      "Company projects",
      companyProjects(r).map((p) => projectLine(r, p, `/#${projectAnchor(p.slug)}`)),
    ),
    ...section(
      "Personal projects",
      personalProjects(r).map((p) => projectLine(r, p, projectPath(p.slug))),
    ),
    ...section(
      "Skills",
      skillGroups(r).map((group) => `- ${group.label}: ${group.names.join(", ")}`),
    ),
    ...section(
      "Contact",
      contactLinks.map((l) => `- [${l.label}](${l.href})`),
    ),
  ].join("\n");
}
