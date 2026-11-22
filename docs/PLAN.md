# topthammanun.dev v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build the single-page web resume specified in `docs/DESIGN.md`, plus PDF/JSON/text outputs, from the
content in `src/content/resume.ts`.

**Architecture:** Next.js App Router, everything prerendered at build. Sections are server components that
read the typed content module; small client components add the effects (scramble, dot field, dock, palette).
Pure logic lives in `src/lib` with unit tests; the browser behaviour is covered by Playwright smoke tests.

**Tech Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · cmdk ·
lucide-react · @react-pdf/renderer · Vitest · Playwright · pnpm.

## Global Constraints

- Read `docs/DESIGN.md` first. It is the source of truth for look, behaviour and copy.
- `src/content/resume.ts` and `src/content/types.ts` already exist and are the only source of facts. Never add
  or change facts, numbers, names or dates. Render nothing for `null` or empty fields.
- Keep the versions and config that `create-next-app` generates (Next 16.4, Tailwind through the generated
  setup, the generated `tsconfig.json`, `eslint.config.mjs`, `AGENTS.md`). Before using any Next.js API, read the
  matching guide in `node_modules/next/dist/docs/`; this Next.js is newer than most training data. Do the same
  through current docs for motion, cmdk and @react-pdf/renderer.
- Every route must be prerendered: `pnpm build` output may not list a dynamic route.
- No analytics, cookies, or runtime third-party requests. No new dependencies beyond Task 1's list.
- Code style: TypeScript strict, no `any`, no explanatory comments, small focused files.
- Each task ends with `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all passing, then one commit:
  a single-line conventional subject, no body, no trailers. Do not push.
- Work only inside `C:\Work\topthammanun-resume` on branch `main`. Stop any dev server you start.
- UI tasks: take Playwright screenshots at 1440×900, 768×1024 and 360×800 in both themes, look at them, and
  fix what looks wrong before finishing. Keep screenshots out of the repo.

## File Structure

```
src/app/            layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts, opengraph-image.tsx,
                    resume.json/route.ts, resume.txt/route.ts, llms.txt/route.ts
src/content/        types.ts, resume.ts                      (exists)
src/lib/            cx.ts, sections.ts, format.ts, scramble.ts, content-lint.ts, selectors.ts, json-resume.ts,
                    plain-text.ts, llms.ts, commands.ts, shortcuts.ts   (+ *.test.ts beside each)
src/components/ui/        Section.tsx, Chip.tsx, Button.tsx, Kbd.tsx, Reveal.tsx, CopyButton.tsx
src/components/sections/  hero/{Hero,ScrambleText,LiveClock,DotField}.tsx,
                          work/{Work,WorkFilters,ProjectRow,LayerDiagram}.tsx, log/{Log,GitGraph}.tsx,
                          stack/Stack.tsx, agents/Agents.tsx, contact/Contact.tsx, footer/Footer.tsx
src/components/shell/     Shell.tsx, ui-store.tsx, Dock.tsx, CommandPalette.tsx, ThemeToggle.tsx,
                          theme-script.ts, useSectionSpy.ts, useShortcuts.ts, ConsoleGreeting.tsx
src/pdf/            ResumeDocument.tsx
scripts/            build-pdf.tsx
tests/e2e/          smoke.spec.ts, a11y.spec.ts
```

---

### Task 1: Foundation

**Files:** scaffold output; `package.json`, `next.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`,
`src/app/page.tsx`, `src/components/shell/{Shell.tsx,ui-store.tsx,theme-script.ts}`,
`src/components/ui/Section.tsx`, `vitest.config.ts`, `playwright.config.ts`, `.prettierrc.json`.

**Produces:** tokens as Tailwind utilities (`bg-bg`, `text-fg`, `text-fg-muted`, `border-line`, `text-accent`,
`bg-accent-fill`, `text-violet`, `font-sans`, `font-mono`); `<Shell>` wrapping the page; `<Section>`.

- [ ] Scaffold into a temp folder and copy in (the project folder already has `docs/`, `src/content/`,
  `CLAUDE.md`, `.git`):
  `npx create-next-app@latest C:\Work\_resume_scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --disable-git --no-agent-feedback --yes`,
  then copy everything except `node_modules` into the project root without overwriting existing files, delete
  the temp folder, set `"name": "topthammanun-resume"`, run `pnpm install`.
- [ ] Add dependencies: `motion cmdk lucide-react @react-pdf/renderer`; dev: `vitest tsx prettier
  @playwright/test @axe-core/playwright`. Run `pnpm exec playwright install chromium`.
- [ ] Scripts: `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `e2e` (`playwright test`), `format`
  (`prettier --write .`), `build:pdf` (`tsx scripts/build-pdf.tsx`), and `prebuild` calling `build:pdf` (add the
  `prebuild` line in Task 6, when the script exists).
