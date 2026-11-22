"use client";

import type { Command } from "@/lib/commands";
import { CommandPalette } from "./CommandPalette";
import { ConsoleGreeting } from "./ConsoleGreeting";
import { Dock } from "./Dock";
import { useSectionSpy } from "./useSectionSpy";
import { useShortcuts } from "./useShortcuts";

interface ShellControlsProps {
  commands: Command[];
  greeting: { name: string; github: string | null; json: string };
}

export function ShellControls({ commands, greeting }: ShellControlsProps) {
  const active = useSectionSpy();
  useShortcuts(active);

  return (
    <>
      <Dock active={active} />
      <CommandPalette commands={commands} />
      <ConsoleGreeting {...greeting} />
    </>
  );
}
