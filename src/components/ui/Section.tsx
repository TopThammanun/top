import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface SectionProps {
  id: string;
  index: string;
  label: string;
  meta?: ReactNode;
  heading?: "h2" | "p";
  className?: string;
  children?: ReactNode;
}

function CrossMark({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={cx(
        "absolute top-0 -translate-y-1/2 font-mono text-xs leading-none text-fg-muted select-none",
        side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
      )}
    >
      +
    </span>
  );
}

export function Section({ id, index, label, meta, heading = "h2", className, children }: SectionProps) {
  const Heading = heading;
  const labelId = `${id}-label`;

  return (
    <section id={id} aria-labelledby={labelId} className="relative border-t border-line">
      <CrossMark side="left" />
      <CrossMark side="right" />
      <div className={cx("px-5 py-14 sm:px-8 md:py-24 lg:px-12", className)}>
        <header className="mb-10 flex items-baseline gap-3 font-mono text-xs tracking-[0.08em] uppercase md:mb-14">
          <span className="text-accent">{index}</span>
          <Heading id={labelId} className="font-mono text-xs font-normal text-fg">
            {label}
          </Heading>
          <span
            aria-hidden
            className="mx-1 h-px flex-1 -translate-y-1 border-b border-dotted border-line-strong"
          />
          {meta ? <span className="text-right text-fg-muted normal-case">{meta}</span> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
