import { Section } from "@/components/ui/Section";
import { resume } from "@/content/resume";
import { buildMonth } from "@/lib/build-info";
import { formatIndex, formatPeriod, periodDuration } from "@/lib/format";
import { countByKind } from "@/lib/selectors";
import { ProjectDetails } from "./ProjectDetails";
import { WorkList, type WorkItem } from "./WorkList";

export function Work() {
  const items: WorkItem[] = resume.projects.map((project, i) => ({
    slug: project.slug,
    kind: project.kind,
    stack: project.stack,
    index: formatIndex(i + 1),
    name: project.name,
    domain: project.domain,
    period: formatPeriod(project.period),
    duration: periodDuration(project.period, buildMonth),
    details: <ProjectDetails project={project} />,
  }));
  const techNames = Object.fromEntries(resume.tech.map((t) => [t.id, t.name]));

  return (
    <Section id="work" index="01" label="Work" meta={`${items.length} entries`}>
      <WorkList items={items} counts={countByKind(resume)} techNames={techNames} />
    </Section>
  );
}
