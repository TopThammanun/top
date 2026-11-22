"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useUi } from "@/components/shell/ui-store";
import { useHydrated } from "@/hooks/useHydrated";
import { projectAnchor } from "@/lib/anchors";
import { cx } from "@/lib/cx";

interface CaseDisclosureProps {
  slug: string;
  label: string;
  children: ReactNode;
}

export function CaseDisclosure({ slug, label, children }: CaseDisclosureProps) {
  const { openProjects, toggleProject } = useUi();
  const hydrated = useHydrated();
  const open = openProjects.has(slug);
  const anchor = projectAnchor(slug);
  const buttonId = `${anchor}-button`;
  const panelId = `${anchor}-panel`;

  return (
    <div className="mt-7">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => toggleProject(slug)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-md font-mono text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
      >
        <ChevronDown
          aria-hidden
          className={cx("size-4 transition-transform duration-250 ease-out-expo", open && "rotate-180")}
        />
        {label}
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        data-collapsed={open ? undefined : ""}
        inert={hydrated && !open}
        className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-400 ease-out-expo js:data-collapsed:grid-rows-[0fr]"
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
