# topthammanun.com v2

Web resume for Top Thammanun, built as a small documented system: projects are indexed entries, the career is
a git graph, skills are a dependency matrix and contact details are endpoints. The same content is served to
people (the page), parsers (`/resume.json`, JSON Resume v1.0.0) and agents (`/llms.txt`, `/resume.txt`), plus a
generated `/resume.pdf`.

Design spec: [`docs/DESIGN.md`](docs/DESIGN.md). Implementation plan: [`docs/PLAN.md`](docs/PLAN.md).

## Stack

Next.js 16 (App Router, every route prerendered) · React 19 · TypeScript · Tailwind CSS 4 · cmdk ·
lucide-react · @react-pdf/renderer · Vitest · Playwright with axe. No analytics, cookies or runtime
third-party requests.

## Commands

| Command          | What it does                                                     |
| ---------------- | ---------------------------------------------------------------- |
| `pnpm dev`       | Development server                                               |
| `pnpm build`     | Writes `public/resume.pdf` (prebuild), then the production build |
| `pnpm start`     | Serves the production build                                      |
| `pnpm lint`      | ESLint                                                           |
| `pnpm typecheck` | Generates route types and runs `tsc --noEmit`                    |
| `pnpm test`      | Unit tests for `src/lib`                                         |
| `pnpm e2e`       | Builds, serves on port 3100 and runs the Playwright suite        |
| `pnpm build:pdf` | Writes `public/resume.pdf` only                                  |

Run `pnpm exec playwright install chromium` once before the first `pnpm e2e`.

## Where things live

- `src/content/resume.ts` is the only source of facts. Every section, route and the PDF read from it.
  `src/lib/content-lint.ts` checks it (run by `pnpm test`).
- `src/lib/` holds pure logic with a test beside each file.
- `src/components/ui/` holds shared primitives, `src/components/sections/<name>/` one folder per page
  section, `src/components/shell/` the dock, command palette, shortcuts and theme.
- `src/app/` holds the page, the machine-readable routes, sitemap, robots and the Open Graph image.
- `src/pdf/ResumeDocument.tsx` and `scripts/build-pdf.tsx` produce the PDF.

## Pending content

These fields are empty on purpose and render nothing until they are filled in `src/content/resume.ts`:

- `profile.fullName`
- `profile.email`
- `profile.linkedin`
- `education`
- a portrait: drop `public/portrait.jpg` in and the hero dot field uses it instead of the `TOP` mask

Client names are intentionally left out. Commit counts are rounded figures from local clones on
`meta.statsAsOf`.

## Keyboard

`Ctrl/⌘ K` command palette · `?` shortcuts · `t` theme · `j` / `k` next / previous section ·
`g` then `h w l s a c` jump to a section.

## Quality

Lighthouse 12, mobile, production build served locally (`pnpm build && pnpm start`), five runs on
2026-11-22:

| Category       | Score                       |
| -------------- | --------------------------- |
| Performance    | 92 (median; range 85 to 92) |
| Accessibility  | 100                         |
| Best Practices | 100                         |
| SEO            | 100                         |

`pnpm e2e` covers the sections, palette, shortcuts, theme persistence, the accordion, no horizontal scroll at
360px, no console errors, the machine-readable routes and an axe scan in both themes.

## Deploy

Import the repository in Vercel with the default Next.js settings. `pnpm build` generates the PDF before
`next build`, and the build stamp in the footer reads `VERCEL_GIT_COMMIT_SHA`.
