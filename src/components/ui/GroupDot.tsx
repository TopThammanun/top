import type { ProjectGroup } from "@/content/types";
import { cx } from "@/lib/cx";

const TONES: Record<ProjectGroup, string> = {
  company: "bg-accent-fill",
  personal: "bg-violet",
};

export function GroupDot({ group }: { group: ProjectGroup }) {
  return <span aria-hidden className={cx("inline-block size-1.5 shrink-0 rounded-full", TONES[group])} />;
}
