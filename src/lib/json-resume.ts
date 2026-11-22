import type { LinkId, Period, Project, Resume } from "@/content/types";
import { fullName } from "./identity";
import { absoluteUrl, linkHref } from "./routes";
import { companyProjects, personalProjects, skillGroups, techName } from "./selectors";

const SCHEMA_URL = "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json";

interface JsonResumeProfile {
  network: string;
  username: string;
  url: string;
}

interface JsonResumeDates {
  startDate: string;
  endDate?: string;
}

interface JsonResumeWork extends JsonResumeDates {
  name: string;
  position: string;
  summary: string;
  highlights: string[];
}

interface JsonResumeProject extends JsonResumeDates {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  roles: string[];
  type: string;
}

export interface JsonResume {
  $schema: string;
  basics: {
    name: string;
    label: string;
    url?: string;
    email?: string;
    summary: string;
    location: { region: string };
    profiles: JsonResumeProfile[];
  };
  work: JsonResumeWork[];
  projects: JsonResumeProject[];
  skills: { name: string; keywords: string[] }[];
  languages: { language: string; fluency: string }[];
  meta: { canonical: string; version: string; lastModified: string };
}

function dates(period: Period): JsonResumeDates {
  return period.end ? { startDate: period.start, endDate: period.end } : { startDate: period.start };
}

function username(href: string): string {
  return new URL(href).pathname.split("/").filter(Boolean).at(-1) ?? href;
}

const NON_PROFILE_LINKS: ReadonlySet<LinkId> = new Set(["website", "email", "linkedin"]);

function profiles(r: Resume): JsonResumeProfile[] {
  const social = r.profile.links
    .filter((link) => !NON_PROFILE_LINKS.has(link.id))
    .map((link) => ({ network: link.label, username: username(link.href), url: link.href }));
  const linkedin = r.profile.linkedin;
  return linkedin
    ? [...social, { network: "LinkedIn", username: username(linkedin), url: linkedin }]
    : social;
}

function toProject(r: Resume, p: Project): JsonResumeProject {
  return {
    name: p.name,
    description: p.summary,
    highlights: p.highlights,
    keywords: p.stack.map((id) => techName(r, id)),
    roles: [p.role],
    type: p.kind,
    ...dates(p.period),
  };
}

export function toJsonResume(r: Resume): JsonResume {
  const { profile, meta } = r;
  const website = linkHref(r, "website");

  return {
    $schema: SCHEMA_URL,
    basics: {
      name: fullName(profile),
      label: profile.title,
      ...(website ? { url: website } : {}),
      ...(profile.email ? { email: profile.email } : {}),
      summary: profile.summary.join(" "),
      location: { region: profile.location.label },
      profiles: profiles(r),
    },
    work: companyProjects(r).map((p) => ({
      name: p.name,
      position: p.role,
      summary: p.summary,
      highlights: p.highlights,
      ...dates(p.period),
    })),
    projects: personalProjects(r).map((p) => toProject(r, p)),
    skills: skillGroups(r).map((group) => ({ name: group.label, keywords: group.names })),
    languages: profile.languages.map((l) => ({ language: l.name, fluency: l.level })),
    meta: {
      canonical: absoluteUrl(r, "/resume.json"),
      version: `v${meta.version}`,
      lastModified: meta.updated,
    },
  };
}
