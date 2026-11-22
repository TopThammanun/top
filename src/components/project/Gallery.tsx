"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ProjectImage } from "@/content/types";

export function Gallery({ images }: { images: ProjectImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : images[index];

  const open = (next: number) => {
    setIndex(next);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) =>
    setIndex((value) => (value === null ? value : (value + delta + images.length) % images.length));

  return (
    <>
      <ul className="mt-10 grid gap-x-4 gap-y-6 sm:grid-cols-2">
        {images.map((image, i) => (
          <li key={image.src}>
            <figure>
              <button
                type="button"
                aria-label={`Enlarge screenshot: ${image.caption}`}
                onClick={() => open(i)}
                className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-bg-sunken transition-colors duration-150 hover:border-line-strong"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  unoptimized
                  className="h-auto w-full"
                />
              </button>
              <figcaption className="mt-2 text-sm text-fg-muted">{image.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        aria-label="Screenshot viewer"
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto w-[min(96vw,1280px)] max-w-none overflow-hidden rounded-xl border border-line bg-bg-raised p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {current && index !== null ? (
          <figure>
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              unoptimized
              className="h-auto w-full"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line px-4 py-3">
              <span className="text-sm text-fg">{current.caption}</span>
              <span className="ml-auto flex items-center gap-1">
                <span className="mr-2 font-mono text-xs text-fg-muted">
                  {index + 1} / {images.length}
                </span>
                <Button variant="icon" aria-label="Previous screenshot" onClick={() => step(-1)}>
                  <ChevronLeft aria-hidden className="size-4" />
                </Button>
                <Button variant="icon" aria-label="Next screenshot" onClick={() => step(1)}>
                  <ChevronRight aria-hidden className="size-4" />
                </Button>
                <Button variant="icon" aria-label="Close" onClick={() => dialogRef.current?.close()}>
                  <X aria-hidden className="size-4" />
                </Button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
