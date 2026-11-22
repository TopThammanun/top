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

Rules: gold on at most about 5% of the screen (index numbers, active states, links, cursor glow, company work).
Violet is rarer (personal projects, text selection). Body text never uses `--fg-faint`.
`#7828c8` on `#1c1740` is 2.4:1, so it is never text in dark mode. Every text pair must pass WCAG AA.

Type: Geist (sans), JetBrains Mono (labels, meta, numerals, code), Prompt (Thai fallback), all through
`next/font/google`.

| Role | Size | Notes |
|---|---|---|
| display | `clamp(2.5rem, 7.2vw, 6rem)` | 600, tracking -0.04em, leading 0.95 |
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

## 2. Page structure

The first reader is a recruiter with a few seconds: who this is, how much company experience, what they built,
how to get the resume. Company work is the main content; personal projects are a separate, lighter section with
their own pages. Gold marks company work and violet marks personal projects everywhere (cards, timeline, skills).

Every section on `/` has `id`, a header row `NN  LABEL ............ meta` (index in gold mono, label in mono caps,
meta right-aligned), and is a landmark with an accessible name. Section ids, indexes, labels and shortcut keys
live in `src/lib/sections.ts`.

### 00 Home (`#home`)
- Left (7/12): mono path label `~/topthammanun`; the full name `Thammanun Aikhamdaeng` as the `h1`; role line
  that cycles `profile.roles` with a scramble/decode effect (every 3.2s, 600ms decode); tagline; one primary
  button `Download resume` (saved as `Thammanun-Aikhamdaeng-Resume.pdf`), then `View company work` and a
  `Ctrl K` / `⌘ K` hint button that opens the palette.
- Meta table in mono, key column muted: `aka` (`Top Thammanun`), `at` (current employer), `path` (the role
  ladder, `Intern → Junior → Senior Full Stack Developer`), `edu` (school and honors), `now`, `loc`
  (`Thailand · UTC+7`), `time` (live `HH:mm:ss` in Asia/Bangkok, rendered only after mount), `focus`
  (`.NET · TypeScript · Next.js`). From 1024px the table sits at the bottom of the column, level with the
  calendar.
- Right (5/12): **dot field mascot**. A canvas grid of 64 columns of dots; `public/mascot.png` (white on
  transparent) is sampled per cell and its coverage sets each dot's size, so the mascot reads as a halftone.
  The mascot blinks every few seconds, and the pointer brightens nearby dots to gold and pushes them
  slightly. Static render under reduced motion. Hidden from assistive tech. On mobile it
  sits above the text at 40vh max.
- Under the mascot: **commit calendar** (`fig. 01`), drawn in the same dot language. One dot per day for the
  53 weeks in `src/content/activity.ts`, Monday at the top. Dot size is the day's rank among active days
  (quartiles, `src/lib/commit-calendar.ts`); gold when most commits that day were company work, violet when
  most were personal. The weeks wrap into two half-year strips in a narrow card and run as one strip from
  576px of card width. A line above the dots gives the total, the active days and the longest streak; pointing
  at or tapping a day replaces it with that day's date and counts and rings the dot. The grid is one image
  for assistive tech, labelled with the range and the totals. Below 1024px the calendar spans the full
  width; on mobile it follows the meta table.
- **Career stats** under both columns, computed from company projects only (`src/lib/stats.ts`): time on
  company projects with its start month, number of company projects, repositories and commits, plus a
  footnote saying where the counts come from.
- No availability claim. Nothing is shown for `null` profile fields.

### Statement band
- Between Home and Work, with no index: the first line of `profile.summary` in statement type. Words start
  at 50% opacity (the lowest that keeps large text at 3:1 in both themes) and light up one by one as the block scrolls between 85% and 35% of the viewport
  (`src/lib/word-reveal.ts`). Full colour at once without JavaScript or under reduced motion. The Agents
  statement uses the same effect.

### 01 Work (`#work`): company projects
- Intro `Company work.` naming the employer, with a line explaining that client names are left out on
  purpose.
- One case per company project, all visible without a click: gold index, a `Current` chip when the period is
  open, name, role and domain, period in month names with duration, summary, every highlight, and stat tiles
  (`commits`, `repos`).
- `Architecture and stack` toggle per case (`<button aria-expanded>`, several can be open, the first starts
  open): **layer diagram** (one bordered band per `layer`, label on the left in mono, items as chips) and the
  stack chips. `#work-<slug>` deep-links and opens that case.
- When a skill is hovered or selected, projects that do not use it dim to 45% in both Work and Personal; a
  notice above the list names the selected skill and clears it.

