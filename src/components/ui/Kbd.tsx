import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cx(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-line bg-bg-sunken px-1 font-mono text-[0.6875rem] leading-none text-fg-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
