"use client";

import { useUi } from "@/components/shell/ui-store";
import { Button } from "@/components/ui/Button";
import { Kbd } from "@/components/ui/Kbd";
import { useModKey } from "@/hooks/useModKey";

export function PaletteHint() {
  const { setPaletteOpen, setPaletteView } = useUi();
  const modKey = useModKey();

  return (
    <Button
      aria-haspopup="dialog"
      onClick={() => {
        setPaletteView("root");
        setPaletteOpen(true);
      }}
    >
      <span className="flex gap-1" aria-hidden>
        <Kbd>{modKey}</Kbd>
        <Kbd>K</Kbd>
      </span>
      <span className="text-fg-muted">Command palette</span>
    </Button>
  );
}
