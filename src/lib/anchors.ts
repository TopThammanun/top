const PROJECT_PREFIX = "work-";

export function projectAnchor(slug: string): string {
  return `${PROJECT_PREFIX}${slug}`;
}

export function slugFromHash(hash: string): string | null {
  return hash.startsWith(`#${PROJECT_PREFIX}`) ? hash.slice(PROJECT_PREFIX.length + 1) || null : null;
}
