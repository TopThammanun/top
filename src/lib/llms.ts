import type { Resume } from "@/content/types";
import { projectAnchor } from "./anchors";
import { formatPeriod } from "./format";
import { fullName } from "./identity";
import { absoluteUrl, MACHINE_ROUTES } from "./routes";
import { skillGroups } from "./selectors";

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
    "## Resume",
    "",
    ...MACHINE_ROUTES.map((route) => `- [${route.label}](${absoluteUrl(r, route.path)})`),
    "",
    "## Work",
    "",
    ...r.projects.map(
      (p) =>
        `- [${p.name}](${absoluteUrl(r, `/#${projectAnchor(p.slug)}`)}): ${formatPeriod(p.period)}, ${p.kind}. ${p.summary}`,
    ),
    "",
    "## Skills",
    "",
    ...skillGroups(r).map((group) => `- ${group.label}: ${group.names.join(", ")}`),
    "",
    "## Contact",
    "",
    ...contactLinks.map((l) => `- [${l.label}](${l.href})`),
    "",
  ].join("\n");
}
