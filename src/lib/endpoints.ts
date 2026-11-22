import type { Resume } from "@/content/types";
import { absoluteUrl, displayUrl, MACHINE_ROUTES } from "./routes";

export interface Endpoint {
  path: string;
  label: string;
  value: string;
  href: string;
  copy: string;
  external: boolean;
}

export function profileEndpoints(r: Resume): Endpoint[] {
  const { links, email, linkedin } = r.profile;
  return [
    ...links.map((link) => ({
      path: `/${link.id}`,
      label: link.label,
      value: link.value,
      href: link.href,
      copy: link.href,
      external: true,
    })),
    ...(email
      ? [
          {
            path: "/email",
            label: "Email",
            value: email,
            href: `mailto:${email}`,
            copy: email,
            external: false,
          },
        ]
      : []),
    ...(linkedin
      ? [
          {
            path: "/linkedin",
            label: "LinkedIn",
            value: displayUrl(linkedin),
            href: linkedin,
            copy: linkedin,
            external: true,
          },
        ]
      : []),
  ];
}

export function machineEndpoints(r: Resume): Endpoint[] {
  return MACHINE_ROUTES.map((route) => ({
    path: route.path,
    label: route.label,
    value: route.label,
    href: route.path,
    copy: absoluteUrl(r, route.path),
    external: false,
  }));
}
