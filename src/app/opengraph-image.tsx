import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MASCOT } from "@/components/sections/hero/mascot";
import { resume } from "@/content/resume";
import { fullName } from "@/lib/identity";

export const alt = `${fullName(resume.profile)} (${resume.profile.handle}), ${resume.profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  bg: "#1c1740",
  fg: "#ecedee",
  muted: "#a1a1aa",
  line: "rgba(255,255,255,0.15)",
  accent: "#d79b19",
};
const MASCOT_WIDTH = 336;

const mascotData = await readFile(join(process.cwd(), "public", MASCOT.src), "base64");
const mascotSrc = `data:image/png;base64,${mascotData}`;

export default function OpengraphImage() {
  const { profile, meta } = resume;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: COLORS.bg,
        color: COLORS.fg,
        border: `1px solid ${COLORS.line}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: COLORS.muted }}>
        <span style={{ color: COLORS.accent }}>00</span>
        <span>~/{profile.handle}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            <span>{profile.givenName}</span>
            <span>{profile.familyName}</span>
          </div>
          <div style={{ display: "flex", fontSize: 36, color: COLORS.muted }}>
            <span style={{ color: COLORS.accent, marginRight: 16 }}>&gt;</span>
            {profile.title}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mascotSrc}
          alt=""
          width={MASCOT_WIDTH}
          height={(MASCOT_WIDTH * MASCOT.height) / MASCOT.width}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: COLORS.muted,
          borderTop: `1px solid ${COLORS.line}`,
          paddingTop: 28,
        }}
      >
        <span>{meta.siteUrl.replace(/^https:\/\//, "")}</span>
        <span>{profile.location.label}</span>
      </div>
    </div>,
    size,
  );
}
