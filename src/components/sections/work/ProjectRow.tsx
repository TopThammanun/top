"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useHydrated } from "@/hooks/useHydrated";
import { projectAnchor } from "@/lib/anchors";
import { cx } from "@/lib/cx";

export type RowFocus = "none" | "match" | "dim";

export interface ProjectRowData {
  slug: string;
  index: string;
  name: string;
  domain: string;
  period: string;
  duration: string;
}

interface ProjectRowProps {
  row: ProjectRowData;
  open: boolean;
  focus: RowFocus;
  order: number;
  onToggle: () => void;
  children: ReactNode;
}

export function ProjectRow({ row, open, focus, order, onToggle, children }: ProjectRowProps) {
  const hydrated = useHydrated();
  const anchor = projectAnchor(row.slug);
  const buttonId = `${anchor}-button`;
  const panelId = `${anchor}-panel`;

  return (
    <li
      id={anchor}
      className={cx(
        "scroll-mt-6 border-b border-line transition-opacity duration-250 ease-out-expo",
        focus === "dim" && "opacity-45",
      )}
    >
      <Reveal order={order}>
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="group grid w-full cursor-pointer grid-cols-[2rem_minmax(0,1fr)_1rem] items-baseline gap-x-4 gap-y-1 py-5 text-left md:grid-cols-[3rem_minmax(0,1fr)_1rem] lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,12rem)_10.5rem_4.5rem_1rem]"
          >
            <span
              className={cx(
                "row-span-2 font-mono text-sm transition-colors duration-150 lg:row-span-1",
                focus === "match" || open ? "text-accent" : "text-fg-muted",
              )}
            >
              {row.index}
            </span>
            <span className="text-lg leading-snug font-medium text-fg group-hover:text-accent">
              {row.name}
            </span>
            <span className="hidden truncate text-sm text-fg-muted lg:block">{row.domain}</span>
            <span className="col-start-2 row-start-2 flex gap-3 font-mono text-xs text-fg-muted lg:contents lg:text-sm">
              <span>{row.period}</span>
              <span className="lg:text-right">{row.duration}</span>
            </span>
            <ChevronDown
              aria-hidden
              className={cx(
                "col-start-3 row-span-2 row-start-1 size-4 self-center text-fg-muted transition-transform duration-250 ease-out-expo lg:col-auto lg:row-auto",
                open && "rotate-180",
              )}
            />
          </button>
        </h3>
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
      </Reveal>
    </li>
  );
}
