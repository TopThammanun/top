"use client";

import { X } from "lucide-react";
import { useUi } from "@/components/shell/ui-store";
import { ChipButton } from "@/components/ui/Chip";

export function TechFilterNotice({ names }: { names: Record<string, string> }) {
  const { techFilter, setTechFilter } = useUi();
  if (!techFilter) return null;

  return (
    <p className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm text-fg-muted">
      Highlighting projects that use
      <ChipButton tone="accent" onClick={() => setTechFilter(null)}>
        {names[techFilter] ?? techFilter}
        <X aria-hidden className="size-3" />
        <span className="sr-only">, clear</span>
      </ChipButton>
    </p>
  );
}
