"use client";

import {
  AtSign,
  Bot,
  BriefcaseBusiness,
  Command as CommandIcon,
  GitBranch,
  House,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { ThemeToggle } from "./ThemeToggle";
import { useUi } from "./ui-store";

const ICONS: Record<SectionId, LucideIcon> = {
  home: House,
  work: BriefcaseBusiness,
  log: GitBranch,
  stack: Layers,
  agents: Bot,
  contact: AtSign,
};

const PILL_TRANSITION = { type: "spring", bounce: 0.15, duration: 0.4 } as const;

export function Dock({ active }: { active: SectionId }) {
  const { setPaletteOpen, setPaletteView } = useUi();

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-print="hide"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
      >
        <nav
          aria-label="Sections"
          className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-line bg-bg-raised/80 p-1 shadow-lg shadow-black/20 backdrop-blur-md"
        >
          <ul className="flex items-center gap-0.5">
            {SECTIONS.map((section) => {
              const Icon = ICONS[section.id];
              const current = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={current ? "location" : undefined}
                    className={cx(
                      "relative flex h-9 items-center gap-2 rounded-full px-2.5 text-sm transition-colors duration-150 md:px-3",
                      current ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {current ? (
                      <motion.span
                        layoutId="dock-pill"
                        transition={PILL_TRANSITION}
                        className="absolute inset-0 rounded-full bg-line"
                      />
                    ) : null}
                    <Icon aria-hidden className="relative size-4" />
                    <span className="relative sr-only md:not-sr-only">{section.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <span aria-hidden className="mx-1 h-5 w-px bg-line" />
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
    </MotionConfig>
  );
}
