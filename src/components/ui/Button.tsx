import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

export type ButtonVariant = "primary" | "ghost";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "border-accent-fill bg-accent-fill text-accent-ink hover:brightness-110",
  ghost: "border-line text-fg hover:border-line-strong hover:bg-bg-raised",
};

function buttonClass(variant: ButtonVariant, className?: string): string {
  return cx(
    "inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium whitespace-nowrap transition-[background-color,border-color,filter] duration-150 ease-out-expo",
    VARIANTS[variant],
    className,
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
}

export function LinkButton({ variant = "ghost", className, ...props }: LinkButtonProps) {
  return <a className={buttonClass(variant, className)} {...props} />;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "ghost", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}
