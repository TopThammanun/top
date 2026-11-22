"use client";

import { useUi } from "@/components/shell/ui-store";
import { formatUsage } from "@/lib/format";

interface StackStatusProps {
  names: Record<string, string>;
  usage: Record<string, number>;
}

export function StackStatus({ names, usage }: StackStatusProps) {
  const { activeTech, techFilter } = useUi();
  const tech = activeTech ?? techFilter;

  return (
    <p aria-hidden className="h-5 font-mono text-sm text-fg-muted">
      {tech ? (
        <>
          <span className="text-accent">{names[tech] ?? tech}</span> → {formatUsage(usage[tech] ?? 0)}
        </>
      ) : (
        "select a skill to see where it was used"
      )}
    </p>
  );
}
