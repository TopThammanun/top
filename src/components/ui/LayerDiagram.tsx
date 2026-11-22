import { Chip } from "./Chip";
import type { Layer } from "@/content/types";

export function LayerDiagram({ layers }: { layers: Layer[] }) {
  return (
    <div
      role="list"
      aria-label="Architecture layers"
      className="divide-y divide-line rounded-xl border border-line"
    >
      {layers.map((layer) => (
        <div role="listitem" key={layer.label} className="grid sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <div className="border-b border-line px-3 pt-2.5 pb-2 mono-label text-fg-muted sm:border-r sm:border-b-0">
            {layer.label}
          </div>
          <div className="flex flex-wrap gap-1.5 p-2">
            {layer.items.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
