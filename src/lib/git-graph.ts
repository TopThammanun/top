import type { Lane, ProjectGroup } from "@/content/types";

export interface GraphEvent {
  lane: Lane;
  project: string;
  group: ProjectGroup;
}

export interface GraphPath {
  lane: Lane;
  group: ProjectGroup;
  d: string;
}

function vertical(x: number, from: number, to: number): string {
  return `M ${x} ${from} V ${to}`;
}

function fork(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const bend = (to.y - from.y) * 0.6;
  return `M ${from.x} ${from.y} C ${from.x} ${from.y + bend}, ${to.x} ${to.y - bend}, ${to.x} ${to.y}`;
}

export function graphPaths(events: GraphEvent[], ys: number[], x: Record<Lane, number>): GraphPath[] {
  const paths: GraphPath[] = [];
  const mainEvents = events.filter((e) => e.lane === "main");
  const mainYs = events.flatMap((e, i) => (e.lane === "main" ? [ys[i]] : []));
  const branchRows = new Map<string, number[]>();
  events.forEach((e, i) => {
    if (e.lane === "branch") branchRows.set(e.project, [...(branchRows.get(e.project) ?? []), i]);
  });

  for (const rows of branchRows.values()) {
    const newest = rows[0];
    const oldest = rows[rows.length - 1];
    const branch = { lane: "branch", group: events[newest].group } as const;
    if (rows.length > 1) paths.push({ ...branch, d: vertical(x.branch, ys[newest], ys[oldest]) });
    const below = ys[oldest + 1];
    if (below === undefined) continue;
    paths.push({ ...branch, d: fork({ x: x.branch, y: ys[oldest] }, { x: x.main, y: below }) });
    mainYs.push(below);
  }

  if (mainYs.length > 1) {
    paths.unshift({
      lane: "main",
      group: mainEvents[0]?.group ?? "company",
      d: vertical(x.main, Math.min(...mainYs), Math.max(...mainYs)),
    });
  }
  return paths;
}
