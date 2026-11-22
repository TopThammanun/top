"use client";

import { useMemo, useState, type PointerEvent } from "react";
import { GroupDot } from "@/components/ui/GroupDot";
import type { CommitActivity } from "@/content/types";
import { buildCalendar, describeRange, describeSummary, type CalendarDay } from "@/lib/commit-calendar";
import { formatDate, formatQuantity } from "@/lib/format";
import { CommitWeek } from "./CommitWeek";

const GROUPS = ["company", "personal"] as const;

export function CommitGrid({ activity }: { activity: CommitActivity }) {
  const { weeks, months, summary } = useMemo(() => buildCalendar(activity), [activity]);
  const [active, setActive] = useState<CalendarDay | null>(null);
  const labels = new Map(months.map((month) => [month.week, month.label]));

  const pick = (event: PointerEvent<HTMLDivElement>) => {
    const column = event.target instanceof Element ? event.target.closest("[data-week]") : null;
    const dots = column?.querySelector("svg")?.getBoundingClientRect();
    if (!column || !dots) return;
    const week = weeks[Number(column.getAttribute("data-week"))] ?? [];
    setActive(week[Math.floor(((event.clientY - dots.top) / dots.height) * week.length)] ?? null);
  };

  return (
    <>
      <p
        aria-hidden
        className="flex h-4 items-center gap-x-3 font-mono text-xs whitespace-nowrap text-fg-muted"
      >
        {active ? (
          <>
            <span className="text-fg">{formatDate(active.date)}</span>
            <span>{active.total === 0 ? "no commits" : formatQuantity(active.total, "commit")}</span>
            {GROUPS.map((group) =>
              active[group] > 0 ? (
                <span key={group} className="flex items-center gap-1.5">
                  <GroupDot group={group} />
                  {active[group]}
                </span>
              ) : null,
            )}
          </>
        ) : (
          <>
            <span className="text-fg">{formatQuantity(summary.total, "commit")}</span>
            <span>on {formatQuantity(summary.activeDays, "day")}</span>
            <span className="@max-sm:hidden">
              longest streak {formatQuantity(summary.longestStreak, "day")}
            </span>
          </>
        )}
      </p>
      <div
        role="img"
        aria-label={`Commit calendar, ${describeRange(activity)}: ${describeSummary(summary)}`}
        className="mt-4 grid touch-pan-y grid-cols-27 gap-y-3 @xl:grid-cols-53"
        onPointerMove={pick}
        onPointerDown={pick}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setActive(null);
        }}
      >
        {weeks.map((week, index) => (
          <CommitWeek
            key={index}
            index={index}
            days={week}
            label={labels.get(index) ?? null}
            active={active && week.includes(active) ? active : null}
          />
        ))}
      </div>
    </>
  );
}
