import type { ProjectGroup } from "@/content/types";
import type { Level } from "@/lib/commit-calendar";

export const CELL_PITCH = 10;

const CELL_SIZE = 8;
const CELL_RADIUS = 1.6;
const CELL_INSET = (CELL_PITCH - CELL_SIZE) / 2;
const LEVEL_OPACITY: Record<Level, number> = { 0: 0.22, 1: 0.32, 2: 0.52, 3: 0.76, 4: 1 };
const GROUP_FILL: Record<ProjectGroup, string> = {
  company: "fill-accent-fill",
  personal: "fill-violet",
};

export function cellBox(column: number, row: number) {
  return {
    x: column * CELL_PITCH + CELL_INSET,
    y: row * CELL_PITCH + CELL_INSET,
    width: CELL_SIZE,
    height: CELL_SIZE,
    rx: CELL_RADIUS,
  };
}

export function cellFill(level: Level, group: ProjectGroup | null) {
  return { className: group ? GROUP_FILL[group] : "fill-fg-faint", fillOpacity: LEVEL_OPACITY[level] };
}
