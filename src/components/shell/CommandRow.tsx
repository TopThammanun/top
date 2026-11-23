"use client";

import { Command } from "cmdk";
import type { Command as PaletteCommand, CommandAction } from "@/lib/commands";

interface CommandRowProps {
  command: PaletteCommand;
  onRun: (action: CommandAction) => void;
}

export function CommandRow({ command, onRun }: CommandRowProps) {
  return (
    <Command.Item
      value={command.id}
      keywords={[command.label, command.group, ...(command.keywords ?? [])]}
      onSelect={() => onRun(command.action)}
      className="group flex h-10 cursor-pointer items-center justify-between gap-4 rounded-md px-3 text-sm text-fg data-[selected=true]:bg-line"
    >
      <span className="truncate">{command.label}</span>
      {command.hint ? (
        <span className="shrink-0 font-mono text-xs text-fg-muted group-data-[selected=true]:text-fg">
          {command.hint}
        </span>
      ) : null}
    </Command.Item>
  );
}
