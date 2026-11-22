import type { Resume } from "@/content/types";
import { currentRole } from "./career";
import { alternateNames, fullName } from "./identity";
import { absoluteUrl, MACHINE_ROUTES } from "./routes";
import { techUsage } from "./selectors";

const SCHEMA_CONTEXT = "https://schema.org";
const LANGUAGE = "en";
const MIN_PROJECTS_TO_KNOW = 2;

export interface JsonLdNode {
  "@type": string;
  "@id": string;
  [property: string]: unknown;
}

export interface JsonLdGraph {
  "@context": typeof SCHEMA_CONTEXT;
  "@graph": JsonLdNode[];
}

export function seoTitle(r: Resume): string {
  return `${fullName(r.profile)} (${r.profile.handle}) — ${r.profile.title}`;
}

export function seoDescription(r: Resume): string {
  const { profile } = r;
  return `${fullName(profile)} (${profile.displayName}, ${profile.handle}). ${profile.summary[0]}`;
}

export function seoKeywords(r: Resume): string[] {
  const { profile } = r;
  return [
    ...new Set([
      fullName(profile),
      ...alternateNames(profile),
      profile.givenName,
      profile.familyName,
      profile.title,
    ]),
  ];
}

export interface AlternateLink {
  url: string;
  title: string;
}

export function alternateTypes(): Record<string, AlternateLink[]> {
  const types: Record<string, AlternateLink[]> = {};
  for (const route of MACHINE_ROUTES) {
    (types[route.type] ??= []).push({ url: route.path, title: route.label });
  }
  return types;
}

function sameAs(r: Resume): string[] {
  const { links, linkedin } = r.profile;
  return [
    ...links.filter((link) => link.id !== "website").map((link) => link.href),
    ...(linkedin ? [linkedin] : []),
  ];
}

function knowsAbout(r: Resume): string[] {
  const usage = techUsage(r);
  return [
    ...r.tech.filter((tech) => (usage[tech.id] ?? 0) >= MIN_PROJECTS_TO_KNOW).map((tech) => tech.name),
    ...r.competencies.map((competency) => competency.label),
  ];
}

function organization(type: string, name: string): { "@type": string; name: string } {
  return { "@type": type, name };
}

export function structuredData(r: Resume): JsonLdGraph {
  const { profile, meta } = r;
  const site = absoluteUrl(r, "/");
  const name = fullName(profile);
  const person = { "@id": `${site}#person` };
  const website = { "@id": `${site}#website` };
  const employer = currentRole(r)?.employer;

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      {
        "@type": "WebSite",
        ...website,
        url: site,
        name,
        alternateName: alternateNames(profile),
        inLanguage: LANGUAGE,
        publisher: person,
      },
      {
        "@type": "ProfilePage",
        "@id": `${site}#profile`,
        url: site,
        name: seoTitle(r),
        description: seoDescription(r),
        inLanguage: LANGUAGE,
        dateModified: meta.updated,
        isPartOf: website,
        mainEntity: person,
      },
      {
        "@type": "Person",
        ...person,
        name,
        givenName: profile.givenName,
        familyName: profile.familyName,
        alternateName: alternateNames(profile),
        jobTitle: profile.title,
        description: profile.summary.join(" "),
        url: site,
        image: absoluteUrl(r, "/opengraph-image"),
        sameAs: sameAs(r),
        address: { "@type": "PostalAddress", addressCountry: profile.location.label },
        knowsAbout: knowsAbout(r),
        knowsLanguage: profile.languages.map((language) => language.name),
        ...(employer ? { worksFor: organization("Organization", employer) } : {}),
        ...(r.education.length > 0
          ? { alumniOf: r.education.map((e) => organization("CollegeOrUniversity", e.school)) }
          : {}),
        ...(profile.email ? { email: `mailto:${profile.email}` } : {}),
      },
    ],
  };
}

export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
