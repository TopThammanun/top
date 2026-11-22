"use client";

import { useEffect, useRef, useState } from "react";

export interface Pill {
  x: number;
  width: number;
  animate: boolean;
}

export function useActivePill<T extends HTMLElement>(active: string) {
  const listRef = useRef<T>(null);
  const [pill, setPill] = useState<Pill | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => {
      const current = list.querySelector<HTMLElement>("[aria-current]");
      if (!current) return;
      const target = current.parentElement ?? current;
      setPill((previous) => ({
        x: target.offsetLeft,
        width: target.offsetWidth,
        animate: previous !== null,
      }));
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  return { listRef, pill };
}
