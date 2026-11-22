export const WORD_REVEAL = {
  start: 0.85,
  finish: 0.35,
} as const;

export type WordRevealParams = typeof WORD_REVEAL;

export function litWords(
  top: number,
  viewport: number,
  total: number,
  p: WordRevealParams = WORD_REVEAL,
): number {
  if (viewport <= 0 || total <= 0) return 0;
  const progress = (viewport * p.start - top) / (viewport * (p.start - p.finish));
  return Math.min(total, Math.max(0, Math.ceil(progress * total)));
}
