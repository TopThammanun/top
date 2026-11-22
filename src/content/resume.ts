import type { ProjectImage, Resume } from "./types";

const SITE_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "www.topthammanun.dev";
const SITE_URL = `https://${SITE_HOST}`;
const EMPLOYER = "Chanwanich Company Limited";

function gameShot(file: string, alt: string, caption: string): ProjectImage {
  return { src: `/projects/godot-games/${file}.webp`, alt, caption, width: 1280, height: 720 };
}

export const resume: Resume = {
  meta: {
    version: "0.1.0",
    updated: "2026-11-22",
    siteUrl: SITE_URL,
    statsAsOf: "2026-11-22",
  },

  profile: {
    handle: "topthammanun",
    givenName: "Thammanun",
    familyName: "Aikhamdaeng",
    nickname: "Top",
    displayName: "Top Thammanun",
    title: "Senior Full Stack Developer",
    roles: [
      "Senior Full Stack Developer",
      ".NET services, Next.js front ends",
      "TypeScript end to end",
      "Ships with coding agents",
    ],
    tagline:
      "I build enterprise systems end to end: C#/.NET and NestJS services, Next.js front ends, and the tooling around them.",
    summary: [
      "Senior Full Stack Developer specialising in government and enterprise systems, where forms are long, business rules are strict and data accuracy is critical.",
      `Progressed from intern to Senior Full Stack Developer at ${EMPLOYER}.`,
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
    email: null,
    linkedin: null,
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
    { id: "special", label: "Specialised" },
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
    { id: "mui", name: "MUI", category: "frontend" },
    { id: "heroui", name: "HeroUI", category: "frontend" },
    { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
    { id: "redux-toolkit", name: "Redux Toolkit", category: "frontend" },
    { id: "tanstack-query", name: "TanStack Query", category: "frontend" },
    { id: "react-hook-form", name: "React Hook Form", category: "frontend" },
    { id: "tiptap", name: "Tiptap", category: "frontend" },
    { id: "astro", name: "Astro", category: "frontend" },
    { id: "svelte", name: "Svelte", category: "frontend" },

    { id: "dotnet", name: "ASP.NET Core (.NET 8)", category: "backend" },
    { id: "ef-core", name: "EF Core", category: "backend" },
    { id: "nestjs", name: "NestJS", category: "backend" },
    { id: "mikro-orm", name: "MikroORM", category: "backend" },
    { id: "express", name: "Express", category: "backend" },
    { id: "prisma", name: "Prisma", category: "backend" },
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
    { id: "oidc", name: "OAuth 2.0 / OIDC", category: "platform" },
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
        "New front-end code is typed only from OpenAPI-generated clients, with no `any`.",
        "Run agent-assisted Playwright end-to-end passes: fill, submit, review, approve, pay, generated PDF.",
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
        "nestjs",
        "mikro-orm",
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
        "Worked across the event-driven side as well: a Kafka consumer service, SignalR real-time updates and Redis caching.",
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
      role: "Full Stack Developer",
      period: { start: "2024-07", end: "2025-06" },
      summary: "A public website, the admin console that manages it and the Node API behind both.",
      highlights: [
        "Next.js and HeroUI front ends with i18n, built on a shared starter kit.",
        "Express API with Prisma and TSOA-generated OpenAPI, FusionAuth sign-in, Redis, MinIO storage and Socket.IO.",
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
        "express",
        "prisma",
        "openapi",
        "fusionauth",
        "redis",
        "minio",
        "socketio",
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
        "A project workflow pack: slash-command skills for tracing where a value comes from, verifying a change against a baseline, managing worktrees and shipping a branch, plus a guard hook.",
        "A timesheet secretary: a skill, a session hook and a status line that log tasks and rebuild hours from git history and session transcripts, synced across machines.",
        "A shared toolkit for the team on the border-control project.",
      ],
      layers: [
        { label: "Entry points", items: ["Slash-command skills", "Session hooks", "Status line"] },
        { label: "Checks", items: ["Baseline-aware verify", "Guard hook", "Playwright E2E"] },
        { label: "Storage", items: ["Markdown logs", "Git sync"] },
      ],
      stats: [{ label: "packs", value: "3" }],
      stack: ["claude-code", "python", "git", "playwright"],
      links: [
        {
          label: "Timesheet skill on GitHub",
          href: "https://github.com/TopThammanun/claude-secretary-timesheet-sync-skill",
        },
      ],
    },
    {
      slug: "tcg-simulator",
      name: "TCG Simulator",
      kind: "side",
      domain: "Game simulation",
      role: "Author",
      period: { start: "2026-11", end: null },
      summary:
        "A trading-card-game simulator in the browser, with bots that play it and a test suite that keeps the rules honest.",
      highlights: [
        "Astro and Svelte front end in TypeScript.",
        "Rules engine covered by Vitest, battles checked end to end with Playwright.",
        "Bot research: simulated matches and experiments to make the AI opponent stronger.",
      ],
      layers: [
        { label: "UI", items: ["Astro", "Svelte"] },
        { label: "Engine", items: ["Rules engine", "Bots", "Match simulator"] },
        { label: "Checks", items: ["Vitest", "Playwright"] },
      ],
      stats: [{ label: "commits", value: "80+" }],
      stack: ["typescript", "astro", "svelte", "vitest", "playwright"],
      links: [
        { label: "Live site", href: "https://tcg-simulator-lilac.vercel.app" },
        { label: "Source on GitHub", href: "https://github.com/TopThammanun/tcg-simulator" },
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
    },
    {
      slug: "ibrand",
      name: "IBRAND hackathon project",
      kind: "side",
      domain: "Hackathon · made-to-order products",
      role: "Back-end developer",
      period: { start: "2022-11", end: "2022-11" },
      summary:
        "A hackathon project from university: a web platform where a customer picks a factory and a product formula, then follows the order from price estimate to delivery.",
      highlights: [
        "Wrote the REST API in Express on MongoDB, with Mongoose models for factories, users and order transactions.",
        "Sign-in hashes passwords with bcrypt and returns a JWT that a middleware checks on protected routes.",
        "An order is one transaction with a current step, and the factory side queries the orders waiting at each step.",
        "The React front end lives in a second repository: a customer app and a factory console.",
      ],
      layers: [
        { label: "Clients", items: ["Customer app · React", "Factory console · React"] },
        { label: "API", items: ["Factories", "Users", "Sign-in · JWT", "Order transactions"] },
        { label: "Data", items: ["MongoDB · Mongoose"] },
      ],
      stats: [
        { label: "API commits", value: "30" },
        { label: "days", value: "11" },
      ],
      stack: ["javascript", "express", "mongodb", "react"],
      links: [
        { label: "API on GitHub", href: "https://github.com/TopThammanun/Hackaton-IBRAND-API" },
        { label: "App on GitHub", href: "https://github.com/TopThammanun/Hackaton-IBRAND-App" },
      ],
      chapters: [
        {
          title: "From formula to delivery",
          body: [
            "IBRAND was built for a hackathon in November 2022, while studying at Chiang Mai University. A customer searches factories by province, product type and category, picks a formula and opens an order.",
            "From there the order moves through nine steps: formula, price estimate, test product, deposit, packaging, FDA registration, production, payment and delivery.",
            "The API keeps each order as a transaction that records its current step. The customer app shows that step on a timeline, and the factory console lists the orders waiting at each step.",
            "Both repositories are public. The API repository holds the back-end work described here.",
          ],
          images: [],
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
      date: "2022-11",
      lane: "main",
      project: "ibrand",
      message: "feat(ibrand): hackathon API on Express and MongoDB",
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
      title: "Time is logged, not guessed",
      body: "A session hook records the task; hours are rebuilt from git history and transcripts.",
    },
  ],

  competencies: [
    {
      label: "Git workflow",
      items: [
        "Branch control",
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
      items: ["Root-cause analysis", "Solution analysis for fixes"],
    },
    {
      label: "Database performance",
      items: ["SQL optimisation", "Database indexing", "Query optimisation for large datasets"],
    },
  ],

  career: [
    {
      id: "senior",
      title: "Senior Full Stack Developer",
      employer: EMPLOYER,
      period: { start: "2026-03", end: null },
      months: null,
      summary:
        "Promoted in March 2026 while on the Automated Border Control platform, now on the Industrial-estate e-Permit platform.",
      stack: [],
      links: [],
    },
    {
      id: "junior",
      title: "Junior Full Stack Developer",
      employer: EMPLOYER,
      period: null,
      months: null,
      summary: "Worked on phase 1 of the Automated Border Control platform.",
      stack: [],
      links: [],
    },
    {
      id: "intern",
      title: "Intern Full Stack Developer",
      employer: EMPLOYER,
      period: null,
      months: 14,
      summary:
        "A 14-month internship on HealthTeams, a management platform for hospitals and sub-district health promoting hospitals.",
      stack: ["React", ".NET", "Amazon Cognito", "AWS services"],
      links: [
        { label: "HealthTeams product page", href: "https://www.chanwanich.digital/healthteams/" },
        { label: "HealthTeams on Facebook", href: "https://www.facebook.com/healthteams.in.th/" },
      ],
    },
  ],

  education: [
    {
      school: "Chiang Mai University",
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
