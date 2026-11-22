import type { ProjectImage, Resume } from "./types";

const SITE_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "www.topthammanun.dev";
const SITE_URL = `https://${SITE_HOST}`;
const EMPLOYER = "Chanwanich Company Limited";

function shotsIn(slug: string) {
  return (file: string, alt: string, caption: string): ProjectImage => ({
    src: `/projects/${slug}/${file}.webp`,
    alt,
    caption,
    width: 1280,
    height: 720,
  });
}

const tcgShot = shotsIn("tcg-simulator");
const toolingShot = shotsIn("agent-tooling");
const siteShot = shotsIn("site-v1");
const gameShot = shotsIn("godot-games");
const ibrandShot = shotsIn("ibrand");
const auctionShot = shotsIn("tep-auction");
const patternShot = shotsIn("backend-patterns");

export const resume: Resume = {
  meta: {
    version: "0.1.0",
    updated: "2026-11-22",
    siteUrl: SITE_URL,
    sourceUrl: "https://github.com/TopThammanun/top",
    statsAsOf: "2026-11-22",
  },

  profile: {
    handle: "topthammanun",
    givenName: "Thammanun",
    familyName: "Aikhamdaeng",
    nickname: "Top",
    displayName: "Top Thammanun",
    title: "Senior Full Stack Developer",
    specialties: [".NET services, Next.js front ends", "TypeScript end to end", "Ships with coding agents"],
    tagline:
      "I build enterprise systems end to end: C#/.NET and NestJS services, Next.js front ends, and the tooling around them.",
    summary: [
      "Senior Full Stack Developer specializing in government and enterprise systems, where forms are long, business rules are strict and data accuracy is critical.",
      "Progressed from intern to Senior Full Stack Developer at one company in just over three years.",
      "Experienced on both sides of the API: ASP.NET Core and NestJS services on PostgreSQL, with React and Next.js applications built on top of them.",
      "Also builds the tooling used in day-to-day work, including skills and hooks that keep AI coding agents aligned with a defined engineering process.",
    ],
    now: "Building an e-permit platform for industrial estates",
    location: { label: "Thailand", timeZone: "Asia/Bangkok", utcOffset: "UTC+7" },
    links: [
      {
        id: "github",
        label: "GitHub",
        value: "github.com/TopThammanun",
        href: "https://github.com/TopThammanun",
      },
      {
        id: "website",
        label: "Website",
        value: SITE_HOST.replace(/^www\./, ""),
        href: SITE_URL,
      },
    ],
    email: "thammanun.aik@gmail.com",
    linkedin: "https://www.linkedin.com/in/thammanun-aikhamdaeng-764348448",
    languages: [
      { name: "Thai", level: "Native" },
      { name: "English", level: "Working proficiency" },
    ],
  },

  categories: [
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "data", label: "Data & messaging" },
    { id: "platform", label: "Auth, ops & observability" },
    { id: "testing", label: "Testing" },
    { id: "special", label: "Specialized" },
    { id: "tooling", label: "Tooling" },
  ],

  tech: [
    { id: "csharp", name: "C#", category: "languages" },
    { id: "typescript", name: "TypeScript", category: "languages" },
    { id: "javascript", name: "JavaScript", category: "languages" },
    { id: "sql", name: "SQL", category: "languages" },
    { id: "python", name: "Python", category: "languages" },
    { id: "gdscript", name: "GDScript", category: "languages" },

    { id: "nextjs", name: "Next.js", category: "frontend" },
    { id: "react", name: "React", category: "frontend" },
    { id: "mui", name: "Material UI (MUI)", category: "frontend" },
    { id: "heroui", name: "HeroUI", category: "frontend" },
    { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
    { id: "redux-toolkit", name: "Redux Toolkit", category: "frontend" },
    { id: "tanstack-query", name: "TanStack Query", category: "frontend" },
    { id: "react-hook-form", name: "React Hook Form", category: "frontend" },
    { id: "tiptap", name: "Tiptap", category: "frontend" },
    { id: "astro", name: "Astro", category: "frontend" },
    { id: "svelte", name: "Svelte", category: "frontend" },

    { id: "dotnet", name: "ASP.NET Core (.NET 8)", category: "backend" },
    { id: "ef-core", name: "Entity Framework Core", category: "backend" },
    { id: "nodejs", name: "Node.js", category: "backend" },
    { id: "nestjs", name: "NestJS", category: "backend" },
    { id: "mikro-orm", name: "MikroORM", category: "backend" },
    { id: "express", name: "Express", category: "backend" },
    { id: "prisma", name: "Prisma", category: "backend" },
    { id: "rest", name: "REST APIs", category: "backend" },
    { id: "signalr", name: "SignalR", category: "backend" },
    { id: "socketio", name: "Socket.IO", category: "backend" },

    { id: "postgresql", name: "PostgreSQL", category: "data" },
    { id: "redis", name: "Redis", category: "data" },
    { id: "elasticsearch", name: "Elasticsearch", category: "data" },
    { id: "clickhouse", name: "ClickHouse", category: "data" },
    { id: "minio", name: "MinIO (S3)", category: "data" },
    { id: "mongodb", name: "MongoDB", category: "data" },
    { id: "kafka", name: "Apache Kafka", category: "data" },
    { id: "airflow", name: "Apache Airflow", category: "data" },

    { id: "fusionauth", name: "FusionAuth", category: "platform" },
    { id: "oidc", name: "OAuth 2.0 / OpenID Connect", category: "platform" },
    { id: "docker", name: "Docker", category: "platform" },
    { id: "serilog", name: "Serilog", category: "platform" },
    { id: "elastic-apm", name: "Elastic APM", category: "platform" },
    { id: "opentelemetry", name: "OpenTelemetry", category: "platform" },
    { id: "openapi", name: "OpenAPI / Swagger", category: "platform" },

    { id: "jest", name: "Jest", category: "testing" },
    { id: "vitest", name: "Vitest", category: "testing" },
    { id: "playwright", name: "Playwright", category: "testing" },

    { id: "opencv", name: "OpenCV", category: "special" },
    { id: "tesseract", name: "Tesseract OCR", category: "special" },
    { id: "face-api", name: "face-api.js", category: "special" },
    { id: "react-pdf", name: "react-pdf", category: "special" },
    { id: "pytorch", name: "PyTorch", category: "special" },

    { id: "claude-code", name: "Claude Code (skills, hooks)", category: "tooling" },
    { id: "git", name: "Git", category: "tooling" },
    { id: "godot", name: "Godot 4", category: "tooling" },
  ],

  projects: [
    {
      slug: "epermit",
      name: "Industrial-estate e-Permit platform",
      kind: "client",
      domain: "GovTech · permits",
      role: "Senior Full Stack Developer",
      period: { start: "2026-07", end: null },
      summary:
        "Online permit applications for factory operators and the officer-side review system: long multi-tab forms, document handling, approvals and generated letters.",
      highlights: [
        "Work across four repositories at once: two Next.js apps (applicant and officer) and two NestJS services on PostgreSQL.",
        "Built multi-tab application forms with file uploads, bilingual labels and draft/resubmit flows, plus the officer side: per-field comments, return rounds and OTP-confirmed approval.",
        "Made saved applications read as a frozen snapshot instead of live registry data, so an approved request always shows what was submitted.",
        "Type new front-end code only from OpenAPI-generated clients, with no `any`.",
        "Run agent-assisted Playwright end-to-end passes over the whole flow: fill, submit, review, approve, pay and the generated PDF.",
      ],
      layers: [
        { label: "Clients", items: ["Applicant web · Next.js 16", "Officer web · Next.js 16"] },
        {
          label: "Services",
          items: ["Permit service · NestJS", "Master-data service · NestJS", "Auth", "PDF", "Reports"],
        },
        { label: "Data", items: ["PostgreSQL", "Redis", "Object storage"] },
        { label: "Platform", items: ["OpenTelemetry", "OpenAPI codegen", "Playwright"] },
      ],
      stats: [
        { label: "commits", value: "700+" },
        { label: "repos", value: "4" },
      ],
      stack: [
        "typescript",
        "nextjs",
        "react",
        "mui",
        "react-hook-form",
        "tanstack-query",
        "nodejs",
        "nestjs",
        "mikro-orm",
        "rest",
        "postgresql",
        "redis",
        "minio",
        "react-pdf",
        "opentelemetry",
        "openapi",
        "oidc",
        "jest",
        "playwright",
        "claude-code",
      ],
    },
    {
      slug: "abc",
      name: "Automated Border Control platform",
      kind: "client",
      domain: "Border control · government",
      role: "Junior, then Senior Full Stack Developer",
      period: { start: "2024-03", end: "2026-07" },
      summary:
        "Back-office and service layer for automated border-control gates: a management console, the .NET services behind it, reporting and data jobs.",
      highlights: [
        "Built the central management console (Next.js, MUI) and its ASP.NET Core API, the primary codebases of the role.",
        "Wrote the reporting service and scheduled jobs, Airflow DAGs for data work and a ClickHouse store for analytics.",
        "Worked on the event-driven side: a Kafka consumer service, SignalR real-time updates and Redis caching.",
        "Built desktop diagnostic tools: OpenCV analysis of passport data-page read failures and a Tesseract OCR scanner.",
        "Structured logging with Serilog into Elasticsearch, tracing with Elastic APM, sign-in through FusionAuth (OIDC).",
      ],
      layers: [
        { label: "Clients", items: ["Management console · Next.js", "Gate software · .NET"] },
        {
          label: "Services",
          items: ["Management API", "Report service", "Schedule service", "SignalR hub", "Kafka consumer"],
        },
        { label: "Data", items: ["PostgreSQL", "Redis", "ClickHouse", "Elasticsearch"] },
        { label: "Platform", items: ["FusionAuth", "Airflow", "Elastic APM", "Docker"] },
      ],
      stats: [
        { label: "commits", value: "1.9k+" },
        { label: "repos", value: "16" },
      ],
      stack: [
        "csharp",
        "dotnet",
        "ef-core",
        "rest",
        "postgresql",
        "redis",
        "kafka",
        "signalr",
        "airflow",
        "clickhouse",
        "elasticsearch",
        "serilog",
        "elastic-apm",
        "fusionauth",
        "oidc",
        "docker",
        "openapi",
        "minio",
        "typescript",
        "nextjs",
        "react",
        "mui",
        "redux-toolkit",
        "tanstack-query",
        "face-api",
        "opencv",
        "tesseract",
        "python",
        "sql",
      ],
    },
    {
      slug: "tch",
      name: "Company website, admin console and API",
      kind: "client",
      domain: "Corporate web",
      role: "Junior Full Stack Developer",
      period: { start: "2024-07", end: "2025-06" },
      summary: "A public website, the admin console that manages it and the Node API behind both.",
      highlights: [
        "Built the Next.js and HeroUI front ends with i18n, on a shared starter kit.",
        "Built the Express API with Prisma and TSOA-generated OpenAPI, FusionAuth sign-in, Redis, MinIO storage and Socket.IO.",
      ],
      layers: [
        { label: "Clients", items: ["Public website · Next.js", "Admin console · Next.js"] },
        { label: "Services", items: ["REST API · Express + TSOA", "Realtime · Socket.IO"] },
        { label: "Data", items: ["Prisma", "Redis", "MinIO"] },
        { label: "Platform", items: ["FusionAuth", "OpenAPI codegen"] },
      ],
      stats: [
        { label: "commits", value: "220+" },
        { label: "repos", value: "4" },
      ],
      stack: [
        "typescript",
        "nextjs",
        "react",
        "heroui",
        "tailwind",
        "redux-toolkit",
        "tanstack-query",
        "nodejs",
        "express",
        "prisma",
        "rest",
        "openapi",
        "fusionauth",
        "redis",
        "minio",
        "socketio",
      ],
    },
    {
      slug: "tcg-simulator",
      name: "TCG Simulator",
      kind: "side",
      domain: "Game simulation · bots",
      role: "Author",
      period: { start: "2026-11", end: null },
      summary:
        "A practice site for Pokémon TCG matchups: pick a deck, play a bot that runs the top decks of the tournament meta in the browser, then review the game turn by turn.",
      highlights: [
        "Rules engine in TypeScript where `apply(state, action)` returns a new state. Card effects live in their own modules, and a coverage test fails when a card with effect text has no code.",
        "The bot is a policy and value network that sees only what its side knows, with a look-ahead search over re-dealt hidden cards. It learned by imitating a rule-based bot, then by self-play PPO on a GPU, and thinks in a Web Worker.",
        "Review page: every finished game is kept in the browser with win% for each turn, the turns worth a second look and what the bot would have played, and any turn can be played again.",
        "A static Astro site with Svelte islands in Thai and English, with no back end and no sign-up.",
        "Vitest covers the rules, every card, a fuzz run and the bots. Playwright plays seeded games to the end on the production build.",
      ],
      layers: [
        { label: "UI", items: ["Astro pages", "Svelte islands", "Bot in a Web Worker"] },
        { label: "Engine", items: ["Rules", "Card effects", "Turn analysis"] },
        { label: "Bot", items: ["Policy and value network", "Look-ahead search", "Rule-based bot"] },
        { label: "Training", items: ["PyTorch", "Imitation", "Self-play PPO"] },
        { label: "Checks", items: ["Vitest", "Fuzz", "Playwright"] },
      ],
      stats: [
        { label: "commits", value: "100+" },
        { label: "meta decks", value: "6" },
      ],
      stack: ["typescript", "astro", "svelte", "python", "pytorch", "vitest", "playwright"],
      links: [
        { label: "Live site", href: "https://tcg-simulator-lilac.vercel.app" },
        { label: "Source on GitHub", href: "https://github.com/TopThammanun/tcg-simulator" },
      ],
      chapters: [
        {
          title: "Playing the bot",
          body: [
            "The player picks a deck from the meta or pastes a list, then picks the opponent or lets it be drawn by its share of recent tournaments. The game runs on a table like the real one: cards are dragged onto the board, a deck search shows the whole deck and Prize cards are chosen by hand.",
            "The rules live in an engine that takes a state and an action and returns a new state. A choice in the middle of an effect becomes a pending question, and the same action runs again with the answer. That keeps a game replayable from its list of moves.",
            "The opponent is one bot at one strength. A network scores every legal move from what its side can see, a search plays the best few forward over hidden cards dealt again from public information, and the value head picks. It never reads the player's hand or deck.",
            "It is a fan site, not affiliated with The Pokémon Company. Card text and images load from TCGdex and pokemontcg.io.",
          ],
          images: [
            tcgShot(
              "table",
              "A card table mid-game with the bot's cards at the top, the player's below, face-down Prize cards on both sides and a move log on the right",
              "Turn 6 of a game against the bot.",
            ),
            tcgShot(
              "card-played",
              "A played Trainer card shown large over the table while the log lists the moves of the turn",
              "Each card played is shown large for a moment.",
            ),
            tcgShot(
              "setup",
              "A game setup panel with a deck picker for the player and for the opponent, bot speed and animation settings",
              "Pick both decks, or let the opponent be drawn by meta share.",
            ),
            tcgShot(
              "game-over",
              "A game over dialog saying You lose, with buttons to play again, pick new decks or review the game",
              "The end of a game, with a link to its review.",
            ),
          ],
        },
        {
          title: "Reviewing a game",
          body: [
            "Every finished game is saved in the browser. The review shows win% for each turn, marks the turns where the player's line fell furthest from the bot's, and lists the moves the bot would have made with its reason.",
            "Any turn can be opened on the table and played again from that position, and games can be exported and imported as files.",
          ],
          images: [
            tcgShot(
              "review",
              "A review page with a replay table on the left and a line chart of win percentage per turn on the right",
              "The review: a replay and win% for every turn.",
            ),
            tcgShot(
              "review-turn",
              "A turn detail that sets the moves the player made beside the moves the bot would have made",
              "What was played on a turn and what the bot would play instead.",
            ),
            tcgShot(
              "history",
              "A game history page with the number of games, the win rate and a list of finished games",
              "Finished games are kept in the browser.",
            ),
          ],
        },
        {
          title: "Decks from the tournament meta",
          body: [
            "Deck lists come from recent tournaments and each deck page says where its list is from. A script rebuilds the card data from the lists, and a test names every card the engine cannot play yet.",
            "The bots also play each other thousands of times from the command line, which gives a matchup table with confidence intervals to compare with real tournament results.",
          ],
          images: [
            tcgShot(
              "decks",
              "A grid of deck cards, each with artwork, a rank and its share of the tournament meta",
              "The meta decks, ranked by their share of recent tournaments.",
            ),
            tcgShot(
              "deck-list",
              "A deck page listing every card with its count beside the card images",
              "A deck's full list.",
            ),
            tcgShot(
              "home",
              "A landing page with the headline Practise against the decks that rule the meta before you meet them at an event",
              "The landing page.",
            ),
          ],
        },
      ],
    },
    {
      slug: "agent-tooling",
      name: "Workflow tooling for coding agents",
      kind: "tooling",
      domain: "Developer tooling",
      role: "Author",
      period: { start: "2026-05", end: null },
      summary:
        "Skills, hooks and guardrails that make coding agents follow an established engineering process.",
      highlights: [
        "A workflow pack for one project: a rules file with the order every task follows (worktree, intake, root cause, implement, verify, ship, clean up) and seven slash-command skills for the steps that repeat.",
        "Skills for the repeated work: fix a list of issues and sweep the sibling forms, trace a screen value to its API and table, write SQL with a rollback and a dry run, verify against a baseline, ship a branch with merge-request text and run end-to-end checks.",
        "A guard hook that reads every shell command and file edit first. It denies a push onto the main branches or without an explicit refspec, denies edits to generated API clients and asks before a command that changes a shared checkout.",
        "Install and uninstall scripts link the skills into the agent's folder and register the hook, with a plan mode that changes nothing.",
        "Contributed to a shared agent toolkit for the team on the border-control project.",
      ],
      layers: [
        { label: "Entry points", items: ["Rules file", "Slash-command skills"] },
        { label: "Guard", items: ["Pre-tool-use hook"] },
        { label: "Checks", items: ["Baseline-aware verify", "Playwright E2E"] },
        { label: "Setup", items: ["Install script", "Uninstall script"] },
      ],
      stats: [
        { label: "skills", value: "7" },
        { label: "guard hook", value: "1" },
      ],
      stack: ["claude-code", "javascript", "git", "playwright"],
      chapters: [
        {
          title: "A process the agent cannot skip",
          body: [
            "The pack was written for a project with four repositories that share forms and data. Its rules file is loaded for every session and sets one order for every task, starting with a separate worktree and ending with that worktree removed.",
            "Each step that repeats has a skill, so the agent runs the same procedure every time instead of improvising it. The verify skill runs the type check, lint and format on the base branch and on the change, and fails only on what the change adds.",
            "The guard hook covers the mistakes that cost the most: pushing to a shared branch, hand-editing generated code and changing a checkout that other sessions are using. It fails open, so an error inside the hook never blocks work.",
            "The pictures here are diagrams, because the pack itself is text files and scripts written for a client project.",
          ],
          images: [
            toolingShot(
              "task-loop",
              "Diagram of seven steps in a row: worktree, intake, root cause, implement, verify, ship and clean up, with a guard hook bar under all of them",
              "Diagram: the order every task follows and the skill for each step.",
            ),
            toolingShot(
              "guard-hook",
              "Diagram with two lists: actions the hook denies and actions it asks about first",
              "Diagram: what the guard hook denies and what it asks about.",
            ),
            toolingShot(
              "baseline-verify",
              "Diagram of three rows of squares: the base branch, a clean change with no new problems and a change with two new problems marked in gold",
              "Diagram: only problems a change adds fail the check.",
            ),
          ],
        },
      ],
    },
    {
      slug: "site-v1",
      name: "topthammanun.dev v1",
      kind: "side",
      domain: "Personal site",
      role: "Author",
      period: { start: "2023-09", end: "2024-09" },
      summary:
        "First personal site: a Notion-style block editor on Tiptap with slash commands, i18n and PWA support.",
      highlights: [
        "Custom Tiptap extensions for root blocks, slash commands and drag handles.",
        "Documents save on a debounce while typing and open again in a reading view.",
        "Its indigo, gold and violet palette is the one this site still uses.",
      ],
      layers: [
        { label: "UI", items: ["Next.js 14", "NextUI", "Tiptap"] },
        { label: "State", items: ["Redux Toolkit", "TanStack Query"] },
      ],
      stats: [{ label: "commits", value: "50+" }],
      stack: [
        "typescript",
        "nextjs",
        "react",
        "heroui",
        "tailwind",
        "tiptap",
        "redux-toolkit",
        "tanstack-query",
      ],
      links: [{ label: "Source on GitHub", href: "https://github.com/TopThammanun/top-old" }],
      chapters: [
        {
          title: "A block editor in the browser",
          body: [
            "The first version of this site was a place to try a Notion-style editor. Every paragraph is a block of its own, built as a custom Tiptap node, so it can be dragged to a new position or get a new block under it.",
            "Typing a slash opens a command menu for headings, lists, quotes, code and images. The editor saves on a debounce while typing, and the same document opens without the editing controls in a reading view.",
            "The screenshots come from the public source running locally. The documents in them were typed for the capture and the document API was answered on the same machine.",
          ],
          images: [
            siteShot(
              "editor",
              "A block editor page titled Block editor demo with a heading, a bullet list, a quote and a code block",
              "The editor with a few block types.",
            ),
            siteShot(
              "slash-menu",
              "A menu under the cursor listing Heading 1, Heading 2, Heading 3, Text and Bold",
              "Typing a slash opens the command menu.",
            ),
            siteShot(
              "reading",
              "The same document without the sidebar or the editing controls",
              "The same document in the reading view.",
            ),
            siteShot("docs", "A page titled Example Docs with three document cards", "The document list."),
            siteShot(
              "home",
              "A dark starfield with the line Hello, I'm Thammanun and two buttons",
              "The landing page.",
            ),
          ],
        },
      ],
    },
    {
      slug: "godot-games",
      name: "Godot 4 game prototypes",
      kind: "side",
      domain: "Games",
      role: "Author",
      period: { start: "2026-06", end: "2026-07" },
      summary:
        "Two tactical game prototypes in Godot 4, built with headless test gates so changes can be checked without opening the editor.",
      highlights: [
        "GDScript gameplay, data-driven units and generated UI themes.",
        "Headless test runs as a gate before each change lands.",
      ],
      layers: [
        { label: "Game", items: ["Scenes", "Autoloads", "Data"] },
        { label: "Checks", items: ["Headless tests"] },
      ],
      stats: [{ label: "commits", value: "130+" }],
      stack: ["godot", "gdscript"],
      chapters: [
        {
          title: "Idle roguelite auto-battler",
          body: [
            "A party of four cats fights through stages on its own while the player picks the party, drafts boons between fights and spends gold on upgrades. Every fifth stage is a boss.",
            "The code is split into three layers. Presentation only listens to signals, a tick manager is the single frame consumer and emits a tick every 0.1 seconds, and all combat advances inside that tick. That keeps a run deterministic, fast-forwardable and testable without the editor.",
            "The party is data: four entries of race, class and row, with class and race stats loaded from resource files.",
            "Pure-logic unit tests and an integration smoke scene both run headless, and they are the gate before a change lands.",
          ],
          images: [
            gameShot(
              "idle-roguelite-battle",
              "Four cats face a golem under a stage and health bar, with the party bar and navigation below",
              "The start of a run: the party against a golem.",
            ),
            gameShot(
              "idle-roguelite-wraith",
              "The cat party fights a wraith while damage numbers float above it",
              "A wraith fight a few stages in.",
            ),
            gameShot(
              "idle-roguelite-boss",
              "A red dragon boss cat with a long health bar at stage five",
              "The first boss at stage 5.",
            ),
            gameShot(
              "idle-roguelite-boss-late",
              "The stage ten boss surrounded by damage numbers",
              "The stage 10 boss with damage numbers.",
            ),
            gameShot(
              "idle-roguelite-boon-draft",
              "A draft panel with three boon cards to choose from",
              "The boon draft: pick one of three.",
            ),
            gameShot(
              "idle-roguelite-hero-selection",
              "A hero selection panel listing front and back row cats with their class and race",
              "Hero selection by row, class and race.",
            ),
          ],
        },
        {
          title: "Idle RPG with roguelike drafts",
          body: [
            "A second prototype in the same cat world. The party fights waves on a compact battle strip while the player chooses a starting clan, drafts a card on each level-up and moves between map, party, base and hero screens.",
            "Design lives in data: regions, clans, the starter party and a ten-wave combat plan are JSON files, and an asset registry loads a catalog generated from every asset file, so sprites are referenced by role instead of by path.",
            "Run state and the battle engine own the results. Attack lunges, floating numbers and the rest of the game feel are presenter-only and never change an outcome.",
            "Progress saves locally with a schema version, and a gate script runs the headless tests together with a runtime screenshot check.",
          ],
          images: [
            gameShot(
              "auto-battler-starter-draft",
              "Six clan cards to choose from before a run starts",
              "Choosing a starting clan.",
            ),
            gameShot(
              "auto-battler-battle",
              "A cat hero fights a monster on a tile map, with a skill button at the bottom",
              "The first wave on the battle strip.",
            ),
            gameShot(
              "auto-battler-wave",
              "One hero faces three monsters on the battle strip",
              "One hero against a wave of three.",
            ),
            gameShot(
              "auto-battler-level-up-draft",
              "A level-up overlay with three cards to pick from",
              "The level-up draft: pick one of three cards.",
            ),
            gameShot(
              "auto-battler-map",
              "A world map screen listing five regions, the first one current and the second unlocked",
              "The world map with its five regions.",
            ),
            gameShot(
              "auto-battler-party",
              "A party screen showing the active hero and empty roster slots",
              "The party screen.",
            ),
            gameShot(
              "auto-battler-base",
              "A base screen with four buildings that produce yarn, gold and gems over time",
              "The base, where buildings produce resources over time.",
            ),
            gameShot(
              "auto-battler-hero",
              "A hero screen with a portrait, stat bars, equipment slots and level up and ascend buttons",
              "The hero screen with stats, level up and ascend.",
            ),
          ],
        },
      ],
    },
    {
      slug: "ibrand",
      name: "IBRAND hackathon project",
      kind: "side",
      domain: "Hackathon · made-to-order products",
      role: "Full-stack developer",
      period: { start: "2022-11", end: "2022-11" },
      summary:
        "A hackathon project from university: a web platform where a customer picks a factory and a product formula, then follows the order from price estimate to delivery.",
      highlights: [
        "Wrote the REST API in Express on MongoDB, with Mongoose models for factories, users and order transactions.",
        "Built the React app with a teammate: a customer side for finding a factory and following an order, and a factory console that lists the orders waiting at each step.",
        "Sign-in hashes passwords with bcrypt and returns a JWT that a middleware checks on protected routes.",
        "An order is one transaction with a current step, and both sides read that step to decide what to show.",
      ],
      layers: [
        { label: "Clients", items: ["Customer app · React", "Factory console · React"] },
        { label: "API", items: ["Factories", "Users", "Sign-in · JWT", "Order transactions"] },
        { label: "Data", items: ["MongoDB · Mongoose"] },
      ],
      stats: [
        { label: "commits", value: "65" },
        { label: "days", value: "11" },
      ],
      stack: ["javascript", "react", "nodejs", "express", "mongodb"],
      links: [
        { label: "API on GitHub", href: "https://github.com/TopThammanun/Hackaton-IBRAND-API" },
        { label: "App on GitHub", href: "https://github.com/TopThammanun/Hackaton-IBRAND-App" },
      ],
      chapters: [
        {
          title: "From formula to delivery",
          body: [
            "IBRAND was built for a hackathon in November 2022, while studying at Chiang Mai University. A customer searches factories by province, product type, category and material, picks a formula and opens an order.",
            "From there the order moves through nine steps: formula, price estimate, test product, deposit, packaging, FDA registration, production, payment and delivery.",
            "The API keeps each order as a transaction that records its current step. The customer app shows that step on a progress line, and the factory console counts and lists the orders waiting at each step.",
            "The screenshots come from both public repositories running locally, with the sample factories that ship in the API repository.",
          ],
          images: [
            ibrandShot(
              "home",
              "A grid of factory cards with a price, an address and certificates under four search filters",
              "The factory search, filtered by province, type, category and material.",
            ),
            ibrandShot(
              "factory",
              "A factory page with photos, a price per formula and a company description",
              "A factory page.",
            ),
            ibrandShot(
              "request",
              "A nine-step progress line above a grid of product formulas to choose from",
              "Step 1: pick a formula. The line above shows all nine steps.",
            ),
            ibrandShot(
              "waiting",
              "The progress line at step 1 with a yellow notice saying Waiting for confirmation from factory",
              "After a request is sent, the order waits for the factory.",
            ),
            ibrandShot(
              "admin",
              "A factory console with a sidebar of order steps and a counter card for each step",
              "The factory console counts the orders at each step.",
            ),
            ibrandShot(
              "admin-orders",
              "A table of orders at the first step with an order number, date, status, owner and a detail button",
              "The orders waiting at one step.",
            ),
          ],
        },
      ],
    },
    {
      slug: "tep-auction",
      name: "TEP Auction",
      kind: "side",
      domain: "Team project · online auction",
      role: "Full-stack developer",
      period: { start: "2022-09", end: "2022-10" },
      summary:
        "A team project built while studying: an online auction site where people list products, bid on them and keep a watch list.",
      highlights: [
        "Built most of the React front end: the landing page with categories, auction lists, the product page with its bidding panel, the watch list and the form for listing a product.",
        "Wrote most of the Express API: products by category, a user's bids and listings, placing a bid, buy now and image upload for new listings.",
        "Pages that need an account send the visitor to sign in first and bring them back afterwards.",
      ],
      layers: [
        { label: "Client", items: ["React", "React Router", "Bootstrap", "styled-components"] },
        { label: "API", items: ["Products", "Bids", "Sign-in", "Image upload"] },
        { label: "Data", items: ["In-memory lists"] },
      ],
      stats: [
        { label: "commits", value: "98" },
        { label: "repos", value: "2" },
      ],
      stack: ["javascript", "react", "nodejs", "express"],
      links: [
        { label: "App on GitHub", href: "https://github.com/TopThammanun/TEP-lnW_Project_Frontend" },
        { label: "API on GitHub", href: "https://github.com/TopThammanun/TEP-lnW_Project-Back" },
      ],
      chapters: [
        {
          title: "Bidding in the browser",
          body: [
            "TEP Auction was a team project from September and October 2022. Visitors browse auctions by category, open a product to see the current price, the bid increment and the buy-now price, and place a bid once they have signed in.",
            "Signed-in users keep a watch list, see the auctions they are bidding on and the ones they are selling, and list a new product with a photo, a starting price, a buy-now price and an end time.",
            "The API keeps its products and users in memory, so the whole thing runs with two commands. The screenshots come from both public repositories running locally.",
          ],
          images: [
            auctionShot(
              "home",
              "An orange landing page with an illustration and the headline Find Your Next Deal",
              "The landing page.",
            ),
            auctionShot(
              "auctions",
              "Three product cards with the current bid, the buy-now price and a Submit A Bid button",
              "Auctions in one category.",
            ),
            auctionShot(
              "product",
              "A product page with the current price, the bid increment, the buy-now price and a countdown box",
              "A product page with its bidding panel.",
            ),
            auctionShot(
              "add-product",
              "A form titled Add New Product with an image upload, a name, a category, prices and an end time",
              "Listing a product for auction.",
            ),
            auctionShot(
              "login",
              "A sign-in card beside an illustration of an auctioneer",
              "The sign-in page.",
            ),
          ],
        },
      ],
    },
    {
      slug: "backend-patterns",
      name: "Back-end pattern studies",
      kind: "side",
      domain: "Architecture practice",
      role: "Author",
      period: { start: "2022-12", end: "2024-06" },
      summary:
        "Four small repositories that each try one back-end pattern in C# or TypeScript: a generic repository with a unit of work, CQRS with MediatR, a state machine read from the database and a repository over Prisma.",
      highlights: [
        "Repository and unit of work on EF Core: generic base classes that a concrete repository and unit of work extend.",
        "CQRS with MediatR in ASP.NET Core: controllers only send queries, and a handler per query calls the repository.",
        "State pattern in NestJS: the order of states is rows in the database, and each state name maps to a class.",
        "Repository pattern over Prisma in an Express API with JWT sign-in, request validation and a rate limit.",
      ],
      layers: [
        { label: "C#", items: ["EF Core repository", "Unit of work", "MediatR handlers"] },
        { label: "TypeScript", items: ["NestJS state machine", "Prisma repository", "Express API"] },
      ],
      stats: [
        { label: "repos", value: "4" },
        { label: "commits", value: "26" },
      ],
      stack: ["csharp", "dotnet", "ef-core", "typescript", "nodejs", "nestjs", "express", "prisma"],
      links: [
        {
          label: "EF Core repository and unit of work",
          href: "https://github.com/TopThammanun/DotNet-EntityFrameworkCore",
        },
        { label: "CQRS with MediatR", href: "https://github.com/TopThammanun/CQRS-and-Repository-Pattern" },
        { label: "State pattern in NestJS", href: "https://github.com/TopThammanun/state-pattern" },
        {
          label: "Repository over Prisma",
          href: "https://github.com/TopThammanun/NodeJs-prisma-with-Repository-Pattern",
        },
      ],
      chapters: [
        {
          title: "One pattern per repository",
          body: [
            "Each repository is small on purpose: enough code to wire one pattern end to end and see what it costs. The pictures are excerpts from the public source, copied as they are.",
            "The C# pair covers data access. One has a generic repository and a unit of work on EF Core. The other puts MediatR between the controller and the repository, so a request becomes a query object with its own handler.",
            "The NestJS study keeps a workflow's states as rows in the database. A transaction moves to the next state by sequence, and the state's name picks the class that handles it. The Prisma study hides the client behind a repository interface in an Express API.",
          ],
          images: [
            patternShot(
              "repository",
              "C# code of a generic IRepository interface with GetAll, Add, Find and Update members",
              "The generic repository interface on EF Core.",
            ),
            patternShot(
              "cqrs",
              "C# code of a controller that sends a query through a MediatR mediator",
              "A controller that only sends queries to MediatR.",
            ),
            patternShot(
              "state",
              "TypeScript code that maps a state name to a state class and throws on an unknown name",
              "Choosing the state class by a name stored in the database.",
            ),
            patternShot(
              "prisma",
              "TypeScript code of a UserRepo class that implements an interface and creates a user with Prisma",
              "A repository class over Prisma.",
            ),
          ],
        },
      ],
    },
  ],

  timeline: [
    {
      date: "2026-11",
      lane: "branch",
      project: "tcg-simulator",
      message: "feat(tcg): card-game simulator with bots",
    },
    {
      date: "2026-07",
      lane: "main",
      project: "epermit",
      message: "feat(epermit): permit forms, review flow and services",
      head: true,
    },
    {
      date: "2026-07",
      lane: "main",
      project: "abc",
      message: "chore(abc): wrap up after 1.9k commits across 16 repos",
    },
    {
      date: "2026-06",
      lane: "branch",
      project: "godot-games",
      message: "feat(games): two Godot 4 prototypes",
    },
    {
      date: "2026-05",
      lane: "branch",
      project: "agent-tooling",
      message: "feat(tooling): first agent skills and hooks",
    },
    {
      date: "2026-03",
      lane: "main",
      project: "abc",
      message: "chore(career): promoted to Senior Full Stack Developer",
    },
    { date: "2025-09", lane: "main", project: "abc", message: "feat(abc): ClickHouse analytics store" },
    {
      date: "2025-06",
      lane: "branch",
      project: "tch",
      message: "chore(tch): shipped website, admin and API",
    },
    { date: "2024-10", lane: "main", project: "abc", message: "feat(abc): Airflow data jobs" },
    {
      date: "2024-07",
      lane: "branch",
      project: "tch",
      message: "feat(tch): company website, admin console, API",
    },
    {
      date: "2024-03",
      lane: "main",
      project: "abc",
      message: "feat(abc): management console, API and reports",
    },
    { date: "2023-09", lane: "branch", project: "site-v1", message: "init: topthammanun.dev v1" },
    {
      date: "2022-12",
      lane: "branch",
      project: "backend-patterns",
      message: "feat(patterns): first pattern study, a repository over Prisma",
    },
    {
      date: "2022-11",
      lane: "main",
      project: "ibrand",
      message: "feat(ibrand): hackathon app and API in eleven days",
    },
    {
      date: "2022-09",
      lane: "main",
      project: "tep-auction",
      message: "feat(auction): team auction site in React and Express",
    },
  ],

  practices: [
    {
      title: "Skills as code",
      body: "Repeatable work lives in versioned skill files: trace a value, verify against a baseline, ship a branch.",
    },
    {
      title: "Guardrails first",
      body: "Hooks stop an agent before a destructive command or an edit outside the task.",
    },
    {
      title: "Plan, implement, prove",
      body: "One model plans, another implements, and nothing counts as done without a build, a test run or a screenshot.",
    },
    {
      title: "Root cause before code",
      body: "A fix starts by tracing the value to its API and table, so the change lands where the problem starts.",
    },
  ],

  competencies: [
    {
      label: "Git workflow",
      items: [
        "Branch management",
        "Dev and production branches",
        "Merge requests",
        "Pull requests",
        "Squash commits",
        "Merging",
        "Versioning",
      ],
    },
    {
      label: "Problem solving",
      items: ["Root-cause analysis", "Solution analysis before a fix"],
    },
    {
      label: "Database performance",
      items: ["SQL optimization", "Database indexing", "Query optimization for large datasets"],
    },
  ],

  career: [
    {
      id: "senior",
      title: "Senior Full Stack Developer",
      employer: EMPLOYER,
      employment: "full-time",
      period: { start: "2026-03", end: null },
      summary:
        "Promoted in March 2026 while on the Automated Border Control platform, now on the Industrial-estate e-Permit platform.",
      stack: [],
      links: [],
      projects: ["epermit"],
    },
    {
      id: "junior",
      title: "Junior Full Stack Developer",
      employer: EMPLOYER,
      employment: "full-time",
      period: { start: "2024-04", end: "2026-03" },
      summary:
        "Worked on phase 1 of the Automated Border Control platform and built a company website with its admin console and API.",
      stack: [],
      links: [],
      projects: ["abc", "tch"],
    },
    {
      id: "intern",
      title: "Intern Full Stack Developer",
      employer: EMPLOYER,
      employment: "internship",
      period: { start: "2022-12", end: "2024-03" },
      summary:
        "An internship on HealthTeams, a management platform for hospitals and sub-district health promoting hospitals.",
      stack: ["React", ".NET", "Amazon Cognito", "AWS services"],
      links: [
        { label: "HealthTeams product page", href: "https://www.chanwanich.digital/healthteams/" },
        { label: "HealthTeams on Facebook", href: "https://www.facebook.com/healthteams.in.th/" },
      ],
      projects: [],
    },
  ],

  education: [
    {
      school: "Chiang Mai University",
      degree: "Bachelor's degree",
      program: "Digital Industry Integration (DII)",
      honors: "First-Class Honors",
      graduated: "2024-03",
      coursework: [
        "Programming Logical Thinking",
        "Object-Oriented Programming",
        "Front-End Development (React)",
        "Back-End Development (Node.js)",
        "Database Normalization",
        "Digital Industry Solutions",
      ],
      projects: ["ibrand"],
    },
  ],
};
