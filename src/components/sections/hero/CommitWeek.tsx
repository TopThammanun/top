import { memo } from "react";
import type { CalendarDay, CalendarWeek } from "@/lib/commit-calendar";
import { DOT_PITCH, GROUP_FILL, IDLE_OPACITY, LEVEL_RADIUS } from "./calendar-dots";

const CENTER = DOT_PITCH / 2;
const RING_RADIUS = 4.6;

function rowCenter(weekday: number): number {
  return weekday * DOT_PITCH + CENTER;
}

interface CommitWeekProps {
  index: number;
  days: CalendarWeek;
  label: string | null;
  active: CalendarDay | null;
}

export const CommitWeek = memo(function CommitWeek({ index, days, label, active }: CommitWeekProps) {
  return (
    <div data-week={index} className="relative pt-5">
      {label ? <span className="absolute top-0 left-0 mono-label text-fg-muted">{label}</span> : null}
      <svg viewBox={`0 0 ${DOT_PITCH} ${DOT_PITCH * days.length}`} className="block w-full overflow-visible">
        {days.map((day, weekday) =>
          day ? (
            <circle
              key={day.date}
              cx={CENTER}
              cy={rowCenter(weekday)}
              r={LEVEL_RADIUS[day.level]}
              className={day.group ? GROUP_FILL[day.group] : "fill-fg-faint"}
              fillOpacity={day.group ? undefined : IDLE_OPACITY}
            />
          ) : null,
        )}
        {active ? (
          <circle
            cx={CENTER}
            cy={rowCenter(days.indexOf(active))}
            r={RING_RADIUS}
            fill="none"
            strokeWidth={0.8}
            className="stroke-fg"
          />
        ) : null}
      </svg>
    </div>
  );
});
