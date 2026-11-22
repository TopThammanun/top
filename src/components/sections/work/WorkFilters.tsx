"use client";

import { X } from "lucide-react";
import type { KindFilter } from "@/components/shell/ui-store";
import { ChipButton } from "@/components/ui/Chip";

const FILTERS: readonly { id: KindFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "client", label: "Client" },
  { id: "tooling", label: "Tooling" },
  { id: "side", label: "Side" },
];

interface WorkFiltersProps {
  kind: KindFilter;
  counts: Record<KindFilter, number>;
  techLabel: string | null;
  onKindChange: (kind: KindFilter) => void;
  onClearTech: () => void;
}

export function WorkFilters({ kind, counts, techLabel, onKindChange, onClearTech }: WorkFiltersProps) {
  return (
    <div role="group" aria-label="Filter projects" className="flex flex-wrap items-center gap-2">
      {FILTERS.map((filter) => {
        const selected = kind === filter.id;
        return (
          <ChipButton
            key={filter.id}
            aria-pressed={selected}
            tone={selected ? "accent" : "muted"}
            onClick={() => onKindChange(filter.id)}
          >
            {filter.label}
            <span className={selected ? "text-accent" : "text-fg-muted"}>{counts[filter.id]}</span>
          </ChipButton>
        );
      })}
      {techLabel ? (
        <ChipButton tone="accent" onClick={onClearTech} className="ml-auto">
          tech: {techLabel}
          <X aria-hidden className="size-3" />
          <span className="sr-only">, clear</span>
        </ChipButton>
      ) : null}
    </div>
  );
}
