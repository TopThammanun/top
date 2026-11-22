import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import type { Lane, ProjectGroup } from "@/content/types";
import { graphPaths, type GraphEvent } from "./git-graph";
import { projectGroup } from "./selectors";

const x = { main: 10, branch: 30 };

function event(lane: Lane, project: string, group: ProjectGroup = "company"): GraphEvent {
  return { lane, project, group };
}

describe("graphPaths", () => {
  it("draws the main lane between the outermost main nodes", () => {
    const events = [event("main", "a"), event("main", "a")];
    expect(graphPaths(events, [5, 45], x)).toEqual([{ lane: "main", group: "company", d: "M 10 5 V 45" }]);
  });

  it("forks a branch from the main lane at the next row", () => {
    const events = [event("branch", "b", "personal"), event("main", "a"), event("main", "a")];
    const paths = graphPaths(events, [5, 25, 45], x);
    expect(paths[0]).toEqual({ lane: "main", group: "company", d: "M 10 25 V 45" });
    expect(paths[1]).toEqual({ lane: "branch", group: "personal", d: "M 30 5 C 30 17, 10 13, 10 25" });
  });

  it("joins events of the same branch and extends main to meet the fork", () => {
    const events = [
      event("main", "a"),
      event("branch", "b", "personal"),
      event("main", "a"),
      event("branch", "b", "personal"),
      event("branch", "c"),
    ];
    const paths = graphPaths(events, [0, 20, 40, 60, 80], x);
    expect(paths).toContainEqual({ lane: "branch", group: "personal", d: "M 30 20 V 60" });
    expect(paths).toContainEqual({ lane: "main", group: "company", d: "M 10 0 V 80" });
  });

  it("leaves a root branch event at the bottom without a fork", () => {
    const events = [event("main", "a"), event("branch", "b", "personal")];
    expect(graphPaths(events, [0, 20], x)).toEqual([]);
  });

  it("covers the real timeline and colours each branch by its project group", () => {
    const groups = Object.fromEntries(resume.projects.map((p) => [p.slug, projectGroup(p)]));
    const events = resume.timeline.map((e) => event(e.lane, e.project, groups[e.project]));
    const paths = graphPaths(
      events,
      events.map((_, i) => i * 10),
      x,
    );
    expect(paths[0]).toEqual({ lane: "main", group: "company", d: "M 10 10 V 120" });
    const branches = paths.filter((p) => p.lane === "branch");
    expect(branches).toHaveLength(6);
    expect(branches.filter((p) => p.group === "company")).toHaveLength(2);
  });
});
