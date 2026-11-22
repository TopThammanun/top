"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Kbd } from "@/components/ui/Kbd";
import { COMMAND_GROUPS, type Command as PaletteCommand, type CommandAction } from "@/lib/commands";
import { scrollToId } from "./navigation";
import { ShortcutList } from "./ShortcutList";
import { toggleTheme } from "./theme";
import { useUi } from "./ui-store";

const STATUS_MS = 1500;

export function CommandPalette({ commands }: { commands: PaletteCommand[] }) {
  const { paletteOpen, setPaletteOpen, paletteView, setPaletteView, showProject } = useUi();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!paletteOpen) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [paletteOpen, paletteView]);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(""), STATUS_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  const close = () => setPaletteOpen(false);

  const run = async (action: CommandAction) => {
    switch (action.type) {
      case "section":
        close();
        requestAnimationFrame(() => scrollToId(action.id));
        return;
      case "project":
        close();
        showProject(action.slug);
        return;
      case "href":
        close();
        if (action.newTab) window.open(action.href, "_blank", "noopener,noreferrer");
        else window.location.assign(action.href);
        return;
      case "copy":
        try {
          await navigator.clipboard.writeText(action.text);
          setStatus(`Copied ${action.text}`);
        } catch {
          setStatus("Copy failed");
        }
        return;
      case "theme":
        toggleTheme();
        return;
      case "help":
        setPaletteView("help");
        return;
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="palette-title"
      data-print="hide"
      onClose={() => {
        setPaletteOpen(false);
        setPaletteView("root");
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line-strong bg-bg-raised p-0 text-fg shadow-2xl shadow-black/40 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <h2 id="palette-title" className="sr-only">
        Command palette
      </h2>
      {paletteOpen && paletteView === "help" ? <ShortcutList onBack={() => setPaletteView("root")} /> : null}
      {paletteOpen && paletteView === "root" ? (
        <Command label="Commands" loop>
          <div className="flex items-center gap-2 border-b border-line px-4">
            <Search aria-hidden className="size-4 text-fg-muted" />
            <Command.Input
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
                      onSelect={() => void run(command.action)}
                      className="flex h-10 cursor-pointer items-center justify-between gap-4 rounded-md px-3 text-sm text-fg data-[selected=true]:bg-line"
                    >
                      <span className="truncate">{command.label}</span>
                      {command.hint ? (
                        <span className="shrink-0 font-mono text-xs text-fg-muted">{command.hint}</span>
                      ) : null}
                    </Command.Item>
                  ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      ) : null}
      <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-2 font-mono text-xs text-fg-muted">
        <span className="flex items-center gap-1.5">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd> move <Kbd>↵</Kbd> run <Kbd>esc</Kbd> close
        </span>
        <span role="status" className="truncate text-ok">
          {status}
        </span>
      </div>
    </dialog>
  );
}
