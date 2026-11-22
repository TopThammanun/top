# topthammanun.dev v2 — Design Spec

Web resume for Thammanun Aikhamdaeng (Top Thammanun, `topthammanun`). Minimal, geek/nerd, Awwwards-level craft,
Mobbin-style product UI patterns.
Mood reference only: https://www.poulo.site/ (floating dock, hairline frame, table-like journey). Do not clone it:
no top dock, no logo bubbles, no monochrome palette, no chat widget. The hero carries the owner's own mascot
(from the v1 site), drawn as a dot field rather than as an illustration.

Concept: **the resume as a well-documented system**. Projects are indexed entries, the career is a git graph,
skills are a dependency matrix, contact details are endpoints, and the same data is served to humans, ATS
parsers and agents.

## 1. Tokens

Colors come from v1 (`src/theme/colors/dark.ts`, `light.ts` in the old site). Dark is the default theme.

| CSS variable | Dark | Light |
|---|---|---|
| `--bg` | `#1c1740` | `#F9FAFE` |
| `--bg-raised` | `#231d4d` | `#ffffff` |
| `--bg-sunken` | `#16123a` | `#f1f2f8` |
| `--fg` | `#ECEDEE` | `#11181C` |
| `--fg-muted` | `#a1a1aa` | `#52525b` |
| `--fg-faint` | `#71717a` (decorative, large text only) | `#a1a1aa` (decorative only) |
| `--line` | `rgba(255,255,255,0.15)` | `rgba(17,17,17,0.15)` |
| `--line-strong` | `rgba(255,255,255,0.3)` | `rgba(17,17,17,0.3)` |
| `--accent` | `#d79b19` | `#955713` |
| `--accent-fill` | `#d79b19` | `#d79b19` |
| `--accent-ink` | `#3d1d0b` | `#3d1d0b` |
| `--violet` | `#bc88f8` | `#7828c8` |
| `--violet-deco` | `#7828c8` | `#bc88f8` |
| `--ok` | `#10b981` | `#047852` |
| `--invert-bg` | `#ECEDEE` | `#1c1740` |
| `--invert-fg` | `#1c1740` | `#ECEDEE` |

Rules: gold on at most about 5% of the screen (index numbers, active states, links, cursor glow, the `main`
lane). Violet is rarer (the `branch` lane, text selection). Body text never uses `--fg-faint`.
`#7828c8` on `#1c1740` is 2.4:1, so it is never text in dark mode. Every text pair must pass WCAG AA.

Type: Geist (sans), JetBrains Mono (labels, meta, numerals, code), Prompt (Thai fallback), all through
`next/font/google`.

| Role | Size | Notes |
|---|---|---|
| display | `clamp(2.75rem, 8vw, 6.5rem)` | 600, tracking -0.04em, leading 0.95 |
| statement | `clamp(1.75rem, 3.6vw, 3rem)` | 500, tracking -0.03em, leading 1.1 |
| h3 | 1.25rem | 500 |
| body | 1rem / 1.6 | max line length 68ch |
| small | 0.875rem | |
| label | 0.75rem mono, uppercase, tracking 0.08em | section labels, table heads |

Numerals in mono with `tabular-nums`.

Space and frame: content column max 1200px, gutter 24px (16px under 640px). Two vertical hairlines run the full
page height at the column edges. Sections are separated by a horizontal hairline with a small mono `+` where it
crosses the vertical lines. Section padding 96px top/bottom (56px mobile). Radius: 6px controls, 12px cards,
999px dock and chips.

Motion: easing `cubic-bezier(0.16, 1, 0.3, 1)`. Durations 150ms hover, 250ms state change, 400ms enter.
Enter = opacity 0→1 and y 8px→0, staggered 40ms, once per element. Under `prefers-reduced-motion: reduce`:
no scramble, no canvas animation, no enter transitions, instant state changes. No smooth-scroll library;
native `scroll-behavior: smooth` only when motion is allowed.

## 2. Page structure (single page `/`)

