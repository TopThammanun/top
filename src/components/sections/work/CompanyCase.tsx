import { TechFocus } from "@/components/shell/TechFocus";
import { Chip } from "@/components/ui/Chip";
import { ChipList } from "@/components/ui/ChipList";
import { HighlightList } from "@/components/ui/HighlightList";
import { Reveal } from "@/components/ui/Reveal";
import { StatGrid } from "@/components/ui/StatGrid";
import { resume } from "@/content/resume";
import type { Project } from "@/content/types";
import { projectAnchor } from "@/lib/anchors";
import { buildMonth } from "@/lib/build-info";
import { formatFormalPeriod, periodDuration } from "@/lib/format";
import { techName } from "@/lib/selectors";
import { CaseDisclosure } from "./CaseDisclosure";
import { LayerDiagram } from "@/components/ui/LayerDiagram";

interface CompanyCaseProps {
  project: Project;
  index: string;
}

export function CompanyCase({ project, index }: CompanyCaseProps) {
  return (
    <TechFocus
      stack={project.stack}
      id={projectAnchor(project.slug)}
      className="group scroll-mt-6 border-b border-line"
    >
      <Reveal>
        <article className="grid gap-x-4 gap-y-3 py-9 md:grid-cols-[3rem_minmax(0,1fr)] md:py-12">
          <p aria-hidden className="font-mono text-sm text-accent md:pt-2">
            {index}
          </p>
          <div>
            <header className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
              <div className="min-w-0">
                {project.period.end === null ? (
                  <p className="mb-3">
                    <Chip tone="accent">Current</Chip>
                  </p>
                ) : null}
                <h3 className="text-2xl leading-tight font-medium text-fg transition-colors duration-150 group-data-[focus=match]:text-accent sm:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-2 text-fg-muted">
                  {project.role} · {project.domain}
                </p>
              </div>
              <p className="font-mono text-sm text-fg-muted">
                {formatFormalPeriod(project.period)} · {periodDuration(project.period, buildMonth)}
              </p>
            </header>
            <div className="mt-7 grid gap-8 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-8">
                <p className="max-w-[68ch] text-fg sm:text-lg">{project.summary}</p>
                <HighlightList items={project.highlights} />
              </div>
              <StatGrid stats={project.stats} className="grid-cols-2 self-start lg:col-span-4" />
            </div>
            <CaseDisclosure slug={project.slug} label="Architecture and stack">
              <div className="grid gap-6 pt-6 lg:grid-cols-2">
                <LayerDiagram layers={project.layers} />
                <ChipList label="Stack" items={project.stack.map((id) => techName(resume, id))} />
              </div>
            </CaseDisclosure>
          </div>
        </article>
      </Reveal>
    </TechFocus>
  );
}
