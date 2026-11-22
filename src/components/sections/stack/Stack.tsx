import { ChipList } from "@/components/ui/ChipList";
import { GroupLegend } from "@/components/ui/GroupLegend";
import { Section } from "@/components/ui/Section";
import { resume } from "@/content/resume";
import { techGroups, techUsage } from "@/lib/selectors";
import { SkillBlock } from "./SkillBlock";
import { SkillRow } from "./SkillRow";
import { StackStatus } from "./StackStatus";
import { TechChip } from "./TechChip";

export function Stack() {
  const usage = techUsage(resume);
  const groups = techGroups(resume);
  const names = Object.fromEntries(resume.tech.map((t) => [t.id, t.name]));

  return (
    <Section id="stack" meta={`${resume.tech.length} technologies`}>
      <SkillBlock
        name="dependencies"
        aside={<StackStatus names={names} usage={usage} />}
        footer={<GroupLegend />}
      >
        {resume.categories.map((category, i) => (
          <SkillRow key={category.id} label={category.label} order={i}>
            <ul className="flex flex-wrap gap-1.5">
              {resume.tech
                .filter((tech) => tech.category === category.id)
                .map((tech) => (
                  <li key={tech.id}>
                    <TechChip id={tech.id} name={tech.name} usage={usage[tech.id]} group={groups[tech.id]} />
                  </li>
                ))}
            </ul>
          </SkillRow>
        ))}
      </SkillBlock>
      {resume.competencies.length > 0 ? (
        <div className="mt-12">
          <SkillBlock name="practices">
            {resume.competencies.map((competency, i) => (
              <SkillRow key={competency.label} label={competency.label} order={i}>
                <ChipList label={competency.label} items={competency.items} />
              </SkillRow>
            ))}
          </SkillBlock>
        </div>
      ) : null}
    </Section>
  );
}
