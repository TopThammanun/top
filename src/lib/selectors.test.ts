import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import {
  companyProjects,
  personalProjects,
  projectGroup,
  projectImages,
  projectsUsing,
  skillGroups,
  techGroups,
  techName,
  techUsage,
} from "./selectors";

describe("projectsUsing", () => {
  it("finds the projects whose stack has the tech", () => {
    expect(projectsUsing(resume, "postgresql").map((p) => p.slug)).toEqual(["epermit", "abc"]);
  });
});

describe("techUsage", () => {
  it("counts every tech, including unused ones", () => {
    const usage = techUsage(resume);
    expect(Object.keys(usage)).toHaveLength(resume.tech.length);
    expect(usage.postgresql).toBe(2);
    expect(usage.typescript).toBe(5);
    expect(usage.javascript).toBe(0);
  });
});

describe("project groups", () => {
  it("treats client work as company projects and the rest as personal", () => {
    expect(companyProjects(resume).map((p) => p.slug)).toEqual(["epermit", "abc", "tch"]);
    expect(personalProjects(resume).map((p) => p.slug)).toEqual([
      "agent-tooling",
      "tcg-simulator",
      "godot-games",
      "site-v1",
    ]);
    expect(projectGroup(resume.projects[0])).toBe("company");
  });
});

describe("projectImages", () => {
  it("collects the images of every chapter and is empty without chapters", () => {
    const godot = resume.projects.find((p) => p.slug === "godot-games");
    expect(godot && projectImages(godot)).toHaveLength(14);
    expect(projectImages(resume.projects[0])).toEqual([]);
  });
});

describe("techGroups", () => {
  it("marks tech by the most serious place it was used", () => {
    const groups = techGroups(resume);
    expect(groups.postgresql).toBe("company");
    expect(groups.typescript).toBe("company");
    expect(groups.svelte).toBe("personal");
    expect(groups.javascript).toBeNull();
  });
});

describe("techName", () => {
  it("returns the display name", () => {
    expect(techName(resume, "dotnet")).toBe("ASP.NET Core (.NET 8)");
  });

  it("falls back to the id", () => {
    expect(techName(resume, "nope")).toBe("nope");
  });
});

describe("skillGroups", () => {
  it("names the tech of every category in content order", () => {
    const groups = skillGroups(resume);
    expect(groups.map((g) => g.label)).toEqual(resume.categories.map((c) => c.label));
    expect(groups[0]).toEqual({
      label: "Languages",
      names: ["C#", "TypeScript", "JavaScript", "SQL", "Python", "GDScript"],
    });
    expect(groups.flatMap((g) => g.names)).toHaveLength(resume.tech.length);
  });
});
