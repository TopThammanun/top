import { ProjectLink } from "@/components/shell/ProjectLink";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { resume } from "@/content/resume";
import type { Lane, TimelineEvent } from "@/content/types";
import { cx } from "@/lib/cx";
import { GitGraph } from "./GitGraph";

const NODE: Record<Lane, string> = {
  main: "border-accent",
  branch: "border-violet",
};

function LogRow({ event }: { event: TimelineEvent }) {
  return (
    <li>
      <ProjectLink
        slug={event.project}
        className="group grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-3 gap-y-1 rounded-md py-3 font-mono text-sm sm:grid-cols-[4.5rem_3rem_minmax(0,1fr)] sm:gap-x-4"
      >
        <span className="col-start-2 row-start-1 text-xs text-fg-muted sm:col-start-1 sm:text-sm">
          {event.date}
        </span>
        <span className="relative row-span-2 h-full sm:row-span-1">
          <span
            data-node
            className={cx(
              "absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
              event.lane === "main" ? "left-[30%]" : "left-[70%]",
              NODE[event.lane],
              event.head ? "bg-accent-fill" : "bg-bg",
            )}
          />
        </span>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-fg group-hover:text-accent">
          {event.message}
          {event.head ? <Chip tone="accent">HEAD -&gt; now</Chip> : null}
        </span>
      </ProjectLink>
    </li>
  );
}

export function Log() {
  const events = resume.timeline.map(({ lane, project }) => ({ lane, project }));

  return (
    <Section id="log" index="02" label="Log" meta={`${resume.timeline.length} commits`}>
      <p className="mb-8 font-mono text-sm text-fg-muted">
        <span className="text-accent">$</span> git log --graph --author=top
      </p>
      <Reveal>
        <GitGraph events={events}>
          <ol>
            {resume.timeline.map((event) => (
              <LogRow key={`${event.date}-${event.message}`} event={event} />
            ))}
          </ol>
        </GitGraph>
      </Reveal>
      <p className="mt-8 text-sm text-fg-muted">Timeline derived from commit history.</p>
    </Section>
  );
}
