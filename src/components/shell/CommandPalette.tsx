"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Kbd } from "@/components/ui/Kbd";
import type { Command as PaletteCommand, CommandAction } from "@/lib/commands";
import { scrollToId } from "./navigation";
import { ShortcutList } from "./ShortcutList";
import { toggleTheme } from "./theme";
import { useUi } from "./ui-store";

const STATUS_MS = 1500;
const PREFETCH_DELAY_MS = 1500;

const loadCommandSearch = () => import("./CommandSearch");

const CommandSearch = dynamic(loadCommandSearch, {
  ssr: false,
  loading: () => <div className="h-12 border-b border-line" />,
});

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
    const timer = window.setTimeout(() => void loadCommandSearch(), PREFETCH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

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
        <CommandSearch commands={commands} onRun={(action) => void run(action)} />
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
