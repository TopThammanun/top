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
    expect(json.basics.name).toBe("Top Thammanun");
    expect(json.basics.label).toBe("Full-Stack Developer");
    expect(json.basics.profiles).toContainEqual({
      network: "GitHub",
      username: "TopThammanun",
      url: "https://github.com/TopThammanun",
    });
  });

  it("maps client projects to work and the rest to projects", () => {
    expect(json.work).toHaveLength(3);
    expect(json.projects).toHaveLength(4);
    expect(json.work[0]).not.toHaveProperty("endDate");
  });

  it("groups skills by category", () => {
    expect(json.skills).toHaveLength(resume.categories.length);
  });

  it("has no null or undefined values and no email", () => {
    expect(hasEmptyValue(json)).toBe(false);
    expect(json.basics).not.toHaveProperty("email");
  });
});
