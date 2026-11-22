"use client";

import { scrollToId } from "@/components/shell/navigation";
import { useUi } from "@/components/shell/ui-store";
import { Chip, ChipButton } from "@/components/ui/Chip";
import { GroupDot } from "@/components/ui/GroupDot";
import type { ProjectGroup } from "@/content/types";
import { formatUsage } from "@/lib/format";

interface TechChipProps {
  id: string;
  name: string;
  usage: number;
  group: ProjectGroup | null;
}

export function TechChip({ id, name, usage, group }: TechChipProps) {
  const { activeTech, setActiveTech, techFilter, setTechFilter } = useUi();

  if (group === null) return <Chip tone="muted">{name}</Chip>;

  const selected = techFilter === id;
  const clearActive = () => setActiveTech(null);

  return (
    <ChipButton
      tone={selected || activeTech === id ? "accent" : "default"}
      aria-pressed={selected}
      onMouseEnter={() => setActiveTech(id)}
      onMouseLeave={clearActive}
      onFocus={() => setActiveTech(id)}
      onBlur={clearActive}
      onClick={() => {
        setTechFilter(selected ? null : id);
        if (!selected) scrollToId("work");
      }}
    >
      <GroupDot group={group} />
      {name}
      <span aria-hidden className="text-fg-muted">
        {usage}
      </span>
      <span className="sr-only">, {formatUsage(usage)}</span>
    </ChipButton>
  );
}
