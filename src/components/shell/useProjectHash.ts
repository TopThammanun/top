"use client";

import { useEffect } from "react";
import { slugFromHash } from "@/lib/anchors";
import { useUi } from "./ui-store";

export function useProjectHash(slugs: readonly string[]): void {
  const { showProject } = useUi();

  useEffect(() => {
    const openFromHash = () => {
      const slug = slugFromHash(window.location.hash);
      if (slug && slugs.includes(slug)) showProject(slug);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [slugs, showProject]);
}
