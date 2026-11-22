import type { Level } from "@/lib/commit-calendar";
import { DOT_PITCH, IDLE_OPACITY, LEVEL_RADIUS } from "./calendar-dots";

const LEVELS: readonly Level[] = [0, 1, 2, 3, 4];

export function LevelScale() {
  return (
    <p aria-hidden className="flex items-center gap-2 mono-label text-fg-muted">
      Less
      <svg viewBox={`0 0 ${DOT_PITCH * LEVELS.length} ${DOT_PITCH}`} className="h-2.5 fill-fg-muted">
        {LEVELS.map((level) => (
          <circle
            key={level}
            cx={(level + 0.5) * DOT_PITCH}
            cy={DOT_PITCH / 2}
            r={LEVEL_RADIUS[level]}
            fillOpacity={level === 0 ? IDLE_OPACITY : undefined}
          />
        ))}
      </svg>
      More
    </p>
  );
}
