import type { Period, Resume } from "@/content/types";

const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

function duplicates(values: string[]): Set<number> {
  const seen = new Set<string>();
  const found = new Set<number>();
  values.forEach((value, i) => {
    if (seen.has(value)) found.add(i);
    seen.add(value);
  });
  return found;
}

function lintPeriod(period: Period, path: string): string[] {
  const errors: string[] = [];
  const startValid = YEAR_MONTH.test(period.start);
  const endValid = period.end === null || YEAR_MONTH.test(period.end);
  if (!startValid) errors.push(`${path}.start is not YYYY-MM: "${period.start}"`);
  if (!endValid) errors.push(`${path}.end is not YYYY-MM: "${period.end}"`);
  if (startValid && endValid && period.end !== null && period.end < period.start) {
    errors.push(`${path} ends before it starts`);
  }
  return errors;
}

const PROJECT_MEDIA_ROOT = "/projects/";

function lintHref(href: string, path: string): string[] {
  return href.startsWith("https://") ? [] : [`${path} must be https: "${href}"`];
}

export function lintResume(r: Resume): { errors: string[]; pending: string[] } {
  const errors: string[] = [];
  const categoryIds = new Set(r.categories.map((c) => c.id));
  const techIds = new Set(r.tech.map((t) => t.id));
  const slugs = new Set(r.projects.map((p) => p.slug));

  r.profile.links.forEach((link, i) => errors.push(...lintHref(link.href, `profile.links[${i}].href`)));
  if (r.profile.linkedin !== null) errors.push(...lintHref(r.profile.linkedin, "profile.linkedin"));

  duplicates(r.tech.map((t) => t.id)).forEach((i) =>
    errors.push(`tech[${i}].id is duplicated: "${r.tech[i].id}"`),
  );
  r.tech.forEach((t, i) => {
    if (!categoryIds.has(t.category)) errors.push(`tech[${i}].category is unknown: "${t.category}"`);
  });

  duplicates(r.projects.map((p) => p.slug)).forEach((i) =>
    errors.push(`projects[${i}].slug is duplicated: "${r.projects[i].slug}"`),
  );
  r.projects.forEach((p, i) => {
    const path = `projects[${i}]`;
    errors.push(...lintPeriod(p.period, `${path}.period`));
    if (p.highlights.length === 0) errors.push(`${path}.highlights is empty`);
    p.stack.forEach((id, j) => {
      if (!techIds.has(id)) errors.push(`${path}.stack[${j}] is an unknown tech: "${id}"`);
    });
    p.links?.forEach((link, j) => errors.push(...lintHref(link.href, `${path}.links[${j}].href`)));
    p.chapters?.forEach((chapter, j) => {
      if (chapter.body.length === 0) errors.push(`${path}.chapters[${j}].body is empty`);
      chapter.images.forEach((image, k) => {
        const at = `${path}.chapters[${j}].images[${k}]`;
        if (!image.src.startsWith(PROJECT_MEDIA_ROOT))
          errors.push(`${at}.src is outside ${PROJECT_MEDIA_ROOT}`);
        if (!image.alt || !image.caption) errors.push(`${at} needs alt text and a caption`);
      });
    });
  });

  r.timeline.forEach((event, i) => {
    if (!YEAR_MONTH.test(event.date)) errors.push(`timeline[${i}].date is not YYYY-MM: "${event.date}"`);
    if (!slugs.has(event.project)) errors.push(`timeline[${i}].project is unknown: "${event.project}"`);
  });
  const heads = r.timeline.filter((event) => event.head).length;
  if (heads > 1) errors.push(`timeline has ${heads} head events, expected at most 1`);

  r.competencies.forEach((competency, i) => {
    if (competency.items.length === 0) errors.push(`competencies[${i}].items is empty`);
  });

  r.career.forEach((role, i) => {
    const path = `career[${i}]`;
    errors.push(...lintPeriod(role.period, `${path}.period`));
    if (!role.summary) errors.push(`${path}.summary is empty`);
    role.links.forEach((link, j) => errors.push(...lintHref(link.href, `${path}.links[${j}].href`)));
  });
  const current = r.career.filter((role) => role.period.end === null).length;
  if (current > 1) errors.push(`career has ${current} current roles, expected at most 1`);

  r.education.forEach((education, i) => {
    const path = `education[${i}]`;
    if (!YEAR_MONTH.test(education.graduated)) {
      errors.push(`${path}.graduated is not YYYY-MM: "${education.graduated}"`);
    }
    education.projects.forEach((slug, j) => {
      if (!slugs.has(slug)) errors.push(`${path}.projects[${j}] is unknown: "${slug}"`);
    });
  });

  const pending = [
    r.profile.email === null && "profile.email",
    r.profile.linkedin === null && "profile.linkedin",
    r.education.length === 0 && "education",
  ].filter((field): field is string => typeof field === "string");

  return { errors, pending };
}
