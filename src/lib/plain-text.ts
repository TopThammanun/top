import type { Project, Resume, YearMonth } from "@/content/types";
import { formatPeriod, periodDuration } from "./format";
import { fullName } from "./identity";
import { absoluteUrl, MACHINE_ROUTES } from "./routes";
import { skillGroups, techName } from "./selectors";

const WIDTH = 80;
const INDENT = "  ";
const BULLET = "- ";

export function wrap(text: string, width: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const pieces = word.match(new RegExp(`.{1,${width}}`, "gu")) ?? [word];
    for (const piece of pieces) {
      if (!line) line = piece;
      else if (line.length + 1 + piece.length <= width) line = `${line} ${piece}`;
      else {
        lines.push(line);
        line = piece;
      }
    }
  }
  if (line) lines.push(line);
  return lines;
}

function hanging(text: string, first: string, rest: string): string[] {
  return wrap(text, WIDTH - first.length).map((line, i) => (i === 0 ? first : rest) + line);
}

function spread(left: string, right: string): string[] {
  const gap = WIDTH - left.length - right.length;
  return gap >= 2 ? [left + " ".repeat(gap) + right] : [left, right];
}

function heading(title: string): string[] {
  return ["", title.toUpperCase(), "-".repeat(title.length)];
}

function projectBlock(r: Resume, p: Project, now: YearMonth): string[] {
  return [
    "",
    ...spread(p.name, `${formatPeriod(p.period)} (${periodDuration(p.period, now)})`),
    ...hanging(`${p.role} · ${p.domain}`, INDENT, INDENT),
    ...hanging(p.summary, INDENT, INDENT),
    ...p.highlights.flatMap((h) => hanging(h, INDENT + BULLET, INDENT + " ".repeat(BULLET.length))),
    ...hanging(`Stack: ${p.stack.map((id) => techName(r, id)).join(", ")}`, INDENT, INDENT),
  ];
}

export function toPlainText(r: Resume, now: YearMonth): string {
  const { profile, meta } = r;
  const contacts = [...profile.links.map((l) => l.value), profile.email, profile.linkedin].filter(
    (value): value is string => Boolean(value),
  );

  return [
    fullName(profile).toUpperCase(),
    ...wrap(`${profile.title} · ${profile.location.label} (${profile.location.utcOffset})`, WIDTH),
    ...wrap(contacts.join(" · "), WIDTH),
    "=".repeat(WIDTH),
    ...heading("Summary"),
    ...profile.summary.flatMap((s) => wrap(s, WIDTH)),
    ...heading("Experience"),
    ...r.projects.filter((p) => p.kind === "client").flatMap((p) => projectBlock(r, p, now)),
    ...heading("Projects"),
    ...r.projects.filter((p) => p.kind !== "client").flatMap((p) => projectBlock(r, p, now)),
    ...heading("Skills"),
    ...skillGroups(r).flatMap((group) => hanging(group.names.join(", "), `${group.label}: `, INDENT)),
    ...heading("Languages"),
    ...wrap(profile.languages.map((l) => `${l.name} (${l.level})`).join(" · "), WIDTH),
    ...heading("Machine-readable"),
    ...MACHINE_ROUTES.map((route) => absoluteUrl(r, route.path)),
    "",
    `v${meta.version} · updated ${meta.updated}`,
    "",
  ].join("\n");
}
