import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/sections/footer/Footer";
import { Band } from "@/components/ui/Band";
import { LinkButton } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/ChipList";
import { GroupDot } from "@/components/ui/GroupDot";
import { HighlightList } from "@/components/ui/HighlightList";
import { LayerDiagram } from "@/components/ui/LayerDiagram";
import { Section } from "@/components/ui/Section";
import { StatGrid } from "@/components/ui/StatGrid";
import { resume } from "@/content/resume";
import type { Project } from "@/content/types";
import { buildMonth } from "@/lib/build-info";
import { formatFormalPeriod, periodDuration } from "@/lib/format";
import { personalProjects, techName } from "@/lib/selectors";
import { Gallery } from "./Gallery";
import { ProjectPager } from "./ProjectPager";
import { ProjectTopBar } from "./ProjectTopBar";

export function ProjectDetail({ project }: { project: Project }) {
  const projects = personalProjects(resume);
  const position = projects.findIndex((p) => p.slug === project.slug);

  return (
    <div className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-[1200px] border-x border-line">
        <ProjectTopBar handle={resume.profile.handle} />
        <main>
          <Section id="personal" heading="p" meta={`project ${position + 1} of ${projects.length}`}>
            <p className="flex items-center gap-2 mono-label text-fg-muted">
              <GroupDot group="personal" />
              {project.domain}
            </p>
            <h1 className="mt-5 max-w-[20ch] text-4xl leading-none font-semibold tracking-tight sm:text-6xl">
              {project.name}
            </h1>
            <p className="mt-5 font-mono text-sm text-fg-muted">
              {formatFormalPeriod(project.period)} · {periodDuration(project.period, buildMonth)} ·{" "}
              {project.role}
            </p>
            <p className="mt-6 max-w-[62ch] text-fg sm:text-lg">{project.summary}</p>
            {project.links ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <LinkButton key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </LinkButton>
                ))}
              </div>
            ) : null}
            <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="mb-5 mono-label text-fg-muted">Highlights</h2>
                <HighlightList items={project.highlights} />
              </div>
              <div className="space-y-6 lg:col-span-5">
                <StatGrid
                  stats={project.stats}
                  className={project.stats.length > 1 ? "grid-cols-2" : undefined}
                />
                <LayerDiagram layers={project.layers} />
                <ChipList label="Stack" items={project.stack.map((id) => techName(resume, id))} />
              </div>
            </div>
          </Section>
          {project.chapters?.map((chapter) => (
            <Band key={chapter.title} aria-label={chapter.title}>
              <h2 className="text-statement">{chapter.title}</h2>
              <div className="mt-6 max-w-[68ch] space-y-4 text-fg-muted sm:text-lg">
                {chapter.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Gallery images={chapter.images} />
            </Band>
          ))}
          <Band aria-label="More projects">
            <ProjectPager previous={projects[position - 1] ?? null} next={projects[position + 1] ?? null} />
          </Band>
        </main>
        <Footer />
      </div>
    </div>
  );
}
