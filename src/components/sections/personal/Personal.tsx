import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { resume } from "@/content/resume";
import { personalProjects, projectImages } from "@/lib/selectors";
import { PersonalCard } from "./PersonalCard";

export function Personal() {
  const cards = personalProjects(resume).map((project) => ({ project, images: projectImages(project) }));

  return (
    <Section id="personal" meta={`${cards.length} personal projects`}>
      <SectionIntro title="Personal projects.">
        Built outside company work: a card-game simulator with its own bot, tooling for my workflow, game
        experiments, the first version of this site and projects from university.
      </SectionIntro>
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ project, images }, i) => (
          <PersonalCard key={project.slug} project={project} images={images} order={i} featured={i === 0} />
        ))}
      </ul>
    </Section>
  );
}
