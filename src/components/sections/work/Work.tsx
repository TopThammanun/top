import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { resume } from "@/content/resume";
import { currentRole } from "@/lib/career";
import { formatIndex } from "@/lib/format";
import { companyProjects } from "@/lib/selectors";
import { CompanyCase } from "./CompanyCase";
import { TechFilterNotice } from "./TechFilterNotice";

export function Work() {
  const projects = companyProjects(resume);
  const employer = currentRole(resume)?.employer;
  const techNames = Object.fromEntries(resume.tech.map((t) => [t.id, t.name]));

  return (
    <Section id="work" meta={`${projects.length} company projects`}>
      <SectionIntro title="Company work.">
        Platforms built {employer ? `at ${employer} ` : null}for government and enterprise clients. Client
        names are left out on purpose, so each entry describes what the system does.
      </SectionIntro>
      <TechFilterNotice names={techNames} />
      <ol className="mt-10 border-t border-line">
        {projects.map((project, i) => (
          <CompanyCase key={project.slug} project={project} index={formatIndex(i + 1)} />
        ))}
      </ol>
    </Section>
  );
}
