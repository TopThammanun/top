# topthammanun-resume

Web resume for Thammanun Aikhamdaeng (Top Thammanun, `topthammanun`; topthammanun.dev v2). Spec:
`docs/DESIGN.md`. Plan: `docs/PLAN.md`.

## Rules

- Facts live only in `src/content/resume.ts`. Never invent employers, dates, numbers or client names.
  `null` and empty fields are pending owner input and render nothing. The employer is named; clients are not.
- Roles are in `career` and schooling in `education`. Role dates come from the owner; do not derive them
  from project periods. Every company project is listed under exactly one role (`career[].projects`), the
  one it mostly ran in; the PDF and the text resume print it there.
- `src/content/activity.ts` (the hero commit calendar) is generated from local clones by `pnpm build:activity`.
  Never edit it by hand, and keep folder names of client work out of the repository.
- This Next.js is newer than most training data. Read `node_modules/next/dist/docs/` before using its APIs
  (see `AGENTS.md`).
- TypeScript strict, no `any`. No explanatory comments in code.
- Commits: one short conventional subject line, no body, no trailers. The owner asked on 2026-11-22 for `main`
  to be pushed every time a piece of work is finished: run the checks first, then push without asking.
- No analytics, cookies or runtime third-party requests from this code. Cloudflare in front of the site
  injects its own analytics beacon, which is why the footer says `0 cookies` and not `0 trackers`.
- Company work is the main content. Use `companyProjects` / `personalProjects` from `src/lib/selectors.ts`;
  never branch on `project.kind` in a component. Gold marks company work, violet marks personal projects.
- Project images (screenshots, diagrams, code excerpts) go in `public/projects/<slug>/` as WebP and are listed
  in `resume.ts` with alt text and a caption. Every personal project needs at least one; `pnpm test` fails
  when one has none or a listed file is missing. Say in the caption when a picture is a diagram.
- Personal projects are shown in the order they have in `resume.ts`, which is the owner's priority. The
  first one is the featured card.
- Before crediting a repository to the owner, check its commit authors. Forks and starter kits on the
  owner's GitHub include other people's work.
- Names come from `src/lib/identity.ts`, search metadata and JSON-LD from `src/lib/seo.ts`. The PDF is a formal
  resume for job applications: keep its copy free of first-person pronouns, keep it to two pages (an e2e
  test counts them) and write American English, because resume parsers match keywords by spelling.
- `.next/dev` can serve stale CSS after `globals.css` changes; delete it if a token edit does not show up.
- In `@react-pdf/renderer`, position a fixed `Text` that uses `render` (page numbers) with `top`. With `bottom`
  it is drawn off the page, and with a fixed `height` it is not drawn at all.

## Components

- `src/components/ui/` holds content-agnostic primitives (Band, Section, SectionIntro, Chip, ChipList, Button,
  StatGrid, HighlightList, LayerDiagram, Reveal, WordReveal and friends). Reuse them instead of repeating
  class strings.
- `src/components/sections/<name>/` holds one folder per page section; its sub-components live beside it.
- `src/components/shell/` holds the dock, palette, theme and shortcuts. It wraps the home page only.
- `src/components/project/` holds the personal project page (`/projects/<slug>`) and its gallery.
- Server components by default; `"use client"` only on small interactive leaves. Pass data down as props.
- One component per file, named export, file name = component name, props typed with an interface.
- Pure logic goes in `src/lib/` with a test beside it; components stay presentational. Join classes with `cx`.
- No dead code, no unused props, no duplicated markup.

## Commands

- `pnpm dev` · `pnpm build` · `pnpm start`
- `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm e2e`
- `pnpm build:pdf` writes `public/resume.pdf`
- `pnpm build:activity --root <dir> --author <pattern> --company <folder>` rewrites `src/content/activity.ts`
  (`--author`, `--company` and `--personal` repeat; `--personal` overrides a company folder)

## Git

Branch `main`, remote `origin` = `github.com/TopThammanun/top`. The remote is connected to Vercel, so a push to
`main` deploys to production. The v1 site's source is public at `github.com/TopThammanun/top-old`.
