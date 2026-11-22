"use client";

import type { ReactNode } from "react";
import { projectAnchor } from "@/lib/anchors";
import { useUi } from "./ui-store";

interface ProjectLinkProps {
  slug: string;
  className?: string;
  children: ReactNode;
}

export function ProjectLink({ slug, className, children }: ProjectLinkProps) {
  const { showProject } = useUi();

  return (
    <a
      href={`#${projectAnchor(slug)}`}
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        showProject(slug);
      }}
    >
      {children}
    </a>
  );
}
