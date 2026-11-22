"use client";

import { useMemo, useSyncExternalStore } from "react";

const TICK_MS = 1000;
const PLACEHOLDER = "--:--:--";

function subscribe(onTick: () => void): () => void {
  const timer = window.setInterval(onTick, TICK_MS);
  return () => window.clearInterval(timer);
}

const currentSecond = () => Math.floor(Date.now() / TICK_MS);
const serverSecond = () => null;

export function LiveClock({ timeZone }: { timeZone: string }) {
  const second = useSyncExternalStore(subscribe, currentSecond, serverSecond);
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }),
    [timeZone],
  );

  return <span>{second === null ? PLACEHOLDER : formatter.format(second * TICK_MS)}</span>;
}