### 02 Personal (`#personal`): personal projects
- Intro `Personal projects.` Cards in a two-column grid: violet dot with the domain, name, period, summary,
  stack chips and `View project`. A project with screenshots is featured across the full width with its first
  screenshot and the screenshot count. The whole card links to the project page.

### 03 Timeline (`#log`)
- **Career path** first: one step per `education` entry, then one per `career` role from the first to the
  current one (`src/lib/career.ts`). Four columns from 1024px, two from 640px, one below. Each step has a node
  on a rail (gold for roles, filled for the current one), its number, what is known about when (`Graduated
  Mar 2024`, `14 months`, `Mar 2026 – Present`, or nothing), title, employer or program, honors in gold, a
  one-sentence summary, chips (coursework or the technologies of that role) and links (the project done at
  university, the product pages of the internship). Dates the owner has not given are not shown.
- Caption `$ git log --graph --author=top` and a legend (gold = company work, violet = personal projects).
- An SVG graph on the left with two lanes, `main` and `branch`. One node per `resume.timeline` event, newest
  first; branch nodes connect to the main lane with a curved fork line. Lines and nodes take the colour of
  their project's group, so a company project on a side branch is still gold.
- Each row: date in mono, node, commit-style message in mono, and for the `head` event a
  `(HEAD -> now)` chip. Clicking a row jumps to its project.
- Footnote: `Timeline derived from commit history.`

### 04 Skills (`#stack`)
- Caption `dependencies`. One row per category: label on the left, tech chips on the right. Each used chip
  has a gold or violet dot (used on company work, or only on personal projects) and the number of projects
  that use it. The legend sits under the list.
- Hover or focus a chip: it turns gold, shows `used in N projects`, and dims the projects that do not use it.
  Click toggles it as the filter and scrolls to Work. Techs used by no project are still listed but not
  clickable.
- A second block, `practices`, lists `resume.competencies` (Git workflow, problem solving, database
  performance) in the same row layout with plain chips. They are ways of working, not tied to one project,
  so they carry no dot, count or filter. Every output that lists skills includes them.

### 05 Agents (`#agents`)
- Statement with the word reveal: `I work with coding agents the way I work with a team: written process,
  guardrails, proof.`
- Four cards from `resume.practices` (index, title, body).
- A mono code block showing an illustrative skill header (clearly a sample, not a real file).
- One line: `This site was planned by one model and implemented by another, from a written plan.`

### 06 Contact (`#contact`)
- Intro `Get in touch.` with location, time zone and languages, then the same primary `Download resume`
  button as the hero, plus `Email me` and `LinkedIn` buttons only when those fields are set.
- Rows styled like an API reference: method `GET` in gold, path, value, actions (copy, open).
  `/github`, `/website`, plus `/email` and `/linkedin` only when set. Then the machine-readable routes:
  `/resume.pdf`, `/resume.json`, `/resume.txt`, `/llms.txt`.
- Copy gives a 1.5s `copied` confirmation announced to screen readers.

### Project pages (`/projects/<slug>`)
- One prerendered page per personal project (`generateStaticParams`), with its own title, description and
  canonical URL; unknown slugs return 404. The dock, palette and shortcuts belong to `/` only; a project page
  has a top bar with `All projects`, the handle and the theme toggle.
- Header in the Personal section style: domain, name as `h1`, period, role, summary, optional outside links
  (`project.links`), then highlights beside stat tiles, the layer diagram and stack chips.
- One band per `project.chapters` entry: title, paragraphs and, when the chapter has images, a two-column
  gallery. A screenshot opens in a native `<dialog>` viewer with its caption, a counter, previous and next
  (also the arrow keys) and close.
- Previous and next project links at the end.
- Screenshots live in `public/projects/<slug>/` as lossless WebP and are listed, with alt text and captions,
  in `src/content/resume.ts`. `content-lint` checks that every listed file exists.

### Footer
- Mono build line: `build <sha7> · <yyyy-mm-dd> · next <version> · 0 trackers`.
- Oversized wordmark `topthammanun` in mono, hairline outline (`-webkit-text-stroke`), filling the width,
  cropped at the bottom. Decorative.

## 3. Shell

- **Dock**: fixed, bottom-centre, pill, blurred `--bg-raised` at 80% with a hairline border. Items: Home, Work,
  Personal, Timeline, Skills, Agents, Contact, a divider, palette button, theme toggle. Icons (lucide) plus
  labels from 1024px, icons only below, with tighter padding under 380px. Active item has a sliding pill (CSS transform transition). Section spy with IntersectionObserver.
  Hidden in print. Page has bottom padding so the dock never covers the footer.
