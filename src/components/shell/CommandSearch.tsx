"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useState } from "react";
import { COMMAND_GROUPS, type Command as PaletteCommand, type CommandAction } from "@/lib/commands";
import { CommandRow } from "./CommandRow";

interface CommandSearchProps {
  commands: PaletteCommand[];
  onRun: (action: CommandAction) => void;
}

export default function CommandSearch({ commands, onRun }: CommandSearchProps) {
  const [search, setSearch] = useState("");
  const rows = (list: PaletteCommand[]) =>
    list.map((command) => <CommandRow key={command.id} command={command} onRun={onRun} />);

  return (
    <Command label="Commands" loop>
      <div className="flex items-center gap-2 border-b border-line px-4">
        <Search aria-hidden className="size-4 text-fg-muted" />
        <Command.Input
          autoFocus
          data-autofocus
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search…"
          className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
        />
      </div>
      <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto p-1.5">
        <Command.Empty className="px-3 py-6 text-center text-sm text-fg-muted">No results.</Command.Empty>
        {search
          ? rows(commands)
          : COMMAND_GROUPS.map((group) => (
              <Command.Group
                key={group}
                heading={<span className="block px-3 pt-2.5 pb-1 mono-label text-fg-muted">{group}</span>}
              >
                {rows(commands.filter((command) => command.group === group))}
              </Command.Group>
            ))}
      </Command.List>
    </Command>
  );
}
