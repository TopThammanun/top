import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Prompt } from "next/font/google";
import { Shell } from "@/components/shell/Shell";
import { headScript } from "@/components/shell/head-script";
import { resume } from "@/content/resume";
import { fullName } from "@/lib/identity";
import { alternateTypes, seoDescription, seoKeywords, seoTitle } from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  preload: false,
});

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  preload: false,
});

const { profile, meta } = resume;
const name = fullName(profile);
const title = seoTitle(resume);
const description = seoDescription(resume);
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title,
  description,
  keywords: seoKeywords(resume),
  authors: [{ name, url: meta.siteUrl }],
  creator: name,
  publisher: name,
  alternates: { canonical: "/", types: alternateTypes() },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: name,
    title,
    description,
    locale: "en_US",
    firstName: profile.givenName,
    lastName: profile.familyName,
    username: profile.handle,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body className="min-h-dvh">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
