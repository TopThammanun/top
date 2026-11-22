import { cx } from "@/lib/cx";
import { Reveal } from "./Reveal";

export interface StatItem {
  value: string;
  label: string;
  note?: string;
}

type StatSize = "md" | "lg";

const VALUE_SIZES: Record<StatSize, string> = {
  md: "text-xl",
  lg: "text-3xl sm:text-4xl",
};

interface StatGridProps {
  stats: StatItem[];
  size?: StatSize;
  className?: string;
}

export function StatGrid({ stats, size = "md", className }: StatGridProps) {
  return (
    <ul className={cx("grid gap-px overflow-hidden rounded-xl border border-line bg-line", className)}>
      {stats.map((stat, i) => (
        <li key={stat.label} className="bg-bg">
          <Reveal order={i} className={size === "lg" ? "p-5" : "px-4 py-3"}>
            <p className={cx("font-mono leading-tight text-fg", VALUE_SIZES[size])}>{stat.value}</p>
            <p className="mt-1 text-sm text-fg-muted">
              {stat.label}
              {stat.note ? <span className="block font-mono text-xs">{stat.note}</span> : null}
            </p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
