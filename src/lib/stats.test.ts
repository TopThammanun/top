import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { careerStats, formatCount, parseCount } from "./stats";

describe("parseCount", () => {
  it.each([
    ["4", { value: 4, approximate: false }],
    ["700+", { value: 700, approximate: true }],
    ["1.9k+", { value: 1900, approximate: true }],
    ["3k", { value: 3000, approximate: false }],
  ])("reads %s", (text, expected) => {
    expect(parseCount(text)).toEqual(expected);
  });

  it("rejects text that is not a count", () => {
    expect(parseCount("many")).toBeNull();
  });
});

describe("formatCount", () => {
  it("keeps small numbers as they are", () => {
    expect(formatCount({ value: 24, approximate: false })).toBe("24");
  });

  it("rounds thousands down so a lower bound stays a lower bound", () => {
    expect(formatCount({ value: 2890, approximate: true })).toBe("2.8k+");
    expect(formatCount({ value: 3000, approximate: false })).toBe("3k");
  });
});

describe("careerStats", () => {
  it("leads with the time since the first role and then counts company work", () => {
    expect(careerStats(resume, "2026-11")).toEqual([
      { value: "4y", label: "Experience", note: "since Dec 2022, incl. internship" },
      { value: "3", label: "Company projects" },
      { value: "24", label: "Repositories" },
      { value: "2.8k+", label: "Commits" },
    ]);
  });

  it("stops the clock at the last end date when no role is open", () => {
    const closed = structuredClone(resume);
    closed.career[0].period.end = "2026-09";
    expect(careerStats(closed, "2030-01")[0].value).toBe("3y 10m");
  });

  it("does not mention an internship that is not in the career", () => {
    const hired = structuredClone(resume);
    hired.career = hired.career.filter((role) => role.employment !== "internship");
    expect(careerStats(hired, "2026-11")[0]).toEqual({
      value: "2y 8m",
      label: "Experience",
      note: "since Apr 2024",
    });
  });

  it("leaves the experience out without a career", () => {
    expect(careerStats({ ...resume, career: [] }, "2026-11").map((stat) => stat.label)).toEqual([
      "Company projects",
      "Repositories",
      "Commits",
    ]);
  });

  it("returns nothing without company projects", () => {
    expect(careerStats({ ...resume, projects: [] }, "2026-11")).toEqual([]);
  });
});
