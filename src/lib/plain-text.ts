import type { Education, Project, Resume, Role } from "@/content/types";
import { educationDegree, educationWhen, roleProjects } from "./career";
import { formatFormalPeriod } from "./format";
import { fullName } from "./identity";
import { absoluteUrl, MACHINE_ROUTES } from "./routes";
import { personalProjects, skillGroups, techName } from "./selectors";

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

function indented(text: string): string[] {
  return hanging(text, INDENT, INDENT);
}

function spread(left: string, right: string): string[] {
  const gap = WIDTH - left.length - right.length;
  return gap >= 2 ? [left + " ".repeat(gap) + right] : [left, right];
}

function heading(title: string): string[] {
  return ["", title.toUpperCase(), "-".repeat(title.length)];
}

function projectBody(r: Resume, p: Project): string[] {
  return [
    ...indented(p.summary),
    ...p.highlights.flatMap((h) => hanging(h, INDENT + BULLET, INDENT + " ".repeat(BULLET.length))),
    ...indented(`Technologies: ${p.stack.map((id) => techName(r, id)).join(", ")}`),
  ];
}

function roleProjectBlock(r: Resume, p: Project): string[] {
  return [
    "",
    ...indented(`Project: ${p.name} (${formatFormalPeriod(p.period)})`),
    ...indented(p.domain),
    ...projectBody(r, p),
  ];
}

function roleBlock(r: Resume, role: Role): string[] {
  return [
    "",
    ...spread(role.title, formatFormalPeriod(role.period)),
    ...indented(role.employer),
    ...indented(role.summary),
    ...(role.stack.length > 0 ? indented(`Technologies: ${role.stack.join(", ")}`) : []),
    ...roleProjects(r, role).flatMap((p) => roleProjectBlock(r, p)),
  ];
}

function projectBlock(r: Resume, p: Project): string[] {
  return [
    "",
    ...spread(p.name, formatFormalPeriod(p.period)),
    ...indented(`${p.role} · ${p.domain}`),
    ...projectBody(r, p),
  ];
}

function educationBlock(education: Education): string[] {
  return [
    "",
    ...spread(education.school, educationWhen(education)),
    ...indented(educationDegree(education)),
    ...(education.coursework.length > 0 ? indented(`Coursework: ${education.coursework.join(", ")}`) : []),
  ];
}

function titled(title: string, lines: string[]): string[] {
  return lines.length > 0 ? [...heading(title), ...lines] : [];
}

export function toPlainText(r: Resume): string {
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
    ...titled(
      "Experience",
      r.career.flatMap((role) => roleBlock(r, role)),
    ),
    ...titled(
      "Projects",
      personalProjects(r).flatMap((p) => projectBlock(r, p)),
    ),
    ...heading("Skills"),
    ...skillGroups(r).flatMap((group) => hanging(group.names.join(", "), `${group.label}: `, INDENT)),
    ...titled("Education", r.education.flatMap(educationBlock)),
    ...heading("Languages"),
    ...wrap(profile.languages.map((l) => `${l.name} (${l.level})`).join(" · "), WIDTH),
    ...heading("Machine-readable"),
    ...MACHINE_ROUTES.map((route) => absoluteUrl(r, route.path)),
    "",
    `v${meta.version} · updated ${meta.updated}`,
    "",
  ].join("\n");
}
