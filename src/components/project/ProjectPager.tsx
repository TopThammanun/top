import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/content/types";
import { cx } from "@/lib/cx";
import { projectPath } from "@/lib/routes";

interface ProjectPagerProps {
  previous: Project | null;
  next: Project | null;
}

const LINK =
  "group flex flex-1 flex-col gap-1 rounded-xl border border-line p-5 transition-colors duration-150 hover:border-line-strong";

export function ProjectPager({ previous, next }: ProjectPagerProps) {
  return (
    <nav aria-label="More personal projects" className="flex flex-col gap-4 sm:flex-row">
      {previous ? (
        <Link href={projectPath(previous.slug)} className={LINK}>
          <span className="flex items-center gap-2 mono-label text-fg-muted">
            <ArrowLeft aria-hidden className="size-3.5" />
            Previous
          </span>
          <span className="text-lg font-medium text-fg group-hover:text-accent">{previous.name}</span>
        </Link>
      ) : null}
      {next ? (
        <Link href={projectPath(next.slug)} className={cx(LINK, "sm:items-end sm:text-right")}>
          <span className="flex items-center gap-2 mono-label text-fg-muted">
            Next
            <ArrowRight aria-hidden className="size-3.5" />
          </span>
          <span className="text-lg font-medium text-fg group-hover:text-accent">{next.name}</span>
        </Link>
      ) : null}
    </nav>
  );
}
