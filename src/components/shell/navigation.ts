export const PANEL_TRANSITION_MS = 400;

export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}
