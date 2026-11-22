"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { litWords } from "@/lib/word-reveal";

interface WordRevealProps {
  text: string;
  className?: string;
}

export function WordReveal({ text, className }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [lit, setLit] = useState(0);
  const words = text.split(" ");
  const total = words.length;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    let frame = 0;

    const stop = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    const update = () => {
      frame = 0;
      const next = litWords(el.getBoundingClientRect().top, window.innerHeight, total);
      setLit((previous) => Math.max(previous, next));
      if (next >= total) stop();
    };
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, [total, reduceMotion]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word data-lit={reduceMotion || i < lit ? "" : undefined}>
          {i < total - 1 ? `${word} ` : word}
        </span>
      ))}
    </p>
  );
}
