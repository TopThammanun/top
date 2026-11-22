import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import type { Education, Resume, Role } from "@/content/types";
import {
  careerLadder,
  careerSteps,
  currentRole,
  educationDegree,
  educationHeadline,
  educationProjects,
  educationWhen,
  roleHeading,
} from "./career";

const role: Role = {
  id: "role",
  title: "Developer",
  employer: "Employer",
  period: { start: "2024-04", end: "2026-03" },
  summary: "Summary.",
  stack: ["React"],
  links: [{ label: "Product", href: "https://example.com" }],
};

const education: Education = {
  school: "School",
  program: "Program",
  honors: "Honors",
  graduated: "2024-03",
  coursework: ["Course"],
  projects: [],
};

describe("careerLadder", () => {
  const titled = (...titles: string[]): Resume => ({
    ...resume,
    career: titles.map((title) => ({ ...role, id: title, title })),
  });

  it("walks the roles from first to latest and keeps the shared ending once", () => {
    expect(careerLadder(titled("Senior Web Developer", "Junior Web Developer", "Intern Web Developer"))).toBe(
      "Intern → Junior → Senior Web Developer",
    );
  });

  it("keeps whole titles when they share no ending", () => {
    expect(careerLadder(titled("Team Lead", "Developer"))).toBe("Developer → Team Lead");
  });

  it("never strips a title down to nothing", () => {
    expect(careerLadder(titled("Senior Developer", "Developer"))).toBe("Developer → Senior Developer");
  });

  it("is the title itself for a single role and null without roles", () => {
    expect(careerLadder(titled("Developer"))).toBe("Developer");
    expect(careerLadder(titled())).toBeNull();
  });

  it("reads Intern to Senior for the real career", () => {
    expect(careerLadder(resume)).toBe("Intern → Junior → Senior Full Stack Developer");
  });
});

describe("roleHeading", () => {
  it("names the title, employer and period", () => {
    expect(roleHeading(role)).toBe("Developer, Employer (Apr 2024 – Mar 2026)");
  });

  it("shows an open period as Present", () => {
    expect(roleHeading({ ...role, period: { start: "2026-03", end: null } })).toBe(
      "Developer, Employer (Mar 2026 – Present)",
    );
  });
});

describe("currentRole", () => {
  it("is the role with an open period", () => {
    const open: Role = { ...role, id: "open", period: { start: "2026-03", end: null } };
    expect(currentRole({ ...resume, career: [open, role] })?.id).toBe("open");
  });

  it("is null when no role has an open period", () => {
    expect(currentRole({ ...resume, career: [role] })).toBeNull();
  });
});

describe("education helpers", () => {
  it("joins the program and honors", () => {
    expect(educationDegree(education)).toBe("Program · Honors");
    expect(educationDegree({ ...education, honors: null })).toBe("Program");
  });

  it("joins the school and honors", () => {
    expect(educationHeadline(education)).toBe("School · Honors");
    expect(educationHeadline({ ...education, honors: null })).toBe("School");
  });

  it("writes the graduation month", () => {
    expect(educationWhen(education)).toBe("Graduated Mar 2024");
  });

  it("resolves the projects done there", () => {
    const slug = resume.projects[0].slug;
    expect(educationProjects(resume, { ...education, projects: [slug] }).map((p) => p.slug)).toEqual([slug]);
    expect(educationProjects(resume, education)).toEqual([]);
  });
});

describe("careerSteps", () => {
  const open: Role = { ...role, id: "latest", period: { start: "2026-03", end: null } };
  const r: Resume = { ...resume, education: [education], career: [open, { ...role, id: "first" }] };
  const steps = careerSteps(r);

  it("starts with education and runs from the first role to the latest", () => {
    expect(steps.map((step) => step.id)).toEqual(["School", "first", "latest"]);
    expect(steps.map((step) => step.kind)).toEqual(["education", "role", "role"]);
  });

  it("marks only the open role as current", () => {
    expect(steps.map((step) => step.current)).toEqual([false, false, true]);
  });

  it("describes an education step", () => {
    expect(steps[0]).toMatchObject({
      title: "School",
      subtitle: "Program",
      distinction: "Honors",
      when: "Graduated Mar 2024",
      summary: null,
      chips: { label: "Coursework", items: ["Course"] },
    });
  });

  it("describes a role step", () => {
    expect(steps[1]).toMatchObject({
      title: "Developer",
      subtitle: "Employer",
      distinction: null,
      when: "Apr 2024 – Mar 2026",
      summary: "Summary.",
      chips: { label: "Stack", items: ["React"] },
      links: role.links,
    });
  });
});

describe("career content", () => {
  it("has one current role and its title is the profile title", () => {
    expect(resume.career.filter((step) => step.period.end === null)).toHaveLength(1);
    expect(currentRole(resume)?.title).toBe(resume.profile.title);
  });
});
