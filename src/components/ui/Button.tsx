import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

export type ButtonVariant = "primary" | "ghost" | "icon";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "h-10 gap-2 px-4 border-accent-fill bg-accent-fill text-accent-ink hover:brightness-110",
  ghost: "h-10 gap-2 px-4 border-line text-fg hover:border-line-strong hover:bg-bg-raised",
  icon: "size-8 justify-center border-transparent text-fg-muted hover:border-line hover:text-fg",
};

function buttonClass(variant: ButtonVariant, className?: string): string {
  return cx(
    "inline-flex shrink-0 cursor-pointer items-center rounded-md border text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,filter] duration-150 ease-out-expo",
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
