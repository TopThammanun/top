import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { graphPaths, type GraphEvent } from "./git-graph";

const x = { main: 10, branch: 30 };

describe("graphPaths", () => {
  it("draws the main lane between the outermost main nodes", () => {
    const events: GraphEvent[] = [
      { lane: "main", project: "a" },
      { lane: "main", project: "a" },
    ];
    expect(graphPaths(events, [5, 45], x)).toEqual([{ lane: "main", d: "M 10 5 V 45" }]);
  });

  it("forks a branch from the main lane at the next row", () => {
    const events: GraphEvent[] = [
      { lane: "branch", project: "b" },
      { lane: "main", project: "a" },
      { lane: "main", project: "a" },
    ];
    const paths = graphPaths(events, [5, 25, 45], x);
    expect(paths[0]).toEqual({ lane: "main", d: "M 10 25 V 45" });
    expect(paths[1]).toEqual({ lane: "branch", d: "M 30 5 C 30 17, 10 13, 10 25" });
  });

  it("joins events of the same branch and extends main to meet the fork", () => {
    const events: GraphEvent[] = [
      { lane: "main", project: "a" },
      { lane: "branch", project: "b" },
      { lane: "main", project: "a" },
      { lane: "branch", project: "b" },
      { lane: "branch", project: "c" },
    ];
    const paths = graphPaths(events, [0, 20, 40, 60, 80], x);
    expect(paths).toContainEqual({ lane: "branch", d: "M 30 20 V 60" });
    expect(paths).toContainEqual({ lane: "main", d: "M 10 0 V 80" });
  });

  it("leaves a root branch event at the bottom without a fork", () => {
    const events: GraphEvent[] = [
      { lane: "main", project: "a" },
      { lane: "branch", project: "b" },
    ];
    expect(graphPaths(events, [0, 20], x)).toEqual([]);
  });

  it("covers the real timeline", () => {
    const ys = resume.timeline.map((_, i) => i * 10);
    const paths = graphPaths(resume.timeline, ys, x);
    expect(paths[0]).toEqual({ lane: "main", d: "M 10 10 V 90" });
    expect(paths.filter((p) => p.lane === "branch")).toHaveLength(5);
  });
});
