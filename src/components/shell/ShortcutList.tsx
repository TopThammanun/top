"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Kbd } from "@/components/ui/Kbd";
import { useModKey } from "@/hooks/useModKey";
import { shortcutHelp } from "@/lib/shortcuts";

export function ShortcutList({ onBack }: { onBack: () => void }) {
  const modKey = useModKey();

  return (
    <div>
      <div className="flex items-center gap-2 border-b border-line px-2 py-2">
        <Button variant="icon" aria-label="Back to commands" onClick={onBack} data-autofocus>
          <ArrowLeft aria-hidden className="size-4" />
        </Button>
        <p className="mono-label text-fg-muted">Keyboard shortcuts</p>
      </div>
      <dl className="px-4 py-3">
        {shortcutHelp(modKey).map((shortcut) => (
          <div key={shortcut.label} className="flex items-center justify-between gap-4 py-1.5 text-sm">
            <dt className="text-fg">{shortcut.label}</dt>
            <dd className="flex gap-1">
              {shortcut.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
