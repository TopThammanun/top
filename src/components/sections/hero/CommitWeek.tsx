import { memo } from "react";
import type { CalendarDay, CalendarWeek } from "@/lib/commit-calendar";
import { CELL_PITCH, cellBox, cellFill } from "./calendar-cells";

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
      <svg
        viewBox={`0 0 ${CELL_PITCH} ${CELL_PITCH * days.length}`}
        className="block w-full overflow-visible"
      >
        {days.map((day, weekday) =>
          day ? <rect key={day.date} {...cellBox(0, weekday)} {...cellFill(day.level, day.group)} /> : null,
        )}
        {active ? (
          <rect {...cellBox(0, days.indexOf(active))} fill="none" strokeWidth={0.9} className="stroke-fg" />
        ) : null}
      </svg>
    </div>
  );
});
