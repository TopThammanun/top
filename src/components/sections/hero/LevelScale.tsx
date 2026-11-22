import type { Level } from "@/lib/commit-calendar";
import { CELL_PITCH, cellBox, cellFill } from "./calendar-cells";

const LEVELS: readonly Level[] = [0, 1, 2, 3, 4];

export function LevelScale() {
  return (
    <p aria-hidden className="flex items-center gap-2 mono-label text-fg-muted">
      Less
      <svg viewBox={`0 0 ${CELL_PITCH * LEVELS.length} ${CELL_PITCH}`} className="h-3">
        {LEVELS.map((level) => (
          <rect key={level} {...cellBox(level, 0)} {...cellFill(level, level === 0 ? null : "company")} />
        ))}
      </svg>
      More
    </p>
  );
}
