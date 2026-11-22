"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type PaletteView = "root" | "help";

interface UiState {
  activeTech: string | null;
  setActiveTech: (id: string | null) => void;
  techFilter: string | null;
  setTechFilter: (id: string | null) => void;
  openProject: string | null;
  setOpenProject: (slug: string | null) => void;
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
  const [openProject, setOpenProject] = useState<string | null>(initialProject);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteView, setPaletteView] = useState<PaletteView>("root");

  const value = useMemo<UiState>(
    () => ({
      activeTech,
      setActiveTech,
      techFilter,
      setTechFilter,
      openProject,
      setOpenProject,
      paletteOpen,
      setPaletteOpen,
      paletteView,
      setPaletteView,
    }),
    [activeTech, techFilter, openProject, paletteOpen, paletteView],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiState {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside <UiProvider>");
  return ctx;
}
