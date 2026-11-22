import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface SkillRowProps {
  label: string;
  order: number;
  children: ReactNode;
}

export function SkillRow({ label, order, children }: SkillRowProps) {
  return (
    <Reveal order={order}>
      <div className="grid gap-3 border-b border-line py-4 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-6">
        <h3 className="pt-1 mono-label text-fg-muted">{label}</h3>
        {children}
      </div>
    </Reveal>
  );
}
