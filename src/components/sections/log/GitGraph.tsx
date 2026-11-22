"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Lane, ProjectGroup } from "@/content/types";
import { graphPaths, type GraphEvent, type GraphPath } from "@/lib/git-graph";

const GROUP_STROKE: Record<ProjectGroup, string> = {
  company: "stroke-accent",
  personal: "stroke-violet",
};

interface Geometry {
  width: number;
  height: number;
  paths: GraphPath[];
}

function center(el: Element, box: DOMRect): { x: number; y: number } {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
}

function measure(container: HTMLElement, events: GraphEvent[]): Geometry {
  const box = container.getBoundingClientRect();
  const nodes = [...container.querySelectorAll("[data-node]")];
  const points = nodes.map((node) => center(node, box));
  const laneX = (lane: Lane) => points[events.findIndex((e) => e.lane === lane)]?.x ?? 0;
  return {
    width: box.width,
    height: box.height,
    paths: graphPaths(
      events,
      points.map((p) => p.y),
      { main: laneX("main"), branch: laneX("branch") },
    ),
  };
}

interface GitGraphProps {
  events: GraphEvent[];
  children: ReactNode;
}

export function GitGraph({ events, children }: GitGraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const observer = new ResizeObserver(() => setGeometry(measure(container, events)));
    observer.observe(container);
    return () => observer.disconnect();
  }, [events]);

  return (
    <div ref={ref} className="relative">
      {geometry ? (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={geometry.width}
          height={geometry.height}
        >
          {geometry.paths.map((path, i) => (
            <path key={i} d={path.d} fill="none" strokeWidth={1.5} className={GROUP_STROKE[path.group]} />
          ))}
        </svg>
      ) : null}
      {children}
    </div>
  );
}
