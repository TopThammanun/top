"use client";

import { scrollToId } from "@/components/shell/navigation";
import { useUi } from "@/components/shell/ui-store";
import { Chip, ChipButton } from "@/components/ui/Chip";
import { formatUsage } from "@/lib/format";

interface TechChipProps {
  id: string;
  name: string;
  usage: number;
}

export function TechChip({ id, name, usage }: TechChipProps) {
  const { activeTech, setActiveTech, techFilter, setTechFilter } = useUi();

  if (usage === 0) return <Chip tone="muted">{name}</Chip>;

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
      {name}
      <span className="sr-only">, {formatUsage(usage)}</span>
    </ChipButton>
  );
}
