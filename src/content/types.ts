export type YearMonth = `${number}-${number}`;

export type ProjectKind = "client" | "tooling" | "side";
export type ProjectGroup = "company" | "personal";
export type Lane = "main" | "branch";
export type LinkId = "github" | "website" | "email" | "linkedin";

export interface ContactLink {
  id: LinkId;
  label: string;
  value: string;
  href: string;
}

export interface Profile {
  handle: string;
  givenName: string;
  familyName: string;
  nickname: string;
  displayName: string;
  title: string;
  roles: string[];
  tagline: string;
  summary: string[];
  now: string;
  location: { label: string; timeZone: string; utcOffset: string };
  links: ContactLink[];
  email: string | null;
  linkedin: string | null;
  languages: { name: string; level: string }[];
}

export interface TechCategory {
  id: string;
  label: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: string;
}

export interface Period {
  start: YearMonth;
  end: YearMonth | null;
}

export interface Layer {
  label: string;
  items: string[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface ProjectChapter {
  title: string;
  body: string[];
  images: ProjectImage[];
}

export interface Project {
  slug: string;
  name: string;
  kind: ProjectKind;
  domain: string;
  role: string;
  period: Period;
  summary: string;
  highlights: string[];
  layers: Layer[];
  stats: Stat[];
  stack: string[];
  links?: ExternalLink[];
  chapters?: ProjectChapter[];
}

export interface TimelineEvent {
  date: YearMonth;
  lane: Lane;
  project: string;
  message: string;
  head?: boolean;
}

export interface Practice {
  title: string;
  body: string;
}

export interface Role {
  id: string;
  title: string;
  employer: string;
  period: Period | null;
  months: number | null;
  summary: string;
  stack: string[];
  links: ExternalLink[];
}

export interface Education {
  school: string;
  program: string;
  honors: string | null;
  graduated: YearMonth;
  coursework: string[];
  projects: string[];
}

export interface Competency {
  label: string;
  items: string[];
}

export type DayCommits = readonly [company: number, personal: number];

export interface CommitActivity {
  from: string;
  to: string;
  days: Record<string, DayCommits>;
}

export interface ResumeMeta {
  version: string;
  updated: string;
  siteUrl: string;
  statsAsOf: string;
}

export interface Resume {
  meta: ResumeMeta;
  profile: Profile;
  categories: TechCategory[];
  tech: TechItem[];
  projects: Project[];
  timeline: TimelineEvent[];
  practices: Practice[];
  competencies: Competency[];
  career: Role[];
  education: Education[];
}
