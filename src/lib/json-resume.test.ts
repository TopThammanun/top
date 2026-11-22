import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
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

  it("maps roles to work and dates only the ones with a known period", () => {
    expect(json.work.map((work) => work.position)).toEqual(resume.career.map((role) => role.title));
    expect(json.work[0]).toMatchObject({ name: "Chanwanich Company Limited", startDate: "2026-03" });
    expect(json.work[0]).not.toHaveProperty("endDate");
    expect(json.work[1]).not.toHaveProperty("startDate");
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

  it("has no null or undefined values and no email", () => {
    expect(hasEmptyValue(json)).toBe(false);
    expect(json.basics).not.toHaveProperty("email");
  });
});
