"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";
import { COMMAND_GROUPS, type Command as PaletteCommand, type CommandAction } from "@/lib/commands";

interface CommandSearchProps {
  commands: PaletteCommand[];
  onRun: (action: CommandAction) => void;
}

export default function CommandSearch({ commands, onRun }: CommandSearchProps) {
  return (
    <Command label="Commands" loop>
      <div className="flex items-center gap-2 border-b border-line px-4">
        <Search aria-hidden className="size-4 text-fg-muted" />
        <Command.Input
          autoFocus
          data-autofocus
          placeholder="Type a command or search…"
          className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
        />
      </div>
      <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto p-1.5">
        <Command.Empty className="px-3 py-6 text-center text-sm text-fg-muted">No results.</Command.Empty>
        {COMMAND_GROUPS.map((group) => (
          <Command.Group
            key={group}
            heading={<span className="block px-3 pt-2.5 pb-1 mono-label text-fg-muted">{group}</span>}
          >
            {commands
              .filter((command) => command.group === group)
              .map((command) => (
                <Command.Item
                  key={command.id}
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
              ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command>
  );
}
