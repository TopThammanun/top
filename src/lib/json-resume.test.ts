import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import type { Resume } from "@/content/types";
import { toJsonResume } from "./json-resume";

function hasEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.some(hasEmptyValue);
  if (typeof value === "object") return Object.values(value).some(hasEmptyValue);
  return false;
}

describe("toJsonResume", () => {
  const json = toJsonResume(resume);

  it("fills basics from the profile", () => {
    expect(json.basics.name).toBe("Thammanun Aikhamdaeng");
    expect(json.basics.label).toBe("Senior Full Stack Developer");
    expect(json.basics.profiles).toContainEqual({
      network: "GitHub",
      username: "TopThammanun",
      url: "https://github.com/TopThammanun",
    });
  });

  it("maps roles to work and leaves the end date off the current one", () => {
    expect(json.work.map((work) => work.position)).toEqual(resume.career.map((role) => role.title));
    expect(json.work[0]).toMatchObject({ name: "Chanwanich Company Limited", startDate: "2026-03" });
    expect(json.work[0]).not.toHaveProperty("endDate");
    expect(json.work[2]).toMatchObject({ startDate: "2022-12", endDate: "2024-03" });
  });

  it("gives each role the highlights of its projects, named by project", () => {
    expect(json.work[0].highlights).toHaveLength(resume.projects[0].highlights.length);
    expect(json.work[0].highlights[0]).toMatch(/^Industrial-estate e-Permit platform: Work across four/);
    expect(
      json.work[1].highlights.filter((h) => h.startsWith("Company website, admin console and API: ")),
    ).toHaveLength(2);
    expect(json.work[2].highlights).toEqual([]);
  });

  it("lists every project, company work first", () => {
    expect(json.projects.map((project) => project.name)).toEqual(resume.projects.map((p) => p.name));
    expect(json.projects[0].type).toBe("client");
  });

  it("maps education and its honors", () => {
    expect(json.education).toEqual([
      {
        institution: "Chiang Mai University",
        area: "Digital Industry Integration (DII)",
        studyType: "Bachelor's degree",
        endDate: "2024-03",
        courses: resume.education[0].coursework,
      },
    ]);
    expect(json.awards).toEqual([
      { title: "First-Class Honors", awarder: "Chiang Mai University", date: "2024-03" },
    ]);
  });

  it("groups skills by category and adds the practice skills", () => {
    expect(json.skills).toHaveLength(resume.categories.length + resume.competencies.length);
  });

  it("carries the email and the LinkedIn profile", () => {
    expect(json.basics.email).toBe(resume.profile.email);
    expect(json.basics.profiles).toContainEqual({
      network: "LinkedIn",
      username: "thammanun-aikhamdaeng-764348448",
      url: resume.profile.linkedin,
    });
  });

  it("has no null or undefined values, with or without contact details", () => {
    const anonymous: Resume = { ...resume, profile: { ...resume.profile, email: null, linkedin: null } };
    expect(hasEmptyValue(json)).toBe(false);
    expect(hasEmptyValue(toJsonResume(anonymous))).toBe(false);
    expect(toJsonResume(anonymous).basics).not.toHaveProperty("email");
  });
});
