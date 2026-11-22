import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import type { Resume, YearMonth } from "@/content/types";
import { lintResume } from "./content-lint";

function withChange(change: (r: Resume) => void): Resume {
  const copy = structuredClone(resume);
  change(copy);
  return copy;
}

describe("lintResume", () => {
  it("passes the real resume and lists pending fields", () => {
    expect(lintResume(resume)).toEqual({
      errors: [],
      pending: ["profile.fullName", "profile.email", "profile.linkedin", "education"],
    });
  });

  it.each<[string, (r: Resume) => void, string]>([
    ["duplicate slug", (r) => r.projects.push({ ...r.projects[0] }), "projects[7].slug"],
    ["duplicate tech id", (r) => r.tech.push({ ...r.tech[0] }), `tech[${resume.tech.length}].id`],
    ["unknown category", (r) => (r.tech[0].category = "nope"), "tech[0].category"],
    ["unknown stack id", (r) => r.projects[0].stack.push("nope"), "projects[0].stack"],
    ["unknown timeline project", (r) => (r.timeline[0].project = "nope"), "timeline[0].project"],
    ["bad YYYY-MM", (r) => (r.projects[0].period.start = "2024-13" as YearMonth), "projects[0].period.start"],
    ["end before start", (r) => (r.projects[1].period.end = "2024-01"), "projects[1].period"],
    ["empty highlights", (r) => (r.projects[0].highlights = []), "projects[0].highlights"],
    ["two head events", (r) => (r.timeline[0].head = true), "timeline"],
    [
      "non-https href",
      (r) => (r.profile.links[0].href = "http://github.com/TopThammanun"),
      "profile.links[0].href",
    ],
  ])("reports %s", (_name, change, path) => {
    const { errors } = lintResume(withChange(change));
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain(path);
  });
});
