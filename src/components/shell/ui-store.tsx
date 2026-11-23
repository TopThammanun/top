"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { projectAnchor } from "@/lib/anchors";
import type { SceneId } from "@/lib/thai-calendar";
import { PANEL_TRANSITION_MS, scrollToId } from "./navigation";

export type PaletteView = "root" | "help";

interface UiState {
  activeTech: string | null;
  setActiveTech: (id: string | null) => void;
  techFilter: string | null;
  setTechFilter: (id: string | null) => void;
  openProjects: ReadonlySet<string>;
  toggleProject: (slug: string) => void;
  showProject: (slug: string) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  paletteView: PaletteView;
  setPaletteView: (view: PaletteView) => void;
  scenePreview: SceneId | null;
  setScenePreview: (scene: SceneId | null) => void;
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
  const [openProjects, setOpenProjects] = useState<ReadonlySet<string>>(
    () => new Set(initialProject ? [initialProject] : []),
  );
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteView, setPaletteView] = useState<PaletteView>("root");
  const [scenePreview, setScenePreview] = useState<SceneId | null>(null);

  const toggleProject = useCallback((slug: string) => {
    setOpenProjects((previous) => {
      const next = new Set(previous);
      if (!next.delete(slug)) next.add(slug);
      return next;
    });
  }, []);

  const showProject = useCallback((slug: string) => {
    const anchor = projectAnchor(slug);
    setOpenProjects((previous) => new Set(previous).add(slug));
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
      openProjects,
      toggleProject,
      showProject,
      paletteOpen,
      setPaletteOpen,
      paletteView,
      setPaletteView,
      scenePreview,
      setScenePreview,
    }),
    [
      activeTech,
      techFilter,
      openProjects,
      toggleProject,
      showProject,
      paletteOpen,
      paletteView,
      scenePreview,
    ],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiState {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside <UiProvider>");
  return ctx;
}
