import { describe, expect, it } from "vitest";
import { repoGroup, tallyCommits, windowStart, type CommitRecord } from "./commit-activity";

describe("windowStart", () => {
  it("returns the Monday that opens a window of whole weeks", () => {
    expect(windowStart("2026-11-22", 1)).toBe("2026-11-16");
    expect(windowStart("2026-11-22", 53)).toBe("2025-11-17");
  });

  it("keeps the week of a mid-week end date", () => {
    expect(windowStart("2026-11-18", 2)).toBe("2026-11-09");
  });
});

describe("repoGroup", () => {
  it("marks repositories under a company folder", () => {
    expect(repoGroup("client/api", ["client"], [])).toBe("company");
    expect(repoGroup("client", ["client"], [])).toBe("company");
  });

  it("treats everything else as personal", () => {
    expect(repoGroup("games/prototype", ["client"], [])).toBe("personal");
    expect(repoGroup("client-notes", ["client"], [])).toBe("personal");
  });

  it("lets a personal path override its company folder", () => {
    expect(repoGroup("client/own-tool", ["client"], ["client/own-tool"])).toBe("personal");
  });
});

describe("tallyCommits", () => {
  const commits: CommitRecord[] = [
    { hash: "a", date: "2026-11-16", group: "company" },
    { hash: "b", date: "2026-11-16", group: "company" },
    { hash: "c", date: "2026-11-16", group: "personal" },
    { hash: "d", date: "2026-11-18", group: "personal" },
  ];

  it("counts commits per day and group", () => {
    expect(tallyCommits(commits, "2026-11-16", "2026-11-22").days).toEqual({
      "2026-11-16": [2, 1],
      "2026-11-18": [0, 1],
    });
  });

  it("counts a commit found in two clones once", () => {
    const twice = [...commits, { hash: "a", date: "2026-11-16", group: "personal" } as const];
    expect(tallyCommits(twice, "2026-11-16", "2026-11-22").days["2026-11-16"]).toEqual([2, 1]);
  });

  it("drops commits outside the window and keeps its bounds", () => {
    const activity = tallyCommits(commits, "2026-11-17", "2026-11-22");
    expect(activity).toEqual({ from: "2026-11-17", to: "2026-11-22", days: { "2026-11-18": [0, 1] } });
  });

  it("orders days chronologically", () => {
    const shuffled = [commits[3], commits[0]];
    expect(Object.keys(tallyCommits(shuffled, "2026-11-01", "2026-11-30").days)).toEqual([
      "2026-11-16",
      "2026-11-18",
    ]);
  });
});
