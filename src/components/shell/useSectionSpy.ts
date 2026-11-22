"use client";

import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/lib/sections";

const SPY_BAND = "-40% 0px -55% 0px";

export function useSectionSpy(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id as SectionId);
      },
      { rootMargin: SPY_BAND },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}
