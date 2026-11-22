import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { countByKind, projectsUsing, techName, techUsage } from "./selectors";

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

describe("countByKind", () => {
  it("counts projects per kind", () => {
    expect(countByKind(resume)).toEqual({ all: 7, client: 3, tooling: 1, side: 3 });
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
