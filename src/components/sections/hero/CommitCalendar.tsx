import { GroupLegend } from "@/components/ui/GroupLegend";
import { activity } from "@/content/activity";
import { describeSpan } from "@/lib/commit-calendar";
import { CommitGrid } from "./CommitGrid";
import { LevelScale } from "./LevelScale";

export function CommitCalendar({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="@container rounded-xl border border-line bg-bg-sunken p-4 sm:p-5">
        <CommitGrid activity={activity} />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
          <GroupLegend />
          <LevelScale />
        </div>
      </div>
      <figcaption className="mt-3 flex justify-between gap-4 mono-label text-fg-muted">
        <span className="whitespace-nowrap">fig. 01</span>
        <span className="text-right">commits · {describeSpan(activity)}</span>
      </figcaption>
    </figure>
  );
}
