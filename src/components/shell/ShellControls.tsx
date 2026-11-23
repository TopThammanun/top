"use client";

import type { Command } from "@/lib/commands";
import { Atmosphere } from "./Atmosphere";
import { CommandPalette } from "./CommandPalette";
import { ConsoleGreeting } from "./ConsoleGreeting";
import { Dock } from "./Dock";
import { useProjectHash } from "./useProjectHash";
import { useSectionSpy } from "./useSectionSpy";
import { useShortcuts } from "./useShortcuts";

interface ShellControlsProps {
  commands: Command[];
  projectSlugs: string[];
  greeting: { name: string; github: string | null; json: string };
}

export function ShellControls({ commands, projectSlugs, greeting }: ShellControlsProps) {
  const active = useSectionSpy();
  useShortcuts(active);
  useProjectHash(projectSlugs);

  return (
    <>
      <Atmosphere />
      <Dock active={active} />
      <CommandPalette commands={commands} />
      <ConsoleGreeting {...greeting} />
    </>
  );
}