Every section has `id`, a header row `NN  LABEL ............ meta` (index in gold mono, label in mono caps,
meta right-aligned), and is a landmark with an accessible name.

### 00 Hero (`#home`)
- Left (7/12): mono path label `~/topthammanun`; the full name `Thammanun Aikhamdaeng` as the `h1`; role line
  that cycles `profile.roles` with a scramble/decode effect (every 3.2s, 600ms decode); tagline; buttons
  `View work`, `Download PDF` (saved as `Thammanun-Aikhamdaeng-Resume.pdf`), and a `Ctrl K` / `⌘ K` hint
  button that opens the palette.
- Meta table in mono, key column muted: `aka` (`Top Thammanun`), `now`, `loc` (`Thailand · UTC+7`), `time`
  (live `HH:mm:ss` in Asia/Bangkok, rendered only after mount), `focus` (`.NET · TypeScript · Next.js`).
- Right (5/12): **dot field mascot**. A canvas grid of 64 columns of dots; `public/mascot.png` (white on
  transparent) is sampled per cell and its coverage sets each dot's size, so the mascot reads as a halftone.
  The mascot blinks every few seconds, and the pointer brightens nearby dots to gold and pushes them
  slightly. Static render under reduced motion. Hidden from assistive tech. On mobile it
  sits above the text at 40vh max.
- No availability claim. Nothing is shown for `null` profile fields.

### 01 Work (`#work`)
- Filter chips: All, Client, Tooling, Side, each with a count. Optional tech filter pill
  (`tech: PostgreSQL ×`) set from the Stack section.
- Rows, one per project in `resume.projects` order: index `01`, name, domain, period (`2024-03 → 2026-07`,
  open end = `now`), duration (`2y 4m`), chevron. A row is a `<button aria-expanded>`; one row open at a time;
  the first row starts open. `#work-<slug>` deep-links and opens that row.
- Expanded panel: summary, highlights list, **layer diagram** (one bordered band per `layer`, label on the
  left in mono, items as chips; monoline, no arrows), stats (`commits`, `repos`), stack chips.
- When a tech is hovered or selected in Stack, rows that use it get a gold index and the others dim to 45%.

### 02 Log (`#log`)
- Caption `$ git log --graph --author=top`.
- An SVG graph on the left with two lanes: `main` (gold) and `branch` (violet). One node per
  `resume.timeline` event, newest first; branch nodes connect to the main lane with a curved fork line.
- Each row: date in mono, node, commit-style message in mono, and for the `head` event a
  `(HEAD -> now)` chip. Clicking a row jumps to its project in Work.
- Footnote: `Timeline derived from commit history.`

### 03 Stack (`#stack`)
- Caption `dependencies`. One row per category: label on the left, tech chips on the right.
- Hover or focus a chip: it turns gold, shows `used in N projects`, and highlights Work rows. Click toggles it
  as the Work filter and scrolls to Work. Techs used by no project are still listed but not clickable.

### 04 Agents (`#agents`)
- Statement: `I work with coding agents the way I work with a team: written process, guardrails, proof.`
- Four cards from `resume.practices` (index, title, body).
- A mono code block showing an illustrative skill header (clearly a sample, not a real file).
- One line: `This site was planned by one model and implemented by another, from a written plan.`

### 05 Contact (`#contact`)
- Statement: `Endpoints.`
- Rows styled like an API reference: method `GET` in gold, path, value, actions (copy, open).
  `/github`, `/website`, plus `/email` and `/linkedin` only when set. Then the machine-readable routes:
  `/resume.pdf`, `/resume.json`, `/resume.txt`, `/llms.txt`.
- Copy gives a 1.5s `copied` confirmation announced to screen readers.

### Footer
- Mono build line: `build <sha7> · <yyyy-mm-dd> · next <version> · 0 trackers`.
- Oversized wordmark `topthammanun` in mono, hairline outline (`-webkit-text-stroke`), filling the width,
  cropped at the bottom. Decorative.

## 3. Shell

