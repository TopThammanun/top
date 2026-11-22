import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { ChipList } from "@/components/ui/ChipList";
import { Reveal } from "@/components/ui/Reveal";
import type { CareerStep } from "@/lib/career";
import { cx } from "@/lib/cx";
import { formatIndex } from "@/lib/format";
import { projectPath } from "@/lib/routes";

const NODE: Record<CareerStep["kind"], string> = {
  education: "border-fg-muted",
  role: "border-accent",
};

const LINK =
  "inline-flex items-center gap-1.5 font-mono text-sm text-fg-muted underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline";

interface CareerStepCardProps {
  step: CareerStep;
  order: number;
  last: boolean;
}

export function CareerStepCard({ step, order, last }: CareerStepCardProps) {
  return (
    <li>
      <Reveal order={order}>
        <div aria-hidden className="flex items-center gap-2">
          <span
            className={cx(
              "size-2.5 shrink-0 rounded-full border-2",
              NODE[step.kind],
              step.current ? "bg-accent-fill" : "bg-bg",
            )}
          />
          {last ? null : <span className="h-px flex-1 bg-line-strong lg:-mr-6" />}
        </div>
        <p className="mt-5 flex h-6 items-center gap-x-2 mono-label whitespace-nowrap text-fg-muted">
          <span className="text-accent">{formatIndex(order + 1)}</span>
          {step.when}
          {step.current ? <Chip tone="accent">now</Chip> : null}
        </p>
        <h4 className="mt-2 text-lg leading-snug font-medium text-fg">{step.title}</h4>
        <p className="mt-1 text-sm text-fg-muted">{step.subtitle}</p>
        {step.distinction ? <p className="mt-1 text-sm text-accent">{step.distinction}</p> : null}
        {step.summary ? <p className="mt-3 text-sm text-fg-muted">{step.summary}</p> : null}
        {step.chips.items.length > 0 ? (
          <div className="mt-4">
            <ChipList label={step.chips.label} items={step.chips.items} />
          </div>
        ) : null}
        {step.links.length + step.projects.length > 0 ? (
          <ul className="mt-4 space-y-1.5">
            {step.projects.map((project) => (
              <li key={project.slug}>
                <Link href={projectPath(project.slug)} className={LINK}>
                  {project.name}
                  <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              </li>
            ))}
            {step.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                  {link.label}
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Reveal>
    </li>
  );
}
