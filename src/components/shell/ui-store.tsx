"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ProjectKind } from "@/content/types";
import { projectAnchor } from "@/lib/anchors";
import { PANEL_TRANSITION_MS, scrollToId } from "./navigation";

export type PaletteView = "root" | "help";
export type KindFilter = ProjectKind | "all";

interface UiState {
  activeTech: string | null;
  setActiveTech: (id: string | null) => void;
  techFilter: string | null;
  setTechFilter: (id: string | null) => void;
  kindFilter: KindFilter;
  setKindFilter: (kind: KindFilter) => void;
  openProject: string | null;
  setOpenProject: (slug: string | null) => void;
  showProject: (slug: string) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  paletteView: PaletteView;
  setPaletteView: (view: PaletteView) => void;
}

const UiContext = createContext<UiState | null>(null);

export function UiProvider({
  initialProject,
  children,
}: {
  initialProject: string | null;
  children: ReactNode;
}) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [kindFilter, setKindFilter] = useState<KindFilter>("all");
  const [openProject, setOpenProject] = useState<string | null>(initialProject);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteView, setPaletteView] = useState<PaletteView>("root");

  const showProject = useCallback((slug: string) => {
    const anchor = projectAnchor(slug);
    setKindFilter("all");
    setOpenProject(slug);
    window.history.replaceState(null, "", `#${anchor}`);
    requestAnimationFrame(() => scrollToId(anchor));
    window.setTimeout(() => scrollToId(anchor), PANEL_TRANSITION_MS);
  }, []);

  const value = useMemo<UiState>(
    () => ({
      activeTech,
      setActiveTech,
      techFilter,
      setTechFilter,
      kindFilter,
      setKindFilter,
      openProject,
      setOpenProject,
      showProject,
      paletteOpen,
      setPaletteOpen,
      paletteView,
      setPaletteView,
    }),
    [activeTech, techFilter, kindFilter, openProject, showProject, paletteOpen, paletteView],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiState {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside <UiProvider>");
  return ctx;
}
