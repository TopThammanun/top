import type { ReactNode } from "react";

interface SkillBlockProps {
  name: string;
  aside?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function SkillBlock({ name, aside, footer, children }: SkillBlockProps) {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p aria-hidden className="font-mono text-sm text-fg-muted">
          <span className="text-accent">&quot;{name}&quot;</span>: {"{"}
        </p>
        {aside}
      </div>
      <div className="border-t border-line">{children}</div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <p aria-hidden className="font-mono text-sm text-fg-muted">
          {"}"}
        </p>
        {footer}
      </div>
    </>
  );
}