- [ ] `vitest.config.ts`: node environment, `include: ["src/**/*.test.ts"]`, alias `@` → `src`.
  `playwright.config.ts`: `testDir: "tests/e2e"`, `webServer` = `pnpm build && pnpm start` on port 3100,
  chromium only.
- [ ] `globals.css`: every variable from DESIGN §1 under `:root, [data-theme="dark"]` and
  `[data-theme="light"]`; map them with `@theme inline` (`--color-bg: var(--bg)` and so on, plus `--font-sans`,
  `--font-mono`, the easing token); `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))`;
  base styles (body colours, `::selection` violet, focus ring, `tabular-nums` utility for mono numerals,
  reduced-motion rule, print rule hiding `[data-print="hide"]`).
- [ ] Fonts in `layout.tsx` with `next/font/google`: Geist, JetBrains Mono, Prompt (`thai` + `latin`, weights
  400/500/600), exposed as CSS variables and wired into `--font-sans` (Geist, Prompt) and `--font-mono`.
- [ ] `theme-script.ts` exports the inline script string: read `localStorage.theme`, default `"dark"`, set
  `document.documentElement.dataset.theme`. Inject it in `<head>` so there is no flash; add
  `suppressHydrationWarning` on `<html>`.
- [ ] `layout.tsx` metadata from `resume`: title `Top Thammanun — Full-Stack Developer`, description =
  `profile.tagline`, `metadataBase` = `meta.siteUrl`, canonical `/`, Open Graph and Twitter basics.
- [ ] `ui-store.tsx` (client context): `activeTech`, `techFilter`, `openProject`, `paletteOpen`, `paletteView`
  (`"root" | "help"`) with setters; `useUi()` hook. `Shell.tsx` provides it and renders `children`.
- [ ] `Section.tsx`: props `id`, `index`, `label`, `meta?`, `children`; renders the header row, the top hairline
  with `+` marks and the section padding from DESIGN §1. The page frame (two vertical hairlines) lives in
  `page.tsx`.
- [ ] `page.tsx`: frame plus six empty `<Section>`s with the ids and labels from `src/lib/sections.ts`
  (create that file now, see Task 2 for its shape).
- [ ] Verify, then commit `chore: scaffold next app with design tokens`.

**Accept:** both themes render with correct colours when `data-theme` is switched by hand; fonts load without
layout shift; build lists only prerendered routes.

### Task 2: Content logic and tests

**Files:** every file under `src/lib/` in the tree above, each with a `*.test.ts`. Write the test first.

**Produces (exact signatures):**

