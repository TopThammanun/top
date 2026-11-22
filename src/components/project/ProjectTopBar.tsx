import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shell/ThemeToggle";

export function ProjectTopBar({ handle }: { handle: string }) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
      <Link
        href="/#personal"
        className="inline-flex items-center gap-2 rounded-md font-mono text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
      >
        <ArrowLeft aria-hidden className="size-4" />
        All projects
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/" className="rounded-md font-mono text-sm text-fg-muted hover:text-fg">
          <span className="text-accent">~</span>/{handle}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
