import { Download } from "lucide-react";
import type { ReactNode } from "react";
import { LinkButton } from "./Button";

interface DownloadButtonProps {
  href: string;
  fileName: string;
  children: ReactNode;
}

export function DownloadButton({ href, fileName, children }: DownloadButtonProps) {
  return (
    <LinkButton href={href} download={fileName} variant="primary">
      <Download aria-hidden className="size-4" />
      {children}
    </LinkButton>
  );
}