```ts
// sections.ts
export type SectionId = "home" | "work" | "log" | "stack" | "agents" | "contact";
export const SECTIONS: readonly { id: SectionId; index: string; label: string; key: string }[];
// home 00 h · work 01 w · log 02 l · stack 03 s · agents 04 a · contact 05 c

// format.ts
export function formatPeriod(p: Period): string;                 // "2024-03 → 2026-07", open end "→ now"
export function monthsBetween(start: YearMonth, end: YearMonth): number; // inclusive
export function formatDuration(months: number): string;          // 29 → "2y 5m", 12 → "1y", 5 → "5m", 0 → "1m"
export function periodDuration(p: Period, now: YearMonth): string;
export function toYearMonth(d: Date): YearMonth;

// scramble.ts
export const DEFAULT_CHARSET: string;                            // "!<>-_\\/[]{}=+*^?#01"
export function scrambleFrame(target: string, progress: number, rand: () => number, charset?: string): string;

// content-lint.ts
export function lintResume(r: Resume): { errors: string[]; pending: string[] };

// selectors.ts
export function projectsUsing(r: Resume, techId: string): Project[];
export function techUsage(r: Resume): Record<string, number>;
export function countByKind(r: Resume): Record<ProjectKind | "all", number>;
export function techName(r: Resume, id: string): string;

// json-resume.ts
export function toJsonResume(r: Resume): JsonResume;             // define the JsonResume type in this file

// plain-text.ts
export function wrap(text: string, width: number): string[];
export function toPlainText(r: Resume, now: YearMonth): string;

// llms.ts
export function toLlmsTxt(r: Resume): string;

// commands.ts
export type CommandAction =
  | { type: "section"; id: SectionId } | { type: "project"; slug: string }
  | { type: "href"; href: string; newTab: boolean } | { type: "copy"; text: string }
  | { type: "theme" } | { type: "help" };
export interface Command { id: string; group: "Navigate" | "Projects" | "Actions" | "Open" | "Help";
  label: string; hint?: string; keywords?: string[]; action: CommandAction }
export function buildCommands(r: Resume): Command[];

// shortcuts.ts
export type Intent = { type: "section"; id: SectionId } | { type: "theme" } | { type: "help" }
  | { type: "next" } | { type: "prev" };
export interface ShortcutState { pendingG: number | null }
export function reduceShortcut(state: ShortcutState, key: string, now: number):
  { state: ShortcutState; intent: Intent | null };
```

**Required test cases:**

| Unit | Case | Expected |
|---|---|---|
| `monthsBetween` | `2024-03`, `2026-07` | 29 |
| `formatDuration` | 29, 12, 5, 0 | `2y 5m`, `1y`, `5m`, `1m` |
| `formatPeriod` | end `null` | `2026-07 → now` |
| `scrambleFrame` | progress 1 | equals target |
| `scrambleFrame` | progress 0, `rand = () => 0` | same length, spaces kept, other chars = `charset[0]` |
| `scrambleFrame` | progress 0.5, 10 chars | first 5 chars equal target |
| `lintResume` | real `resume` | `errors` is `[]`; `pending` is `["profile.fullName","profile.email","profile.linkedin","education"]` |
| `lintResume` | fixtures: duplicate slug, duplicate tech id, unknown category, unknown stack id, unknown timeline project, bad `YYYY-MM`, end before start, empty highlights, two `head` events, non-https href | one error each, naming the path |
| `projectsUsing` | `postgresql` | `epermit` and `abc` |
| `countByKind` | real `resume` | all 7, client 3, tooling 1, side 3 |
| `toJsonResume` | real `resume` | `basics.name` is `Top Thammanun`; a GitHub profile with username `TopThammanun`; `work.length` 3; no `null`/`undefined` anywhere; no `email` key |
| `toPlainText` | real `resume` | every line ≤ 80 chars; contains each project name |
| `toLlmsTxt` | real `resume` | first line `# Top Thammanun`; links to `/resume.json` |
| `buildCommands` | real `resume` | ids unique; 6 Navigate; one Projects command per project; no command for `null` links |
| `reduceShortcut` | `g` then `w` within 1000ms | intent section `work` |
| `reduceShortcut` | `g` then `w` after 1001ms | intent `null` |
| `reduceShortcut` | `t`, `?`, `j`, `k` | theme, help, next, prev |

- [ ] For each unit: failing test, run `pnpm test`, implement, run again.
- [ ] Commit `feat: add content logic with tests`.

### Task 3: Hero and Work

**Files:** `src/components/ui/{Chip.tsx,Reveal.tsx}`, `src/components/sections/{Hero.tsx,ScrambleText.tsx,
LiveClock.tsx,DotField.tsx,Work.tsx,ProjectRow.tsx,LayerDiagram.tsx}`, `src/app/page.tsx`.

