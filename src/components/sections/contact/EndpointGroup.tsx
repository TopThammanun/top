import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import type { Endpoint } from "@/lib/endpoints";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

function EndpointRow({ endpoint, order }: { endpoint: Endpoint; order: number }) {
  return (
    <li className="border-b border-line">
      <Reveal
        order={order}
        className="grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-3 font-mono text-sm sm:grid-cols-[3.5rem_10rem_minmax(0,1fr)_auto]"
      >
        <span className="text-accent">GET</span>
        <span className="text-fg">{endpoint.path}</span>
        <span className="col-span-2 col-start-2 row-start-2 truncate text-fg-muted sm:col-span-1 sm:col-start-3 sm:row-start-1">
          {endpoint.value}
        </span>
        <span className="col-start-3 row-start-1 flex items-center sm:col-start-4">
          <CopyButton text={endpoint.copy} label={`Copy ${endpoint.label}`} />
          <LinkButton
            variant="icon"
            href={endpoint.href}
            aria-label={`Open ${endpoint.label}`}
            {...(endpoint.external ? EXTERNAL : {})}
          >
            <ArrowUpRight aria-hidden className="size-4" />
          </LinkButton>
        </span>
      </Reveal>
    </li>
  );
}

interface EndpointGroupProps {
  title: string;
  endpoints: Endpoint[];
  offset: number;
}

export function EndpointGroup({ title, endpoints, offset }: EndpointGroupProps) {
  return (
    <div>
      <h3 className="mb-3 mono-label text-fg-muted">{title}</h3>
      <ul className="border-t border-line">
        {endpoints.map((endpoint, i) => (
          <EndpointRow key={endpoint.path} endpoint={endpoint} order={offset + i} />
        ))}
      </ul>
    </div>
  );
}
