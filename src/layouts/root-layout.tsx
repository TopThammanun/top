import { LoadingScreen } from "@/components/shared";
import { StateType } from "@/store";
import Head from "next/head";
import React, { Fragment, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

type Props = {
  children: ReactNode;
  title?: string;
  desc?: string;
  keyword?: string;
};

const RootLayout = ({
  children,
  title = "TopThammanun",
  desc = "Explore TopThammanun's web development portfolio showcasing skills and projects.",
  keyword = "TopThammanun, web development, portfolio, projects, skills, Thammanun, Thammanun Aikhamdaeng",
}: Props) => {
  const loaderState = useSelector((state: StateType) => state.loaderState);

  return (
    <Fragment>
      <Head>
        <title>TopThammanun</title>
        <link rel="icon" href="/logo2.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="descriptiondescription"
          content="Explore TopThammanun's web development portfolio showcasing skills and projects."
        />
        <meta
          name="keywords"
          content="TopThammanun, web development, portfolio, projects, skills, Thammanun, Thammanun Aikhamdaeng"
        />
        <meta name="author" content="TopThammanun" />
        <meta property="og:title" content="TopThammanun" />
        <meta
          property="og:description"
          content="Explore TopThammanun's web development portfolio showcasing skills and projects."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.topthammanun.dev/" />
        <meta
          property="og:image"
          content="https://www.topthammanun.dev/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TopThammanun" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta
          name="twitter:image"
          content="https://www.topthammanun.dev/twitter-image.jpg"
        />
      </Head>
      <main>
        <LoadingScreen isLoading={loaderState.loader > 0} />
        {children}
        <Analytics />
        <SpeedInsights />
      </main>
    </Fragment>
  );
};

export default RootLayout;
