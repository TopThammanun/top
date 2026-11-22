"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const STAGGER_MS = 40;

interface RevealProps {
  order?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({ order = 0, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      data-shown={shown || undefined}
      style={{ transitionDelay: `${order * STAGGER_MS}ms` }}
      className={className}
    >
      {children}
    </div>
  );
}
