import type { Resume } from "@/content/types";
import { formatPeriod } from "./format";
import { absoluteUrl, MACHINE_ROUTES } from "./routes";

export function toLlmsTxt(r: Resume): string {
  const { profile } = r;
  const contactLinks = [
    ...profile.links.map((l) => ({ label: l.label, href: l.href })),
    ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin }] : []),
    ...(profile.email ? [{ label: "Email", href: `mailto:${profile.email}` }] : []),
  ];

  return [
    `# ${profile.fullName ?? profile.displayName}`,
    "",
    `> ${profile.title}. ${profile.tagline}`,
    "",
    ...profile.summary,
    "",
    `Now: ${profile.now}. Location: ${profile.location.label} (${profile.location.utcOffset}).`,
    "",
    "## Resume",
    "",
    ...MACHINE_ROUTES.map((route) => `- [${route.label}](${absoluteUrl(r, route.path)})`),
    "",
    "## Work",
    "",
    ...r.projects.map(
      (p) =>
        `- [${p.name}](${absoluteUrl(r, `/#work-${p.slug}`)}): ${formatPeriod(p.period)}, ${p.kind}. ${p.summary}`,
    ),
    "",
    "## Contact",
    "",
    ...contactLinks.map((l) => `- [${l.label}](${l.href})`),
    "",
  ].join("\n");
}
