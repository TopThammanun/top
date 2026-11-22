"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { useUi } from "./ui-store";

interface TechFocusProps {
  stack: string[];
  id?: string;
  className?: string;
  children: ReactNode;
}

export function TechFocus({ stack, id, className, children }: TechFocusProps) {
  const { activeTech, techFilter } = useUi();
  const tech = activeTech ?? techFilter;
  const focus = tech === null ? undefined : stack.includes(tech) ? "match" : "dim";

  return (
    <li
      id={id}
      data-focus={focus}
      className={cx("transition-opacity duration-250 ease-out-expo data-[focus=dim]:opacity-45", className)}
    >
      {children}
    </li>
  );
}
