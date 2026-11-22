import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { WordReveal } from "@/components/ui/WordReveal";
import { resume } from "@/content/resume";
import { formatIndex } from "@/lib/format";

const STATEMENT = "I work with coding agents the way I work with a team: written process, guardrails, proof.";

const SAMPLE_SKILL = `---
name: verify-change
description: >
  Use after changing code and
  before saying it works. Runs
  typecheck, lint and tests;
  fails only on problems that
  are new against the base.
---`;

export function Agents() {
  return (
    <Section id="agents" meta="process">
      <WordReveal text={STATEMENT} className="max-w-[24ch] text-statement" />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {resume.practices.map((practice, i) => (
          <li key={practice.title} className="bg-bg">
            <Reveal order={i} className="h-full p-5">
              <p className="font-mono text-sm text-accent">{formatIndex(i + 1)}</p>
              <h3 className="mt-6 font-medium text-fg">{practice.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{practice.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <figure className="mt-10 overflow-hidden rounded-xl border border-line bg-bg-sunken">
        <figcaption className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-xs text-fg-muted">verify-change/SKILL.md</span>
          <Chip tone="muted">sample</Chip>
        </figcaption>
        <pre className="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-fg">
          <code>{SAMPLE_SKILL}</code>
        </pre>
      </figure>
      <p className="mt-8 text-sm text-fg-muted">
        This site was planned by one model and implemented by another, from a written plan.
      </p>
    </Section>
  );
}