- **Dock**: fixed, bottom-centre, pill, blurred `--bg-raised` at 80% with a hairline border. Items: Home, Work,
  Log, Stack, Agents, Contact, a divider, palette button, theme toggle. Icons (lucide) plus labels from 768px,
  icons only below. Active item has a sliding pill (CSS transform transition). Section spy with IntersectionObserver.
  Hidden in print. Page has bottom padding so the dock never covers the footer.
- **Command palette** (cmdk): opens with `Ctrl/⌘ K` or the dock button. Groups: Navigate (6 sections),
  Projects (open a project), Actions (Download PDF, Toggle theme, Copy GitHub URL, Copy site URL),
  Open (GitHub, resume.json, resume.txt), Help (shortcut list). Focus is trapped; Escape closes;
  focus returns to the trigger.
- **Shortcuts** (ignored while typing in an input): `?` palette on Help, `t` theme, `j` / `k` next/previous
  section, `g` then `h w l s a c` jump to a section (1s window).
- **Theme**: `data-theme="dark" | "light"` on `<html>`, default dark, stored in `localStorage["theme"]`, set by
  an inline script before paint. `color-scheme` follows it.
- **Console greeting**: one styled `console.log` with the name, the GitHub URL and `/resume.json`.

## 4. Machine-readable outputs

All generated from `src/content/resume.ts` and prerendered at build.

| Route | Content |
|---|---|
| `/resume.json` | JSON Resume schema v1.0.0 (`basics`, `work` from client projects, `projects` from the rest, `skills` by category, `languages`, `meta`) |
| `/resume.txt` | plain text, lines ≤ 80 columns |
| `/llms.txt` | short markdown summary with links to the other routes |
| `/resume.pdf` | formal resume for job applications: two A4 pages via `@react-pdf/renderer`, single column, built-in Times, black on white, month-name dates, page numbers, real text, written to `public/` before `next build` |
| `/sitemap.xml` | the page and the four routes above |
| `/robots.txt` | allow all, with the AI search and assistant agents named explicitly |
| Open Graph image | 1200×630, `#1c1740`, full name, title, mascot, gold index mark |

### Search

The names people search for are `Thammanun Aikhamdaeng`, `topthammanun` and `Top Thammanun`. The full name is the
`h1`, leads the `<title>` (`Thammanun Aikhamdaeng (topthammanun) — Full-Stack Developer`) and the description,
and is the PDF's title and author. JSON-LD on the page describes a `Person` (with `givenName`, `familyName`,
`alternateName`, `sameAs`), the `WebSite` and the `ProfilePage`. Open Graph uses the `profile` type with first
name, last name and username. Text and data come from `src/lib/seo.ts` and `src/lib/identity.ts`.

For AI search, `/robots.txt` welcomes the crawlers listed in `src/lib/crawlers.ts` (OpenAI, Anthropic, Perplexity,
Google, Apple, Amazon, DuckDuckGo, Mistral, Meta, Common Crawl), the page head links the machine-readable routes
as alternates, and `/llms.txt` opens with one quotable sentence saying who this is, followed by the summary, work,
skills and contact links. Every section is in the prerendered HTML, so nothing depends on running JavaScript.

## 5. Content rules

- `src/content/resume.ts` is the only source of facts. Do not add facts, numbers, employers, dates or client
  names that are not in it. `null` fields and empty arrays mean "not provided yet": render nothing for them.
- Pending owner input: `profile.email`, `profile.linkedin`, `education`.
- `meta.siteUrl` follows the deployment: Vercel's production domain when it is set, otherwise
  `www.topthammanun.dev`.
- Client names are intentionally absent. Commit counts are rounded figures from local clones on `meta.statsAsOf`.
- English only. Keep copy plain; no marketing adjectives.

## 6. Quality bar

- Lighthouse (mobile, production build): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Keyboard: every interactive element reachable, visible focus ring (2px `--accent`, 2px offset).
- No layout shift from fonts or the live clock. No horizontal scroll at 360px.
- Works without JavaScript for reading: all text content is server-rendered; only effects need JS.
- No analytics, no cookies, no third-party requests at runtime.