**Consumes:** `resume`, `formatPeriod`, `periodDuration`, `countByKind`, `scrambleFrame`, `useUi()`.

- [ ] `Reveal` (client): enter animation from DESIGN §1 using `whileInView` once; renders plain children under
  reduced motion. `Chip`: tones `default | accent | muted`, optional `as="button"`.
- [ ] `Hero` per DESIGN §2: server component for text; `ScrambleText` (client, cycles `profile.roles`, first
  paint shows the first role as real text, `aria-label` holds the stable title), `LiveClock` (client, renders a
  fixed-width placeholder until mounted, `Intl.DateTimeFormat` with `Asia/Bangkok`), `DotField` (client canvas,
  device-pixel-ratio aware, text mask `TOP`, uses `public/portrait.jpg` if present, pauses when off-screen or the
  tab is hidden, static frame under reduced motion, `aria-hidden`). The PDF button links to `/resume.pdf`; the
  palette hint button calls `setPaletteOpen(true)`.
- [ ] `Work` per DESIGN §2: filter chips with counts, tech filter pill from `techFilter`, rows from
  `ProjectRow`, single-open accordion driven by `openProject` (default: first project), animated height,
  `#work-<slug>` handling on load and on hash change, dimming driven by `activeTech ?? techFilter`.
- [ ] `LayerDiagram`: one band per layer, monoline, label column fixed width, chips wrap.
- [ ] Screenshots, verify, commit `feat: add hero and work sections`.

**Accept:** with JavaScript disabled the hero text and every project's content are still in the HTML; the
accordion works by keyboard; no layout shift when the clock mounts.

### Task 4: Log, Stack, Agents, Contact, Footer

**Files:** `src/components/sections/{Log.tsx,GitGraph.tsx,Stack.tsx,Agents.tsx,Contact.tsx,Footer.tsx}`,
`src/components/ui/CopyButton.tsx`, `next.config.ts`, `src/app/page.tsx`.

- [ ] `Log` + `GitGraph` per DESIGN §2: SVG lanes sized from row height so nodes align with rows at every
  breakpoint; `main` in `--accent`, `branch` in `--violet`; rows link to `#work-<slug>` and set `openProject`.
- [ ] `Stack`: category rows; chips set `activeTech` on hover/focus and toggle `techFilter` on click, then
  scroll to `#work`; show `used in N projects` from `techUsage`; unused techs render as non-interactive chips.
- [ ] `Agents`: statement, four practice cards, the sample skill block (mark it `sample`), the closing line.
- [ ] `Contact`: endpoint rows from `profile.links`, `email`/`linkedin` only when not `null`, then the four
  machine routes. `CopyButton` uses the Clipboard API, shows `copied` for 1.5s in an `aria-live` region.
- [ ] `Footer`: build line from `NEXT_PUBLIC_BUILD_SHA` and `NEXT_PUBLIC_BUILD_DATE`, set in `next.config.ts`
  from `VERCEL_GIT_COMMIT_SHA` or `git rev-parse --short HEAD` (fallback `dev`) and the build date; the
  outlined wordmark.
- [ ] Screenshots, verify, commit `feat: add log, stack, agents, contact and footer`.

### Task 5: Dock, palette, shortcuts, theme

**Files:** `src/components/shell/{Dock.tsx,CommandPalette.tsx,ThemeToggle.tsx,useSectionSpy.ts,useShortcuts.ts,
ConsoleGreeting.tsx,Shell.tsx}`.

**Consumes:** `SECTIONS`, `buildCommands`, `reduceShortcut`, `useUi()`.

- [ ] `useSectionSpy`: IntersectionObserver over the six section ids, returns the active id.
- [ ] `Dock` per DESIGN §3, `nav` landmark with `aria-current` on the active item, sliding pill via `layoutId`,
  `data-print="hide"`.
- [ ] `ThemeToggle`: flips `data-theme`, writes `localStorage.theme`, exposes `toggleTheme()` for the palette and
  shortcut.
- [ ] `CommandPalette` with cmdk inside a dialog: groups from `buildCommands`, executes each `CommandAction`
  (section scroll, open project and scroll to it, open href, copy with confirmation, theme), `paletteView`
  `"help"` shows the shortcut list.
