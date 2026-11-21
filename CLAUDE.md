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

## Commands

- `pnpm dev` · `pnpm build` · `pnpm start`
- `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm e2e`
- `pnpm build:pdf` writes `public/resume.pdf`

## Git

Branch `main`, remote `origin` = `github.com/TopThammanun/top`. The v1 site lives only in the old local clone `C:\Work\top`.
