"use client";

import { useEffect, type ReactNode } from "react";
import { useUi, type KindFilter } from "@/components/shell/ui-store";
import type { ProjectKind } from "@/content/types";
import { slugFromHash } from "@/lib/anchors";
import { ProjectRow, type ProjectRowData, type RowFocus } from "./ProjectRow";
import { WorkFilters } from "./WorkFilters";

export interface WorkItem extends ProjectRowData {
  kind: ProjectKind;
  stack: string[];
  details: ReactNode;
}

interface WorkListProps {
  items: WorkItem[];
  counts: Record<KindFilter, number>;
  techNames: Record<string, string>;
}

function rowFocus(stack: string[], tech: string | null): RowFocus {
  if (!tech) return "none";
  return stack.includes(tech) ? "match" : "dim";
}

export function WorkList({ items, counts, techNames }: WorkListProps) {
  const {
    activeTech,
    techFilter,
    setTechFilter,
    kindFilter,
    setKindFilter,
    openProject,
    setOpenProject,
    showProject,
  } = useUi();
  const focusTech = activeTech ?? techFilter;
  const visible = items.filter((item) => kindFilter === "all" || item.kind === kindFilter);

  useEffect(() => {
    const openFromHash = () => {
      const slug = slugFromHash(window.location.hash);
      if (slug && items.some((item) => item.slug === slug)) showProject(slug);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items, showProject]);

  return (
    <>
      <WorkFilters
        kind={kindFilter}
        counts={counts}
        techLabel={techFilter ? (techNames[techFilter] ?? techFilter) : null}
        onKindChange={setKindFilter}
        onClearTech={() => setTechFilter(null)}
      />
      <ul className="mt-8 border-t border-line">
        {visible.map((item, i) => {
          const open = openProject === item.slug;
          return (
            <ProjectRow
              key={item.slug}
              row={item}
              open={open}
              focus={rowFocus(item.stack, focusTech)}
              order={i}
              onToggle={() => setOpenProject(open ? null : item.slug)}
            >
              {item.details}
            </ProjectRow>
          );
        })}
      </ul>
    </>
  );
}