- [ ] `useShortcuts`: one `keydown` listener using `reduceShortcut`; ignores events from inputs, textareas,
  contenteditable and when a modifier other than Shift is held; `Ctrl/⌘ K` toggles the palette.
- [ ] `ConsoleGreeting`: one styled `console.log` on mount.
- [ ] Mount all of them in `Shell`. Screenshots, verify, commit `feat: add dock, command palette and shortcuts`.

**Accept:** palette opens and closes with the keyboard, traps focus and returns it; `g w` scrolls to Work;
theme choice survives a reload with no flash.

### Task 6: Machine-readable outputs and PDF

**Files:** `src/app/{resume.json/route.ts,resume.txt/route.ts,llms.txt/route.ts,sitemap.ts,robots.ts,
opengraph-image.tsx,favicon.ico}`, `src/pdf/ResumeDocument.tsx`, `scripts/build-pdf.tsx`, `package.json`,
`.gitignore`.

- [ ] Three GET route handlers returning `toJsonResume`, `toPlainText`, `toLlmsTxt` with the right content
  types. Make them prerendered the way the local Next.js docs prescribe for this config.
- [ ] `sitemap.ts`, `robots.ts` (allow all, link the sitemap), `opengraph-image.tsx` per DESIGN §4.
- [ ] Copy `C:\Work\top\public\favicon.ico` to `src/app/favicon.ico`.
- [ ] `ResumeDocument.tsx`: A4, built-in Helvetica and Courier, sections Header, Summary, Experience (client
  projects with highlights), Projects (the rest, one line each), Skills by category, Languages, links. Real
  text, single column, no images. `scripts/build-pdf.tsx` renders it to `public/resume.pdf`.
- [ ] Add `"prebuild": "pnpm build:pdf"`, add `public/resume.pdf` to `.gitignore`.
- [ ] Verify: after `pnpm build && pnpm start`, `curl` each route and check status 200, content type and that
  the PDF starts with `%PDF`. Commit `feat: add resume json, text, llms and pdf outputs`.

### Task 7: End-to-end checks and polish

**Files:** `tests/e2e/{smoke.spec.ts,a11y.spec.ts}`, `README.md`, fixes anywhere.

- [ ] `smoke.spec.ts`: page has the six sections and the name; palette opens with `Control+K`, filtering
  `work` and pressing Enter scrolls to Work; theme toggle changes `data-theme` and persists after reload;
  opening a project row shows its highlights; `/resume.json` parses and has `basics.name`; `/resume.pdf`
  returns `application/pdf`; no horizontal scroll at 360px; no console errors.
- [ ] `a11y.spec.ts`: axe scan in both themes with zero serious or critical violations.
- [ ] Run Lighthouse on the production build (mobile) and fix until DESIGN §6 is met; record the four scores
  in `README.md`.
- [ ] `README.md`: what this is, commands, where content lives, the pending content fields, how to deploy.
- [ ] Final screenshots at the three widths in both themes; fix spacing, overflow and contrast issues.
- [ ] Verify including `pnpm e2e`, commit `test: add e2e and accessibility checks`.

## Implementation notes

Where the build differs from the task text above, and why:

- **No `motion` dependency.** The dock pill is a CSS transform transition (`useActivePill`), reduced motion is
  read with `usePrefersReducedMotion`. Removing motion was needed to keep Lighthouse Performance at 90 or more.
- **`Reveal` uses an IntersectionObserver and CSS**, not `whileInView`. Hidden states only apply under
  `[data-js]` (set by the head script), so every section stays readable without JavaScript. Collapsed Work
  panels use the same rule.
- **Command palette** is cmdk's `Command` inside a native `<dialog>` with a labelled title (focus trap, Escape
  and focus return come from the browser). The search UI is code-split and prefetched 1.5s after load.
- **`CommandAction`** has `{ type: "help" }` instead of `{ type: "none" }`.
- **Fonts:** only Geist is preloaded; JetBrains Mono and Prompt load on use.
- **`"type": "module"`** in `package.json`, because `@react-pdf/renderer`'s hyphenation package is ESM only.
- **Hero meta keys** use `--fg-muted`, since `--fg-faint` fails AA at that size.

