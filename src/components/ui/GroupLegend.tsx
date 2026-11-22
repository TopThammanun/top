import type { ProjectGroup } from "@/content/types";
import { GroupDot } from "./GroupDot";

const ITEMS: readonly { group: ProjectGroup; label: string }[] = [
  { group: "company", label: "Company work" },
  { group: "personal", label: "Personal projects" },
];

export function GroupLegend() {
  return (
    <ul aria-label="Legend" className="flex flex-wrap gap-x-5 gap-y-1 mono-label text-fg-muted">
      {ITEMS.map((item) => (
        <li key={item.group} className="flex items-center gap-2">
          <GroupDot group={item.group} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
