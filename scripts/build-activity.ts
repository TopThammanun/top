import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { parseArgs } from "node:util";
import { format, resolveConfig } from "prettier";
import { repoGroup, tallyCommits, windowStart, type CommitRecord } from "@/lib/commit-activity";
import { formatDay } from "@/lib/days";

const USAGE =
  "usage: pnpm build:activity --root <dir> --author <pattern> [--company <path>] [--personal <path>] [--to YYYY-MM-DD] [--weeks 53]";
const OUTPUT = join(process.cwd(), "src", "content", "activity.ts");
const MAX_DEPTH = 4;
const SKIPPED = new Set(["node_modules", ".next", "dist", "build"]);
const LOG_BUFFER_BYTES = 64 * 1024 * 1024;

const { values } = parseArgs({
  options: {
    root: { type: "string" },
    author: { type: "string", multiple: true },
    company: { type: "string", multiple: true },
    personal: { type: "string", multiple: true },
    to: { type: "string" },
    weeks: { type: "string" },
  },
});

function findRepos(dir: string, depth: number): string[] {
  const entries = readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  if (entries.some((entry) => entry.name === ".git")) return [dir];
  if (depth === 0) return [];
  return entries
    .filter((entry) => !SKIPPED.has(entry.name))
    .flatMap((entry) => findRepos(join(dir, entry.name), depth - 1));
}

function readCommits(repo: string, authors: string[]): { hash: string; date: string }[] {
  const args = ["-C", repo, "log", "--all", "--no-merges", "-i", "--date=short", "--pretty=format:%H %ad"];
  const output = execFileSync("git", [...args, ...authors.map((author) => `--author=${author}`)], {
    encoding: "utf8",
    maxBuffer: LOG_BUFFER_BYTES,
  });
  return output
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [hash, date] = line.split(" ");
      return { hash, date };
    });
}

async function main() {
  const { root, author: authors = [], company = [], personal = [] } = values;
  if (!root || authors.length === 0) throw new Error(USAGE);

  const base = resolve(root);
  const to = values.to ?? formatDay(Date.now());
  const from = windowStart(to, Number(values.weeks ?? 53));
  const repos = findRepos(base, MAX_DEPTH);
  const commits: CommitRecord[] = repos.flatMap((repo) => {
    const group = repoGroup(relative(base, repo).replaceAll("\\", "/"), company, personal);
    return readCommits(repo, authors).map((commit) => ({ ...commit, group }));
  });

  const activity = tallyCommits(commits, from, to);
  const source = [
    'import type { CommitActivity } from "./types";',
    "",
    `export const activity: CommitActivity = ${JSON.stringify(activity)};`,
    "",
  ].join("\n");
  writeFileSync(OUTPUT, await format(source, { ...(await resolveConfig(OUTPUT)), filepath: OUTPUT }));
  console.log(`wrote ${OUTPUT}: ${Object.keys(activity.days).length} days from ${repos.length} repositories`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