## Changes after the plan

Requested by the owner once the seven tasks were done. These replace the matching task text above;
`docs/DESIGN.md` describes the current behaviour.

- **Mascot instead of the `TOP` mask.** The hero dot field samples `public/mascot.png` (the v1 mascot, trimmed and
  converted to white on transparent) into a 64-column halftone that blinks and reacts to the pointer. It is
  drawn in one frame on load: an animated load-in cost about two Lighthouse Performance points.
  The text mask and the `public/portrait.jpg` hook are gone. Pure math lives in `src/lib/dot-field.ts`, canvas
  helpers in `hero/dot-canvas.ts`, the art's size and eye positions in `hero/mascot.ts`.
- **Real name.** `profile.givenName` and `profile.familyName` replace `name` and the nullable `fullName`;
  `src/lib/identity.ts` builds the full name, the alternate names and the download file name.
- **Search.** `src/lib/seo.ts` builds the title, description, keywords and JSON-LD (`Person`, `WebSite`,
  `ProfilePage`). The layout adds authors, robots directives, `profile` Open Graph fields and an optional
  `GOOGLE_SITE_VERIFICATION` token. The Open Graph image shows the full name and mascot.
- **AI search.** `robots.ts` names the AI crawlers from `src/lib/crawlers.ts`, the sitemap and the head's
  alternate links list every machine-readable route, and `/llms.txt` gained a one-sentence identity line and a
  skills section. `BING_SITE_VERIFICATION` is the optional token for Bing Webmaster Tools.
- **Formal PDF.** Times, black on white, centred header, `Professional Summary`, `Professional Experience`,
  `Selected Projects`, `Technical Skills`, `Education` (when present) and `Languages`, month-name dates, a
  `Technologies` line per entry and page numbers. `profile.summary` is written without first-person pronouns.
  For LinkedIn and ATS parsers the name is in normal case, experience entries lead with the job title, and an
  e2e test keeps the file under 2 MB.
- **Recruiter pass.** The mixed project list became two sections: Work (company cases, shown in full) and
  Personal (cards). The hero leads with `Download resume` and a band of career stats from `src/lib/stats.ts`;
  a statement band and the Agents statement light up word by word on scroll; Log and Stack are labelled
  Timeline and Skills; gold and violet mark company and personal work in the timeline and the skills list.
  The kind filter is gone, and `companyProjects` / `personalProjects` replace the scattered `kind` checks.
- **Project pages.** Personal projects have prerendered pages at `/projects/<slug>` with long-form chapters
  and a screenshot gallery (`src/components/project/`). The Godot prototypes carry 14 screenshots captured by
  running both games with a small driver script. The shell (dock, palette, shortcuts) moved from the root
  layout to the home page.
- **Site URL.** `meta.siteUrl` reads `VERCEL_PROJECT_PRODUCTION_URL`, so canonical links, the sitemap and the
  PDF follow whichever production domain the Vercel project has.
- **Career and education.** `career` (intern, junior, senior at one employer) and a fuller `education` entry
  feed a career path at the top of Timeline, the hero meta table (`at`, `path`, `edu`), `Professional
  Experience` in the PDF, `work`, `education` and `awards` in the JSON resume, the text outputs and the
  JSON-LD (`worksFor`, `alumniOf`). The title is now `Senior Full Stack Developer`. Company projects moved to
  their own PDF section.
- **Commit calendar.** `scripts/build-activity.ts` writes `src/content/activity.ts` from local clones, and the
  hero shows it under the mascot as a dot calendar coloured by company or personal work, with a readout for
  the day under the pointer (`hero/CommitCalendar.tsx`, `src/lib/commit-calendar.ts`).
- **Practice skills.** `competencies` adds Git workflow, problem solving and database performance to Skills
  and to every output that lists skills.
- **IBRAND.** The university hackathon project is a personal project with its own page, written from its two
  public repositories. Chapters may now have no images. Personal cards use a two-column grid.
