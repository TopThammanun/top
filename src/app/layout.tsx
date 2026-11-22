import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Prompt } from "next/font/google";
import { Shell } from "@/components/shell/Shell";
import { themeScript } from "@/components/shell/theme-script";
import { resume } from "@/content/resume";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
});

const { profile, meta } = resume;
const title = `${profile.displayName} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title,
  description: profile.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.displayName,
    title,
    description: profile.tagline,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1740",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${jetbrainsMono.variable} ${prompt.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
