import { Chip } from "@/components/ui/Chip";
import { RichText } from "@/components/ui/RichText";
import { resume } from "@/content/resume";
import type { Project } from "@/content/types";
import { techName } from "@/lib/selectors";
import { LayerDiagram } from "./LayerDiagram";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="grid gap-8 pt-1 pb-10 md:pl-16 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-7">
        <p className="max-w-[68ch] text-fg">{project.summary}</p>
        <ul className="max-w-[68ch] space-y-2.5 text-fg-muted">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="relative pl-5">
              <span aria-hidden className="absolute left-0 font-mono text-accent">
                –
              </span>
              <RichText text={highlight} />
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-5 lg:col-span-5">
        <LayerDiagram layers={project.layers} />
        <dl className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex gap-2">
              <dt className="text-fg-muted">{stat.label}</dt>
              <dd className="text-fg">{stat.value}</dd>
            </div>
          ))}
          <div className="flex gap-2">
            <dt className="text-fg-muted">role</dt>
            <dd className="text-fg">{project.role}</dd>
          </div>
        </dl>
      </div>
      <ul aria-label="Stack" className="flex flex-wrap gap-1.5 lg:col-span-12">
        {project.stack.map((id) => (
          <li key={id}>
            <Chip tone="muted">{techName(resume, id)}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}
