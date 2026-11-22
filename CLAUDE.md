# topthammanun-resume

Web resume for Top Thammanun (topthammanun.com v2). Spec: `docs/DESIGN.md`. Plan: `docs/PLAN.md`.

## Rules

- Facts live only in `src/content/resume.ts`. Never invent employers, dates, numbers or client names.
  `null` and empty fields are pending owner input and render nothing.
- This Next.js is newer than most training data. Read `node_modules/next/dist/docs/` before using its APIs
  (see `AGENTS.md`).
- TypeScript strict, no `any`. No explanatory comments in code.
- Commits: one short conventional subject line, no body, no trailers. Push only when asked.
- No analytics, cookies or runtime third-party requests.

## Components

- `src/components/ui/` holds content-agnostic primitives (Section, Chip, Button, Kbd, CopyButton, Reveal).
  Reuse them instead of repeating class strings.
- `src/components/sections/<name>/` holds one folder per page section; its sub-components live beside it.
- `src/components/shell/` holds the dock, palette, theme and shortcuts.
- Server components by default; `"use client"` only on small interactive leaves. Pass data down as props.
- One component per file, named export, file name = component name, props typed with an interface.
- Pure logic goes in `src/lib/` with a test beside it; components stay presentational. Join classes with `cx`.
- No dead code, no unused props, no duplicated markup.

## Commands

- `pnpm dev` · `pnpm build` · `pnpm start`
- `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm e2e`
- `pnpm build:pdf` writes `public/resume.pdf`

## Git

Branch `main`, remote `origin` = `github.com/TopThammanun/top`. The v1 site lives only in the old local clone `C:\Work\top`.
