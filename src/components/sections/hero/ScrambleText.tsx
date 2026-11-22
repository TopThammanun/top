"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { scrambleFrame } from "@/lib/scramble";

const HOLD_MS = 3200;
const DECODE_MS = 600;

interface ScrambleTextProps {
  phrases: string[];
  label: string;
}

export function ScrambleText({ phrases, label }: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (phrases.length < 2) return;
    let index = 0;
    let frame = 0;

    const decode = (target: string) => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = (now - start) / DECODE_MS;
        setText(scrambleFrame(target, progress, Math.random));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      index = (index + 1) % phrases.length;
      const target = phrases[index] ?? "";
      if (reduceMotion) setText(target);
      else decode(target);
    }, HOLD_MS);

    return () => {
      window.clearInterval(timer);
      cancelAnimationFrame(frame);
    };
  }, [phrases, reduceMotion]);

  return (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden>{text}</span>
    </>
  );
}
