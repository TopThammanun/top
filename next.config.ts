import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import type { NextConfig } from "next";

const SHA_LENGTH = 7;

function buildSha(): string {
  const vercelSha = process.env.VERCEL_GIT_COMMIT_SHA;
  if (vercelSha) return vercelSha.slice(0, SHA_LENGTH);
  try {
    return execFileSync("git", ["rev-parse", `--short=${SHA_LENGTH}`, "HEAD"], {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "dev";
  }
}

const { version: nextVersion } = createRequire(import.meta.url)("next/package.json") as { version: string };

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    NEXT_PUBLIC_BUILD_SHA: buildSha(),
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
    NEXT_PUBLIC_NEXT_VERSION: nextVersion,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
