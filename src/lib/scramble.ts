export const DEFAULT_CHARSET = "!<>-_\\/[]{}=+*^?#01";

export function scrambleFrame(
  target: string,
  progress: number,
  rand: () => number,
  charset: string = DEFAULT_CHARSET,
): string {
  if (progress >= 1) return target;
  const revealed = Math.floor(target.length * Math.max(0, progress));
  return [...target]
    .map((ch, i) => {
      if (i < revealed || ch === " ") return ch;
      return charset[Math.floor(rand() * charset.length)] ?? ch;
    })
    .join("");
}
