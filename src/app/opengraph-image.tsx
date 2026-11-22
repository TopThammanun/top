import { ImageResponse } from "next/og";
import { resume } from "@/content/resume";

export const alt = `${resume.profile.displayName}, ${resume.profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  bg: "#1c1740",
  fg: "#ecedee",
  muted: "#a1a1aa",
  line: "rgba(255,255,255,0.15)",
  accent: "#d79b19",
};

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
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 112, letterSpacing: -4, lineHeight: 1 }}>
          {profile.displayName}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: COLORS.muted }}>
          <span style={{ color: COLORS.accent, marginRight: 16 }}>&gt;</span>
          {profile.title}
        </div>
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
