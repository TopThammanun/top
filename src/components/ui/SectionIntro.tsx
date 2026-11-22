import type { ReactNode } from "react";

interface SectionIntroProps {
  title: string;
  children?: ReactNode;
}

export function SectionIntro({ title, children }: SectionIntroProps) {
  return (
    <div className="max-w-[62ch]">
      <p className="text-statement">{title}</p>
      {children ? <p className="mt-4 text-fg-muted sm:text-lg">{children}</p> : null}
    </div>
  );
}
