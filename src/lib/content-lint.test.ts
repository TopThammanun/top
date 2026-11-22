import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import type { ProjectImage, Resume, YearMonth } from "@/content/types";
import { lintResume } from "./content-lint";

function withChange(change: (r: Resume) => void): Resume {
  const copy = structuredClone(resume);
  change(copy);
  return copy;
}

const GALLERY = resume.projects.findIndex((project) => (project.chapters?.[0]?.images.length ?? 0) > 0);

function galleryImage(r: Resume): ProjectImage {
  const image = r.projects[GALLERY]?.chapters?.[0]?.images[0];
  if (!image) throw new Error("expected a project with a gallery");
  return image;
}

describe("lintResume", () => {
  it("passes the real resume with nothing pending", () => {
    expect(lintResume(resume)).toEqual({ errors: [], pending: [] });
  });

  it("lists a missing email and LinkedIn as pending", () => {
    const anonymous = withChange((r) => Object.assign(r.profile, { email: null, linkedin: null }));
    expect(lintResume(anonymous).pending).toEqual(["profile.email", "profile.linkedin"]);
  });

  it.each<[string, (r: Resume) => void, string]>([
    [
      "duplicate slug",
      (r) => r.projects.push({ ...r.projects[0] }),
      `projects[${resume.projects.length}].slug`,
    ],
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
    [
      "non-https project link",
      (r) => (r.projects[4].links = [{ label: "Demo", href: "http://example.com" }]),
      "projects[4].links[0].href",
    ],
    [
      "chapter image outside the media folder",
      (r) => (galleryImage(r).src = "/elsewhere/shot.webp"),
      `projects[${GALLERY}].chapters[0].images[0].src`,
    ],
    ["empty competency", (r) => (r.competencies[0].items = []), "competencies[0].items"],
    [
      "role period out of order",
      (r) => (r.career[0].period = { start: "2026-03", end: "2026-01" }),
      "career[0].period",
    ],
    ["role without a summary", (r) => (r.career[1].summary = ""), "career[1].summary"],
    [
      "non-https role link",
      (r) => (r.career[2].links[0].href = "http://example.com"),
      "career[2].links[0].href",
    ],
    ["two current roles", (r) => (r.career[1].period.end = null), "career has 2 current roles"],
    [
      "bad graduation month",
      (r) => (r.education[0].graduated = "2024-3" as YearMonth),
      "education[0].graduated",
    ],
    ["unknown education project", (r) => (r.education[0].projects = ["nope"]), "education[0].projects[0]"],
    [
      "personal project without an image",
      (r) => (r.projects[GALLERY].chapters = []),
      `projects[${GALLERY}] is a personal project without an image`,
    ],
    [
      "chapter image without a caption",
      (r) => (galleryImage(r).caption = ""),
      `projects[${GALLERY}].chapters[0].images[0]`,
    ],
  ])("reports %s", (_name, change, path) => {
    const { errors } = lintResume(withChange(change));
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain(path);
  });

  it("lists education as pending while it is empty", () => {
    expect(lintResume(withChange((r) => (r.education = []))).pending).toContain("education");
  });

  it("ships every chapter image under public", () => {
    const images = resume.projects.flatMap((p) => p.chapters ?? []).flatMap((chapter) => chapter.images);
    expect(images.length).toBeGreaterThan(0);
    const missing = images.filter((image) => !existsSync(join(process.cwd(), "public", image.src)));
    expect(missing.map((image) => image.src)).toEqual([]);
  });
});
