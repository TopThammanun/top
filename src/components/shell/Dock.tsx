"use client";

import {
  AtSign,
  Bot,
  BriefcaseBusiness,
  Command as CommandIcon,
  FlaskConical,
  GitBranch,
  House,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { ThemeToggle } from "./ThemeToggle";
import { useUi } from "./ui-store";
import { useActivePill } from "./useActivePill";

const ICONS: Record<SectionId, LucideIcon> = {
  home: House,
  work: BriefcaseBusiness,
  personal: FlaskConical,
  log: GitBranch,
  stack: Layers,
  agents: Bot,
  contact: AtSign,
};

export function Dock({ active }: { active: SectionId }) {
  const { setPaletteOpen, setPaletteView } = useUi();
  const { listRef, pill } = useActivePill<HTMLUListElement>(active);

  return (
    <div
      data-print="hide"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-2 sm:px-4"
    >
      <nav
        aria-label="Sections"
        className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-line bg-bg-raised/80 p-1 shadow-lg shadow-black/20 backdrop-blur-md"
      >
        <ul ref={listRef} className="relative flex items-center gap-0.5">
          {pill ? (
            <li
              aria-hidden
              className={cx(
                "pointer-events-none absolute top-0 left-0 h-9 rounded-full bg-line",
                pill.animate && "transition-[transform,width] duration-400 ease-out-expo",
              )}
              style={{ width: pill.width, transform: `translateX(${pill.x}px)` }}
            />
          ) : null}
          {SECTIONS.map((section) => {
            const Icon = ICONS[section.id];
            const current = active === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={current ? "location" : undefined}
                  className={cx(
                    "relative flex h-9 items-center gap-2 rounded-full px-1.5 text-sm transition-colors duration-150 min-[380px]:px-2.5 lg:px-3",
                    current ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  <Icon aria-hidden className="size-4" />
                  <span className="sr-only lg:not-sr-only">{section.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <span aria-hidden className="mx-0.5 h-5 w-px bg-line min-[380px]:mx-1" />
        <Button
          variant="icon"
          aria-label="Open command palette"
          aria-haspopup="dialog"
          className="rounded-full"
          onClick={() => {
            setPaletteView("root");
            setPaletteOpen(true);
          }}
        >
          <CommandIcon aria-hidden className="size-4" />
        </Button>
        <ThemeToggle className="rounded-full" />
      </nav>
    </div>
  );
}
