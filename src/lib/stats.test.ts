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
  it("summarises company work only", () => {
    expect(careerStats(resume, "2026-11")).toEqual([
      { value: "2y 9m", label: "On company projects", note: "since Mar 2024" },
      { value: "3", label: "Company projects" },
      { value: "24", label: "Repositories" },
      { value: "2.8k+", label: "Commits" },
    ]);
  });

  it("stops the clock at the last end date when no company project is open", () => {
    const closed = structuredClone(resume);
    closed.projects[0].period.end = "2026-09";
    expect(careerStats(closed, "2030-01")[0].value).toBe("2y 7m");
  });

  it("returns nothing without company projects", () => {
    expect(careerStats({ ...resume, projects: [] }, "2026-11")).toEqual([]);
  });
});