- **Command palette** (cmdk): opens with `Ctrl/⌘ K` or the dock button. Groups: Navigate (7 sections),
  Projects (open a project, labelled company or personal), Actions (Download PDF, Toggle theme, Copy GitHub URL, Copy site URL),
  Open (GitHub, resume.json, resume.txt), Help (shortcut list). Focus is trapped; Escape closes;
  focus returns to the trigger.
- **Shortcuts** (ignored while typing in an input): `?` palette on Help, `t` theme, `j` / `k` next/previous
  section, `g` then `h w p t s a c` jump to a section (1s window).
- **Theme**: `data-theme="dark" | "light"` on `<html>`, default dark, stored in `localStorage["theme"]`, set by
  an inline script before paint. `color-scheme` follows it.
- **Console greeting**: one styled `console.log` with the name, the GitHub URL and `/resume.json`.

## 4. Machine-readable outputs

All generated from `src/content/resume.ts` and prerendered at build.

| Route | Content |
|---|---|
| `/resume.json` | JSON Resume schema v1.0.0 (`basics`, `work` from the roles, `education`, `awards` from honors, `projects` with company work first, `skills` by category plus the practice skills, `languages`, `meta`) |
| `/resume.txt` | plain text, lines ≤ 80 columns |
| `/llms.txt` | short markdown summary with links to the other routes |
| `/resume.pdf` | formal resume for job applications and LinkedIn uploads: three A4 pages via `@react-pdf/renderer`, single column, built-in Times, black on white, selectable text in reading order, `Professional Experience` as one entry per role (title, employer, dates when known), then `Company Projects`, `Personal Projects`, `Technical Skills`, `Education` and `Languages`, visible URLs, page numbers, under LinkedIn's recommended 2 MB, written to `public/` before `next build` |
| `/sitemap.xml` | the page, the project pages and the four routes above |
| `/robots.txt` | allow all, with the AI search and assistant agents named explicitly |
| Open Graph image | 1200×630, `#1c1740`, full name, title, mascot, gold index mark |

### Search

The names people search for are `Thammanun Aikhamdaeng`, `topthammanun` and `Top Thammanun`. The full name is the
`h1`, leads the `<title>` (`Thammanun Aikhamdaeng (topthammanun) — Senior Full Stack Developer`) and the
description, and is the PDF's title and author. JSON-LD on the page describes a `Person` (with `givenName`,
`familyName`, `alternateName`, `sameAs`, `worksFor`, `alumniOf`), the `WebSite` and the `ProfilePage`. Open Graph uses the `profile` type with first
name, last name and username. Text and data come from `src/lib/seo.ts` and `src/lib/identity.ts`.

For AI search, `/robots.txt` welcomes the crawlers listed in `src/lib/crawlers.ts` (OpenAI, Anthropic, Perplexity,
Google, Apple, Amazon, DuckDuckGo, Mistral, Meta, Common Crawl), the page head links the machine-readable routes
as alternates, and `/llms.txt` opens with one quotable sentence saying who this is, followed by the summary,
career, education, projects, skills and contact links. Every section is in the prerendered HTML, so nothing depends on running JavaScript.

## 5. Content rules

- `src/content/resume.ts` is the only source of facts. Do not add facts, numbers, employers, dates or client
  names that are not in it. `null` fields and empty arrays mean "not provided yet": render nothing for them.
- Pending owner input: `profile.email`, `profile.linkedin`, and the start and end months of the junior and
  intern roles (`career[].period` is `null` for them, so no dates are shown).
- `src/content/activity.ts` is generated by `pnpm build:activity` from local clones: commits per day for 53
  weeks, split into company and personal by the folder a repository is in, each commit hash counted once.
- `meta.siteUrl` follows the deployment: Vercel's production domain when it is set, otherwise
  `www.topthammanun.dev`.
- Client names are intentionally absent; the employer is named. Commit counts are rounded figures from local
  clones on `meta.statsAsOf`.
- English only. Keep copy plain; no marketing adjectives.

## 6. Quality bar

- Lighthouse (mobile, production build): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Keyboard: every interactive element reachable, visible focus ring (2px `--accent`, 2px offset).
- No layout shift from fonts or the live clock. No horizontal scroll at 360px.
- Works without JavaScript for reading: all text content is server-rendered; only effects need JS.
- No analytics, no cookies, no third-party requests at runtime.
