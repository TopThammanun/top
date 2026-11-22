import type { ReactNode } from "react";
import { sectionInfo, type SectionId } from "@/lib/sections";
import { Band } from "./Band";

interface SectionProps {
  id: SectionId;
  meta?: ReactNode;
  heading?: "h2" | "p";
  children?: ReactNode;
}

export function Section({ id, meta, heading = "h2", children }: SectionProps) {
  const Heading = heading;
  const { index, label } = sectionInfo(id);
  const labelId = `${id}-label`;

  return (
    <Band id={id} aria-labelledby={labelId}>
      <header className="mb-10 flex items-baseline gap-3 mono-label md:mb-14">
        <span className="text-accent">{index}</span>
        <Heading id={labelId} className="font-normal text-fg">
          {label}
        </Heading>
        <span
          aria-hidden
          className="mx-1 h-px flex-1 -translate-y-1 border-b border-dotted border-line-strong"
        />
        {meta ? <span className="text-right text-fg-muted normal-case">{meta}</span> : null}
      </header>
      {children}
    </Band>
  );
}
