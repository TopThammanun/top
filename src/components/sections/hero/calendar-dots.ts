import type { ProjectGroup } from "@/content/types";
import type { Level } from "@/lib/commit-calendar";

export const DOT_PITCH = 10;
export const IDLE_OPACITY = 0.55;

export const LEVEL_RADIUS: Record<Level, number> = { 0: 1, 1: 2, 2: 2.8, 3: 3.5, 4: 4.2 };

export const GROUP_FILL: Record<ProjectGroup, string> = {
  company: "fill-accent-fill",
  personal: "fill-violet",
};
