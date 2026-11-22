import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

export type ChipTone = "default" | "accent" | "muted";

const TONES: Record<ChipTone, string> = {
  default: "border-line text-fg",
  accent: "border-accent text-accent",
  muted: "border-line text-fg-muted",
};

const BASE =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs leading-5 whitespace-nowrap transition-colors duration-150 ease-out-expo";

interface ChipProps {
  tone?: ChipTone;
  className?: string;
  children: ReactNode;
}

export function Chip({ tone = "default", className, children }: ChipProps) {
  return <span className={cx(BASE, TONES[tone], className)}>{children}</span>;
}

interface ChipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ChipTone;
}

export function ChipButton({ tone = "default", className, type = "button", ...props }: ChipButtonProps) {
  return (
    <button
      type={type}
      className={cx(BASE, TONES[tone], "cursor-pointer hover:border-line-strong hover:text-fg", className)}
      {...props}
    />
  );
}
