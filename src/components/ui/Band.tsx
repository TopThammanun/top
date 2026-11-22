import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

function CrossMark({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={cx(
        "absolute top-0 -translate-y-1/2 font-mono text-xs leading-none text-fg-muted select-none",
        side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
      )}
    >
      +
    </span>
  );
}

export function Band({ children, ...props }: Omit<ComponentProps<"section">, "className">) {
  return (
    <section {...props} className="relative border-t border-line">
      <CrossMark side="left" />
      <CrossMark side="right" />
      <div className="px-5 py-14 sm:px-8 md:py-24 lg:px-12">{children}</div>
    </section>
  );
}
