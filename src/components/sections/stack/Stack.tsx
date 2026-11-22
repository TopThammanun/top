import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { resume } from "@/content/resume";
import { techUsage } from "@/lib/selectors";
import { StackStatus } from "./StackStatus";
import { TechChip } from "./TechChip";

export function Stack() {
  const usage = techUsage(resume);
  const names = Object.fromEntries(resume.tech.map((t) => [t.id, t.name]));

  return (
    <Section id="stack" index="03" label="Stack" meta={`${resume.tech.length} packages`}>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p aria-hidden className="font-mono text-sm text-fg-muted">
          <span className="text-accent">&quot;dependencies&quot;</span>: {"{"}
        </p>
        <StackStatus names={names} usage={usage} />
      </div>
      <div className="border-t border-line">
        {resume.categories.map((category, i) => (
          <Reveal key={category.id} order={i}>
            <div className="grid gap-3 border-b border-line py-4 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-6">
              <h3 className="pt-1 mono-label text-fg-muted">{category.label}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {resume.tech
                  .filter((tech) => tech.category === category.id)
                  .map((tech) => (
                    <li key={tech.id}>
                      <TechChip id={tech.id} name={tech.name} usage={usage[tech.id] ?? 0} />
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <p aria-hidden className="mt-4 font-mono text-sm text-fg-muted">
        {"}"}
      </p>
    </Section>
  );
}
